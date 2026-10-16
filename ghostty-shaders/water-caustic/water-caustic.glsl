// Water Caustic — a Ghostty custom shader ported from Paper Design's "Water".
//
// Renders the terminal as if sitting behind a gently moving water surface:
// a recursive fractal-noise caustic field distorts the texture lookup, a
// simplex-noise wave term adds slow lateral shimmer, and a soft highlight
// tint follows the caustic shape so the surface reads as lit water rather
// than a flat warp. There is no cursor coupling; the effect is always alive.
//
// SOURCE
//   Upstream fragment shader: paper-design/shaders (Apache-2.0)
//     https://github.com/paper-design/shaders
//     file: packages/shaders/src/shaders/water.ts (waterFragmentShader)
//     page: https://shaders.paper.design/water
//   The recursive fractal caustic noise is credited upstream to zozuar:
//     https://www.shadertoy.com/view/MdlXz8
//   Simplex noise (snoise) and the rotate helper are verbatim from
//   paper-design/shaders shader-utils.ts (same Apache-2.0 license).
//
// CONVERSION NOTES (vs. upstream)
//   • Entry point rewritten to Ghostty's ShaderToy-style mainImage().
//   • u_image -> iChannel0 (terminal texture), u_time -> iTime.
//   • v_imageUV (a vertex-fit image UV) -> fragCoord/iResolution, because the
//     terminal fills the viewport and Ghostty has no image fit/scale stage.
//   • u_imageAspectRatio derived from iResolution.
//   • Runtime uniforms converted to tunable const values, defaulted to the
//     upstream "Default" preset
//     (colorBack #909090, colorHighlight #ffffff, highlights 0.07,
//      layering 0.5, edges 0.8, waves 0.3, caustic 0.1, size 1.0).
//   • getUvFrame() dropped: the terminal is opaque and fills the canvas, so
//     the image-frame mask is always 1. (Also avoids fwidth/derivatives.)
//   • Back-color compositing against a transparent image is removed for the
//     same reason; the sampled terminal color is used directly. The caustic-
//     shaped highlight tint is preserved — it is the visual signature.
//
// All values below are tunable — see TUNING.

// ============================ TUNING =======================================
// --- Defaults match the upstream "Default" preset ---------------------------
const float SIZE       = 1.0;    // pattern scale relative to the surface
const float HIGHLIGHTS = 0.04;   // caustic-shaped tint added over the surface (0..1)
const float LAYERING   = 0.2;    // strength of the 2nd caustic layer (0..1)
const float EDGES      = 0.8;    // caustic distortion power near the edges (0..1)
const float WAVES      = 0.04;   // simplex lateral shimmer, independent of caustic (0..1)
const float CAUSTIC    = 0.015;  // overall caustic distortion power (0..1)

const vec3  COLOR_BACK      = vec3(0.5647, 0.5647, 0.5647); // #909090 (unused for opaque terminal)
const vec3  COLOR_HIGHLIGHT = vec3(1.0);                    // #ffffff caustic tint
const float HIGHLIGHT_ALPHA = 1.0;                          // alpha of the highlight tint
// ===========================================================================

#define TWO_PI 6.28318530718
#define PI 3.14159265358979323846

// --- rotate2D (upstream shader-utils.ts, rotation2) ------------------------
mat2 rotate2D(float r) {
  return mat2(cos(r), sin(r), -sin(r), cos(r));
}

// --- simplex noise (upstream shader-utils.ts, simplexNoise) ----------------
// Ashima/Stefan Gustavson 2D simplex noise.
vec3 permute(vec3 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }
float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
    -0.577350269189626, 0.024390243902439);
  vec2 i = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
    + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy),
      dot(x12.zw, x12.zw)), 0.0);
  m = m * m;
  m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

// --- zozuar recursive fractal caustic noise --------------------------------
// Accumulates sin/cos over 6 rotated, time-drifting octaves. Returns a value
// roughly in [0, ~6]; squared downstream to sharpen the caustic webbing.
float getCausticNoise(vec2 uv, float t, float scale) {
  vec2 n = vec2(.1);
  vec2 N = vec2(.1);
  mat2 m = rotate2D(.5);
  for (int j = 0; j < 6; j++) {
    uv *= m;
    n *= m;
    vec2 q = uv * scale + float(j) + n + (.5 + .5 * float(j)) * (mod(float(j), 2.) - 1.) * t;
    n += sin(q);
    N += cos(q) / scale;
    scale *= 1.1;
  }
  return (N.x + N.y + 1.);
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
  vec2 res = iResolution.xy;

  // Terminal fills the viewport: image UVs are just normalized pixel coords.
  // (Upstream uses a vertex-fit v_imageUV; Ghostty has no such stage.)
  vec2 imageUV  = fragCoord / res;
  float imageAspectRatio = res.x / res.y;

  // Pattern space: centered, aspect-corrected, scaled by SIZE.
  vec2 patternUV = imageUV - .5;
  patternUV = (patternUV * vec2(imageAspectRatio, 1.));
  patternUV /= (.01 + .09 * SIZE);

  float t = iTime;

  // Slow lateral wave field (independent of the caustic web).
  float wavesNoise = snoise((.3 + .1 * sin(t)) * .1 * patternUV + vec2(0., .4 * t));

  // Primary caustic field, optionally warped by the wave field.
  float causticNoise = getCausticNoise(patternUV + WAVES * vec2(1., -1.) * wavesNoise, 2. * t, 1.5);

  // Second caustic layer at a finer scale and slower time, summed in.
  causticNoise += LAYERING * getCausticNoise(patternUV + 2. * WAVES * vec2(1., -1.) * wavesNoise, 1.5 * t, 2.);
  causticNoise = causticNoise * causticNoise;

  // Edge mask: lets caustic distortion concentrate near the borders, mixed
  // toward full strength by EDGES. (Kept verbatim; harmless when terminal
  // fills the viewport, matches upstream look on the sample image edges.)
  float edgesDistortion = smoothstep(0., .1, imageUV.x);
  edgesDistortion *= smoothstep(0., .1, imageUV.y);
  edgesDistortion *= (smoothstep(1., 1.1, imageUV.x) + (1.0 - smoothstep(.8, .95, imageUV.x)));
  edgesDistortion *= (1.0 - smoothstep(.9, 1., imageUV.y));
  edgesDistortion = mix(edgesDistortion, 1., EDGES);

  float causticNoiseDistortion = .02 * causticNoise * edgesDistortion;
  float wavesDistortion = .1 * WAVES * wavesNoise;

  // Refract the terminal lookup along both fields.
  imageUV += vec2(wavesDistortion, -wavesDistortion);
  imageUV += CAUSTIC * causticNoiseDistortion;

  vec4 color = texture(iChannel0, imageUV);

  // Caustic-shaped highlight tint: brightens the surface following the caustic
  // web, modulated by the wave field for a wet-shimmer feel.
  float causticClamped = max(-.2, causticNoise);
  float highlight = .025 * HIGHLIGHTS * causticClamped;
  highlight *= HIGHLIGHT_ALPHA;
  color.rgb = mix(color.rgb, COLOR_HIGHLIGHT, .05 * HIGHLIGHTS * causticClamped);
  color.rgb += highlight * (.5 + .5 * wavesNoise);

  fragColor = vec4(color.rgb, color.a);
}

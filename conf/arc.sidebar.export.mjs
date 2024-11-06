import { readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
/**
 * 未完工！！！
 * 可以从这三个地方拿到所有书签，但是拿到的书签数量不一致：
 * firebaseSyncState?.syncData?.items
 * sidebarSyncState?.items
 * sidebar?.containers
 */
const park = {
  itemsOfFirebaseSyncState: {
    itemsInfo: {},
    groupInfo: {},
    temp: []
  },
  itemsOfSidebarSyncState: {
    itemsInfo: {},
    groupInfo: {},
    temp: []
  },
  itemsOfSidebar: {
    itemsInfo: {},
    groupInfo: {},
    temp: []
  }
};
async function readSiderbar() {
  try {
    // 读取
    const scriptPath = fileURLToPath(import.meta.url);
    const sidebarPath = resolve(dirname(scriptPath), './StorableSidebar.json');
    const sidebarString = await readFile(sidebarPath, { encoding: 'utf8' });
    const sidebarObject = JSON.parse(sidebarString);
    const sidebarContainers = sidebarObject?.sidebar?.containers || [];
    let itemsOfFirebaseSyncState =
      sidebarObject?.firebaseSyncState?.syncData?.items || [];
    itemsOfFirebaseSyncState = handleItems(
      itemsOfFirebaseSyncState,
      'itemsOfFirebaseSyncState'
    );
    itemsOfFirebaseSyncState
      .filter(item => typeof item !== 'string')
      .filter(item => item?.data?.tab)
      .map(
        ({
          title,
          id,
          data: {
            tab: { savedTitle, savedURL: url }
          }
        }) => ({
          id,
          title: title || savedTitle,
          url
        })
      )
      .forEach(item => {
        park.itemsOfFirebaseSyncState.itemsInfo[item.id] = item;
      });
    park.itemsOfFirebaseSyncState.temp.forEach(
      ({ value: { title, childrenIds = [] } }) => {
        childrenIds.forEach(id => {
          park.itemsOfFirebaseSyncState.groupInfo[id] = title;
        });
      }
    );
    await writeFile(
      resolve(dirname(scriptPath), './itemsOfFirebaseSyncState.itemsInfo.json'),
      JSON.stringify(park.itemsOfFirebaseSyncState.itemsInfo)
    );
    await writeFile(
      resolve(dirname(scriptPath), './itemsOfFirebaseSyncState.groupInfo.json'),
      JSON.stringify(park.itemsOfFirebaseSyncState.groupInfo)
    );
    let itemsOfSidebarSyncState = sidebarObject?.sidebarSyncState?.items || [];
    itemsOfSidebarSyncState = handleItems(
      itemsOfSidebarSyncState,
      'itemsOfSidebarSyncState'
    );
    itemsOfSidebarSyncState
      .filter(item => typeof item !== 'string')
      .filter(item => item?.data?.tab)
      .map(
        ({
          value: {
            title,
            id,
            data: {
              tab: { savedTitle, savedURL: url }
            }
          }
        }) => ({
          id,
          title: title || savedTitle,
          url
        })
      )
      .forEach(item => {
        park.itemsOfSidebarSyncState.itemsInfo[item.id] = item;
      });
    park.itemsOfSidebarSyncState.temp.forEach(
      ({ value: { title, childrenIds = [] } }) => {
        childrenIds.forEach(id => {
          park.itemsOfSidebarSyncState.groupInfo[id] = title;
        });
      }
    );
    await writeFile(
      resolve(dirname(scriptPath), './itemsOfSidebarSyncState.itemsInfo.json'),
      JSON.stringify(park.itemsOfSidebarSyncState.itemsInfo)
    );
    await writeFile(
      resolve(dirname(scriptPath), './itemsOfSidebarSyncState.groupInfo.json'),
      JSON.stringify(park.itemsOfSidebarSyncState.groupInfo)
    );
    let { items: itemsOfSidebar } =
      sidebarContainers.filter(object => 'items' in object)?.[0] || {};
    itemsOfSidebar = handleItems(itemsOfSidebar, 'itemsOfSidebar');
    park.itemsOfSidebar.itemsInfo = itemsOfSidebar;
    itemsOfSidebar
      .filter(item => typeof item !== 'string')
      .filter(item => item?.data?.tab)
      .map(
        ({
          title,
          id,
          data: {
            tab: { savedTitle, savedURL: url }
          }
        }) => ({
          id,
          title: title || savedTitle,
          url
        })
      )
      .forEach(item => {
        park.itemsOfSidebar.itemsInfo[item.id] = item;
      });
    park.itemsOfSidebar.temp.forEach(({ title, childrenIds }) => {
      childrenIds.forEach(id => {
        park.itemsOfSidebar.groupInfo[id] = title;
      });
    });
    await writeFile(
      resolve(dirname(scriptPath), './itemsOfSidebar.itemsInfo.json'),
      JSON.stringify(park.itemsOfSidebar.itemsInfo)
    );
    await writeFile(
      resolve(dirname(scriptPath), './itemsOfSidebar.groupInfo.json'),
      JSON.stringify(park.itemsOfSidebar.groupInfo)
    );
  } catch ({ message }) {
    throw new Error(message);
  }
}
function handleItems(items = [], where = '') {
  const temp = [...items];
  temp.forEach(tempItem => {
    if (
      Reflect.apply(Object.prototype.toString, tempItem, []) ===
      '[object Object]'
    ) {
      if (tempItem?.data?.tab) {
        tempItem.data.tab.savedTitle = tempItem?.title;
      } else if (tempItem?.value?.data?.tab) {
        tempItem.value.data.tab.savedTitle = tempItem?.value?.title;
      } else {
        park[where].temp.push(tempItem);
      }
    }
  });
  return temp;
}
readSiderbar();

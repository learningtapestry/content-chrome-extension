import constants from './constants.js';

// Listen to changes in the current URL so we can change the icon for pages
// where the extension is irrelevant.

function changeIcon(url) {
  let iconPath = constants.classroomRegex.test(url) ?
    'images/icon-38.png' :
    'images/icon-38-off.png';

  chrome.browserAction.setIcon({path: iconPath});
};

chrome.tabs.onActivated.addListener(activeInfo => {
  chrome.tabs.get(activeInfo.tabId, tab => {
    if (tab.url) changeIcon(tab.url);
  });
});

chrome.tabs.onCreated.addListener(tab => {
  if (tab.url) changeIcon(tab.url);
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
  if (changeInfo.url) changeIcon(changeInfo.url);
});

// Set up the seach UI when clicking the extension icon.

chrome.browserAction.onClicked.addListener(activeTab => {
  chrome.tabs.query({currentWindow: true, active: true}, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, 'ICON_CLICKED');
  });
});

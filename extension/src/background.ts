chrome.runtime.onInstalled.addListener(() => {
  chrome.webNavigation.onCompleted.addListener(
    () => {
      chrome.tabs.query({ active: true, currentWindow: true }, ([{ id }]) => {
        if (id) {
          chrome.action.disable(id);
        }
      });
    },
    { url: [{ hostContains: 'google.com' }] }
  );
});

chrome.runtime.onMessageExternal.addListener(
  (message, sender, sendResponse) => {
    if (message.token) {
      chrome.storage.local.set({ token: message.token }, () => {
        sendResponse({ status: 'success' });
      });

      sendResponse({ status: 'success' });

      chrome.runtime.sendMessage({
        event: 'token_received',
        token: message.token,
      });
    }
  }
);

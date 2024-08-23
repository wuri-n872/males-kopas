// background.js
chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.executeScript({
        target: {tabId: tab.id},
        files: ['content.js']
    });
});

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        const { type } = request;
        if (type === 'put') {
            console.log(request);
            
            chrome.storage.sync.set({ authValues: request.values })
                .then(() => sendResponse(true));
        } else {
            chrome.storage.sync.get(['authValues'])
                .then((values) => sendResponse(values));
        }

        return true;
    }
);
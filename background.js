chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "searchFleetCommand",
        title: "Search '%s' in FleetCommand",
        contexts: ["selection"]
    });
});

chrome.contextMenus.onClicked.addListener((info) => {
    if (info.menuItemId === "searchFleetCommand") {
        const text = info.selectionText.trim();
        if (text) {
            chrome.storage.local.set({ pendingSearch: text }, () => {
                if (chrome.action) {
                    chrome.action.setBadgeText({ text: "1" });
                    chrome.action.setBadgeBackgroundColor({ color: "#2563eb" });
                }
            });
        }
    }
});
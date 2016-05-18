export function getSettings(defaults) {
    return new Promise((res, rej) => {
        chrome.storage.sync.get(defaults, options => {
            if (chrome.runtime.lastError) {
                rej(chrome.runtime.lastError);
                return;
            }

            res(options);
        });
    });
}

export function saveSettings(settings) {
    return new Promise((res, rej) => {
        chrome.storage.sync.set(settings, () => {
            if (chrome.runtime.lastError) {
                rej(chrome.runtime.lastError);
                return;
            }

            res();
        });
    });
}

export default function injectJSFile(path) {
    const script = document.createElement('script');
    script.src = chrome.extension.getURL(path);
    document.documentElement.appendChild(script);
}

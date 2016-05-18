function injectJSFile(path) {
    const script = document.createElement('script');
    script.src = chrome.extension.getURL(path);
    document.documentElement.appendChild(script);
}

injectJSFile('pagenav-listener.js');

export default function onPageNav(cb) {
    window.addEventListener('message', ({ data } = {}) => {
        if (data.octoEdit && data.partialNav) cb();
    });
}

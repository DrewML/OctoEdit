import injectJSFile from './inject-js';

injectJSFile('pagenav-listener.js');

export default function onPageNav(cb) {
    window.addEventListener('message', ({ data } = {}) => {
        if (data.octoEdit && data.partialNav) cb();
    });
}

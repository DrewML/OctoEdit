window.addEventListener('pjax:success', postMsg);
window.addEventListener('statechange', postMsg);

function postMsg() {
    window.postMessage({
        octoEdit: true,
        partialNav: true
    }, '*');
}

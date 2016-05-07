window.addEventListener('pjax:success', () => {
    window.postMessage({
        octoEdit: true,
        partialNav: true
    }, '*');
});

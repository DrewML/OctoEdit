const P_KEY = 80;

function toggleTab(e) {
    // Note: When more than one comment field is visible, this always uses the
    // first in the DOM. This is 1:1 with how GitHub's own code handles it
    const previewTab = document.querySelector('.js-preview-tab.selected');
    const codeTab = document.querySelector('.js-octo-edit-tab.selected');
    if (!(previewTab || codeTab)) return;

    e.preventDefault();
    e.stopPropagation();

    if (previewTab) {
        previewTab.closest('form').querySelector('.js-octo-edit-tab').click();
    } else {
        codeTab.closest('form').querySelector('.js-write-tab').click();
    }
}

export default function init(cb) {
    // Note: Purposely on document.body rather than document,
    // to allow catching hotkey before GitHub stops the event
    document.body.addEventListener('keydown', e => {
        const { keyCode, metaKey, shiftKey } = e;

        if (keyCode === P_KEY && metaKey && shiftKey) {
            toggleTab(e);
        }
    });
}

const P_KEY = 80;

export default function init(cb) {
    // Note: Purposely on document.body rather than document,
    // to allow catching hotkey before GitHub stops the event
    document.body.addEventListener('keydown', e => {
        const { keyCode, metaKey, shiftKey } = e;

        if (keyCode === P_KEY && metaKey && shiftKey) {
            cb(e);
        }
    });
}

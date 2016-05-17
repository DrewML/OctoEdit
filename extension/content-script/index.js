import './extension.css';
import codeMirror from 'codemirror';
import tabHandler from './tab-handler';
import onPageNav from './on-page-nav';
import onHotkey from './hotkey';
const bulk = require('bulk-require');
bulk(__dirname, '../../node_modules/codemirror/mode/*/*.{css,js}');

const tabs = tabHandler();
onHotkey(e => {
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
});

function onTabEnter(wrapper, form) {
    const plainTextArea = form.querySelector('.js-comment-field');
    const editor = codeMirror(wrapper, {
        mode: 'gfm',
        lineNumbers: true,
        autofocus: true,
        lineWrapping: true,
        value: plainTextArea.value
    });

    editor.on('change', () => {
        plainTextArea.value = editor.getValue();
    });
}

function onTabLeave(form) {
    // Will be needed eventually
}

function addTab() {
    tabs.addTab({
        title: 'Code',
        onEnter: onTabEnter,
        onLeave: onTabLeave
    });
}

onPageNav(addTab);
addTab();

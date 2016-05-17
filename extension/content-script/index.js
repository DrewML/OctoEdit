import './extension.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/gfm/gfm';
import codeMirror from 'codemirror';
import tabHandler from './tab-handler';
import onPageNav from './on-page-nav';
import { removeElement } from './dom';

const tabs = tabHandler();

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

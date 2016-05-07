import './extension.css';
import 'codemirror/mode/gfm/gfm';
import codeMirror from 'codemirror';
import tabHandler from './tab-handler';
import onPageNav from './on-page-nav';

const tabs = tabHandler();

function onTabEnter(wrapper) {
    const editor = codeMirror(wrapper, {
        mode: 'gfm',
        lineNumbers: true
    });
}

function addTab() {
    tabs.addTab({
        title: 'Code',
        onEnter: onTabEnter
    });
}

onPageNav(addTab);
addTab();

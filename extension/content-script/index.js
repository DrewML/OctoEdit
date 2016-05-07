import tabHandler from './tab-handler';
import onPageNav from './on-page-nav';
import codeMirror from 'codemirror';

const tabs = tabHandler();

function onTabEnter(wrapper) {
    const editor = codeMirror(wrapper);
}

function onTabLeave(form) {
    console.log('leave');
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

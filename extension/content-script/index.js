import tabHandler from './tab-handler';
import onPageNav from './on-page-nav';

const tabs = tabHandler();

function onTabEnter(form) {
    console.log('enter');
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

import './extension.css';
import codeMirror from 'codemirror';
import tabHandler from './tab-handler';
import onPageNav from './on-page-nav';
import initHotkey from './hotkey';
import defaultSettings from './defaults';
import { getSettings } from '../util/settings';

const bulk = require('bulk-require');
bulk(__dirname, '../../node_modules/codemirror/mode/*/*.{css,js}');

getSettings(defaultSettings).then(settings => {
    const tabs = tabHandler();
    initHotkey();

    function onTabEnter(wrapper, form) {
        const plainTextArea = form.querySelector('.js-comment-field');
        const editor = codeMirror(wrapper, {
            mode: 'gfm',
            lineNumbers: settings.showLineNumbers,
            autofocus: true,
            lineWrapping: settings.enableWordWrap,
            value: plainTextArea.value,
            tabSize: settings.tabCharSize
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
            title: settings.tabName,
            onEnter: onTabEnter,
            onLeave: onTabLeave
        });
    }

    onPageNav(addTab);
    addTab();
}).catch(err => {
    console.error('An error occurred with OctoEdit. Please report an issue on GitHub');
    console.error(err);
});

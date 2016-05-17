import './extension.css';
import codeMirror from 'codemirror';

// The Sublime Keymap
import 'codemirror/keymap/sublime';

// Dialogs for search
import 'codemirror/addon/dialog/dialog';

// Better scrollbar stuff
import 'codemirror/addon/scroll/annotatescrollbar';
import 'codemirror/addon/scroll/simplescrollbars';

// Search / Search & Replace
import 'codemirror/addon/search/searchcursor';
import 'codemirror/addon/search/matchesonscrollbar';
import 'codemirror/addon/search/match-highlighter';
import 'codemirror/addon/search/search';

// Editor niceties
import 'codemirror/addon/edit/matchbrackets';
import 'codemirror/addon/edit/matchtags';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/trailingspace';
import 'codemirror/addon/edit/continuelist';

import 'codemirror/addon/comment/comment';
import 'codemirror/addon/comment/continuecomment';

import 'codemirror/addon/fold/foldcode';
import 'codemirror/addon/fold/foldgutter';
import 'codemirror/addon/fold/brace-fold';
import 'codemirror/addon/fold/indent-fold';
import 'codemirror/addon/fold/comment-fold';
import 'codemirror/addon/fold/xml-fold';
import 'codemirror/addon/fold/markdown-fold';

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
        value: plainTextArea.value,
        gutters: ['CodeMirror-foldgutter'],
        keyMap: 'sublime',
        scrollBarStyle: 'overlay',
        matchBrackets: true,
        autoCloseBrackets: true,
        matchTags: true,
        autoCloseTags: true,
        showTrailingSpace: true,
        continueComments: true,
        highlightSelectionMatches: true,
        foldGutter: true,
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

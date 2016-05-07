import { $$, removeClasses } from './dom';

class TabHandler {
    constructor() {
        this.handlers = new WeakMap();
        this._initListener();
    }

    addTab({ title, onEnter, onLeave }) {
        const tabStrips = Array.from($$('.js-previewable-comment-form .tabnav-tabs'));
        const btns = tabStrips.map(tabStrip => {
            const btn = this._createButton(title);
            tabStrip.appendChild(btn);
            return btn;
        });

        this._registerButtons(btns, onEnter, onLeave);
    }

    _createButton(title) {
        const btn = document.createElement('button');
        btn.className = 'btn-link tabnav-tab js-octo-edit-tab';
        btn.textContent = title;

        return btn;
    }

    _createWrapper() {
        const wrapper = document.createElement('div');
        wrapper.classList.add('octo-edit-area');
        return wrapper;
    }

    _registerButtons(btns = [], onEnter, onLeave) {
        const { handlers } = this;

        for (const btn of btns) {
            handlers.set(btn, { onEnter, onLeave });
        }
    }

    _initListener() {
        const { handlers } = this;

        document.body.addEventListener('click', e => {
            if (handlers.has(e.target)) {
                e.preventDefault();
                this._onBtnClick(e.target);
            }
        });
    }

    _onBtnClick(btn) {
        const { handlers } = this;
        const form = btn.closest('.js-previewable-comment-form');

        removeClasses(form.querySelector('.tabnav-tab.selected'), ['selected']);
        removeClasses(form, ['write-selected', 'preview-selected']);

        btn.classList.add('selected');

        const previewWrapper = form.querySelector('.preview-content');
        const codeWrapper = this._createWrapper();
        previewWrapper.parentElement.insertBefore(codeWrapper, previewWrapper);

        handlers.get(btn).onEnter(codeWrapper);
    }
}

export default () => new TabHandler();

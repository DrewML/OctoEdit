import {
    $$,
    removeClasses,
    removeElement,
    hasClass
} from './dom';

// Warning: Dumb code lies ahead. This class pretends it supports
// adding different/multiple tabs, but makes way too many assumptions.
// Good enough for the current use-case.

const EDIT_AREA_CLASS = 'octo-edit-area';
const SELECTED_FORM_CLASS = 'code-selected';
const GH_COMMENT_FORM_CLASS = 'js-previewable-comment-form';

class TabHandler {
    constructor() {
        this.handlers = new WeakMap();
        this._initListener();
    }

    addTab({ title, onEnter }) {
        const tabStrips = Array.from($$(`.${GH_COMMENT_FORM_CLASS} .tabnav-tabs`));
        const btns = tabStrips.map(tabStrip => {
            const btn = this._createButton(title);
            tabStrip.appendChild(btn);
            return btn;
        });

        this._registerButtons(btns, onEnter);
    }

    _createButton(title) {
        const btn = document.createElement('button');
        btn.className = 'btn-link tabnav-tab js-octo-edit-tab';
        btn.textContent = title;

        return btn;
    }

    _createWrapper() {
        const wrapper = document.createElement('div');
        wrapper.classList.add(EDIT_AREA_CLASS);
        return wrapper;
    }

    _registerButtons(btns = [], onEnter) {
        const { handlers } = this;

        for (const btn of btns) {
            handlers.set(btn, { onEnter });
        }
    }

    _initListener() {
        const { handlers } = this;

        document.body.addEventListener('click', e => {
            const octoEditOpen = e.target.closest(`.${SELECTED_FORM_CLASS}`);

            if (handlers.has(e.target)) {
                e.preventDefault();
                if (octoEditOpen) return;

                this._onBtnClick(e.target);
                return;
            }

            if (hasClass(e.target, 'tabnav-tab') && octoEditOpen) {
                this._onTabLeave(e.target);
            }
        });
    }

    _onBtnClick(btn) {
        const { handlers } = this;
        const form = btn.closest(`.${GH_COMMENT_FORM_CLASS}`);

        removeClasses(form.querySelector('.tabnav-tab.selected'), 'selected');
        removeClasses(form, 'write-selected', 'preview-selected');

        btn.classList.add('selected');
        form.classList.add(SELECTED_FORM_CLASS);

        const previewWrapper = form.querySelector('.preview-content');
        const codeWrapper = this._createWrapper();
        previewWrapper.parentElement.insertBefore(codeWrapper, previewWrapper);

        handlers.get(btn).onEnter(codeWrapper, form);
    }

    _onTabLeave(btn) {
        const { handlers } = this;
        const form = btn.closest(`.${GH_COMMENT_FORM_CLASS}`);

        removeClasses(form, SELECTED_FORM_CLASS);
        removeElement(form.querySelector(`.${EDIT_AREA_CLASS}`));
    }
}

export default () => new TabHandler();

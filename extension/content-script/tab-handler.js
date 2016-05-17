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
        this._initListeners();
    }

    addTab({ title, onEnter, onLeave }) {
        const tabStrips = Array.from($$(`.${GH_COMMENT_FORM_CLASS} .tabnav-tabs`));
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
        wrapper.classList.add(EDIT_AREA_CLASS);
        return wrapper;
    }

    _registerButtons(btns = [], onEnter, onLeave) {
        const { handlers } = this;

        for (const btn of btns) {
            const form = this._getCommentFormFromChild(btn);
            handlers.set(form, { onEnter, onLeave });
        }
    }

    _getCommentFormFromChild(el) {
        return el.closest(`.${GH_COMMENT_FORM_CLASS}`);
    }

    _initListeners() {
        const { handlers } = this;

        document.body.addEventListener('click', e => {
            const octoEditOpen = e.target.closest(`.${SELECTED_FORM_CLASS}`);

            if (hasClass(e.target, 'js-octo-edit-tab')) {
                e.preventDefault();
                if (octoEditOpen) return;

                this._onBtnClick(e.target);
                return;
            }

            if (hasClass(e.target, 'tabnav-tab') && octoEditOpen) {
                this._onTabLeave(this._getCommentFormFromChild(e.target));
            }
        });

        document.body.addEventListener('submit', e => {
            if (!hasClass(e.target, 'js-new-comment-form')) {
                return;
            }

            this._onTabLeave(e.target.querySelector(`.${GH_COMMENT_FORM_CLASS}`));
        });
    }

    _onBtnClick(btn) {
        const { handlers } = this;
        const form = this._getCommentFormFromChild(btn);

        removeClasses(form.querySelector('.tabnav-tab.selected'), 'selected');
        removeClasses(form, 'write-selected', 'preview-selected');

        btn.classList.add('selected');
        form.classList.add(SELECTED_FORM_CLASS);

        const previewWrapper = form.querySelector('.preview-content');
        const codeWrapper = this._createWrapper();
        previewWrapper.parentElement.insertBefore(codeWrapper, previewWrapper);

        handlers.get(form).onEnter(codeWrapper, form);
    }

    _onTabLeave(form) {
        const { handlers } = this;

        removeClasses(form, SELECTED_FORM_CLASS);
        removeElement(form.querySelector(`.${EDIT_AREA_CLASS}`));

        handlers.get(form).onLeave(form);
    }
}

export default () => new TabHandler();

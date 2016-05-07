export const $$ = document.querySelectorAll.bind(document);

export function removeClasses(el, ...classList) {
    classList.forEach(className => el.classList.remove(className));
}

export function removeElement(el) {
    el.parentElement.removeChild(el);
}

export function hasClass(el, className) {
    return el.classList.contains(className);
}

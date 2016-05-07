export const $$ = document.querySelectorAll.bind(document);

export function removeClasses(el, classList = []) {
    classList.forEach(className => el.classList.remove(className));
}

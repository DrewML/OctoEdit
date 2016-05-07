export const $$ = selector => Array.from(document.querySelectorAll(selector));

export function removeClasses(el, classList = []) {
    classList.forEach(className => el.classList.remove(className));
}

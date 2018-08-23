export const delEvt = (el, tp, fn) => {
  el.removeEventListener(tp, fn, false);
};
export const addEvt = (el, tp, selector) => {
  el.addEventListener(tp, selector, false);
};

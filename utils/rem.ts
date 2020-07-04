export default (doc: Document, win: Window) => {
  const scale = 100;
  const refer = 1366;
  const docEl = doc.documentElement;
  const resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
  const recalc = () => {
    const { clientWidth } = docEl;
    if (clientWidth) {
      docEl.style.fontSize = `${scale * (clientWidth / refer)}px`;
    }
  };
  if (doc.addEventListener) {
    window.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
  }
  recalc();
};

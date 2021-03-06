const query = (selector: string, parent: any) => Array.from(
  (parent || document).querySelectorAll(selector),
);

export default (
  selector: string,
  parent?: any,
  options?: {},
) => {
  const observer = new IntersectionObserver((changes: any) => {
    const result = changes.filter((item: any) => item.isIntersecting);
    if (result.length > 0) {
      result.map((item: any) => {
        const { target } = item;
        const attribute = target.getAttribute('data-attribute');
        if (attribute) {
          const value = target.getAttribute(`data-${attribute}`);
          target.setAttribute(attribute, value);
          target.removeAttribute('data-attribute');
          target.removeAttribute(`data-${attribute}`);
        }
        observer.unobserve(target);
        return target;
      });
    }
  }, options);
  query(selector, parent).forEach((item: any) => {
    const attribute = 'src';
    const value = item.getAttribute(attribute);
    if (item.localName === 'img') {
      item.setAttribute('src', 'data:image/svg+xml;utf8,<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="1280" height="1183"></svg>');
    } else {
      item.removeAttribute(attribute);
    }
    item.setAttribute('data-attribute', attribute);
    item.setAttribute(`data-${attribute}`, value);
    observer.observe(item);
    return item;
  });
};

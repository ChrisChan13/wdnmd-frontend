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
        }
        observer.unobserve(target);
        return target;
      });
    }
  }, options);
  query(selector, parent).forEach((item: any) => {
    let attribute = '';
    let value = '';
    switch (item.localName) {
      case 'iframe':
      case 'image':
        attribute = 'src';
        value = item.getAttribute(attribute);
        break;
      default:
    }
    if (attribute) {
      item.removeAttribute(attribute);
      item.setAttribute('data-attribute', attribute);
      item.setAttribute(`data-${attribute}`, value);
      observer.observe(item);
    }
    return item;
  });
};

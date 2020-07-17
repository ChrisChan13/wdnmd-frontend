const query = (selector: string, parent: any) => Array.from(
  (parent || document).querySelectorAll(selector),
);

export default (
  selector: string,
  parent: any,
  before: (target: any) => {},
  after: (target: any) => {},
) => {
  const observer = new IntersectionObserver((changes: any) => {
    const result = changes.filter((item: any) => item.intersectionRatio > 0);
    if (result.length > 0) {
      after(result.map((item: any) => {
        observer.unobserve(item.target);
        return item.target;
      }));
    }
  });
  query(selector, parent).forEach((item: any) => {
    before(item);
    observer.observe(item);
    return item;
  });
};

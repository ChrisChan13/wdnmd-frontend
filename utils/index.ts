/**
 * 由假名查找对应父子级ID
 * @param labels 分类数组
 * @param parentAlias 父级假名
 * @param ChildAlias 子级假名
 * @returns 父子级ID
 */
export const getParentAndChild = (
  labels: [],
  parentAlias?: string | string[],
  ChildAlias?: string | string[],
) => {
  type Ids = {
    parent?: string,
    child?: string,
  };
  const ids:Ids = {};
  if (parentAlias) {
    const replacedParent: any = labels.find(
      (item: any) => !item.parent && item.alias === parentAlias,
    );
    let replacedChild: any;
    if (ChildAlias) {
      replacedChild = labels.find(
        (item: any) => item.parent === replacedParent._id && item.alias === ChildAlias,
      );
    }
    ids.parent = replacedParent ? replacedParent._id : '';
    ids.child = replacedChild ? replacedChild._id : '';
  }
  return ids;
};

export default {
  getParentAndChild,
};

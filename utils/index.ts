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
    parentEntity?: {},
    childEntity?: {},
  };
  const ids: Ids = {};
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
    ids.parentEntity = replacedParent;
    ids.childEntity = replacedChild;
  }
  return ids;
};

const padNumberStart = (number: number, length: number = 2) => `${number}`.padStart(2, '0');

/**
 * 转换时间格式
 * @param time 时间字符串
 */
export const formatTime = (time: string) => {
  const date = new Date(time);
  const now = new Date();
  const diff = (+now - date.getTime()) / 1000;
  if (diff < 30) {
    return '刚刚';
  } if (diff < 3600) {
    return `${Math.ceil(diff / 60)}分钟前`;
  } if (diff < 3600 * 24) {
    return `${Math.ceil(diff / 3600)}小时前`;
  } if (diff <= 3600 * 24 * 7) {
    return `${Math.floor(diff / (3600 * 24))}天前`;
  } if (now.getFullYear() === date.getFullYear()) {
    return `${padNumberStart(date.getMonth() + 1)}-${padNumberStart(date.getDate())} ${padNumberStart(date.getHours())}:${padNumberStart(date.getMinutes())}`;
  }
  return `${date.getFullYear()}-${padNumberStart(date.getMonth() + 1)}-${padNumberStart(date.getDate())} ${padNumberStart(date.getHours())}:${padNumberStart(date.getMinutes())}`;
};

export default {
  getParentAndChild,
  formatTime,
};

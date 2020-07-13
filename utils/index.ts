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
  }
  return ids;
};

/**
 * 转换时间格式
 * @param time 时间字符串
 */
export const formatTime = (time: string) => {
  const d = new Date(time);
  const now = Date.now();
  const diff = (now - d.getTime()) / 1000;
  if (diff < 30) {
    return '刚刚';
  } if (diff < 3600) {
    return `${Math.ceil(diff / 60)}分钟前`;
  } if (diff < 3600 * 24) {
    return `${Math.ceil(diff / 3600)}小时前`;
  } if (diff <= 3600 * 24 * 7) {
    return `${Math.floor(diff / (3600 * 24))}天前`;
  }
  return (
    `${d.getMonth()
      + 1
    }月${
      d.getDate()
    }日${
      d.getHours()
    }时${
      d.getMinutes()
    }分`
  );
};

export default {
  getParentAndChild,
  formatTime,
};

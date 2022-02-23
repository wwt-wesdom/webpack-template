import vnode from "./vnode";

export default function (sel, data, c) {
  if (arguments.length !== 3)
    throw new Error('请传入3个参数');
  let cType = typeof c;
  if (cType === 'string' || cType === 'number') {
    return vnode(sel, data, undefined, c, undefined)
  } else if (Array.isArray(c)) {
    for (let i = 0; i < c.length; i++) {
      const item = c[i];
      if (!(typeof item === 'object' &&　item.hasOwnProperty('sel')))
        throw new TypeError('传入的数组参数中有一项不是h函数');
    }
    return vnode(sel, data, c, undefined, undefined);
  } else if (cType === 'object' && c.hasOwnProperty('sel')) {
    // 相当于第三个参数是数组的第一项
    let children = [c];
    return vnode(sel, data, children, undefined, undefined);
  } else {
    throw new TypeError('传入的第三个参数的类型不对');
  }
}

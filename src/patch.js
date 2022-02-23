import vnode from './vnode'
import createElement from "./createElement";
import patchVNode from "./patchVNode";

export default function (oldVnode, newVnode) {
  // 判断传入的第一个参数是DOM节点还是old vnode节点
  if (oldVnode.sel === '' || oldVnode.sel === undefined) {
    // DOM节点, 此时要包装成虚拟节点
    oldVnode = vnode(oldVnode.tagName.toLowerCase(), {}, [], undefined, oldVnode);
  }
  // 判断oldVnode和newVnode是不是同一个节点
  if (oldVnode.key === newVnode.key && oldVnode.sel === newVnode.sel) {
    patchVNode(oldVnode, newVnode);
  } else {
    console.log('不是同一个节点, 暴力插入新的, 删除旧的，以此节点为基础，先插入，后删除');
    let domNode = createElement(newVnode);
    let pivot = oldVnode.elm;
    pivot.parentNode.insertBefore(domNode, pivot);
    pivot.parentNode.removeChild(pivot)
  }
}



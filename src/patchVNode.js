import createElement from "./createElement";
import updateChildren from "./updateChildren";

export default function patchVNode(oldVnode, newVnode) {
  if (newVnode === oldVnode) {
    return;
  }
  if (newVnode.text !== '' && newVnode.children === undefined || newVnode.children.length === 0) {
    if (oldVnode.text !== newVnode.text) {
      oldVnode.elm.innerText = newVnode.text;
    }
  } else {
    if (oldVnode.children !== undefined && oldVnode.children.length > 0) {
      // 老的有children 新的也有 children
      updateChildren(oldVnode.elm, oldVnode.children, newVnode.children)
    } else {
      // 老的没有有children 新的有 children
      // 清空旧节点的内容
      oldVnode.elm.innerHTML = '';
      for (let i = 0; i < newVnode.children.length; i++) {
        let dom = createElement(newVnode.children[i]);
        oldVnode.elm.appendChild(dom)
      }
    }
  }
}

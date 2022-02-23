import patchVNode from "./patchVNode";
import createElement from "./createElement";

export default function updateChildren(parentElm, oldCh, newCh) {
  let oldStartIdx = 0; // 旧前
  let newStartIdx = 0; // 新前
  let oldEndIdx = oldCh.length - 1; // 旧后
  let newEndIdx = newCh.length - 1; // 新后
  let oldStartVnode = oldCh[0]; // 旧前节点
  let newStartVnode = newCh[0]; // 新前节点
  let oldEndVnode = oldCh[oldEndIdx]; // 旧后节点
  let newEndVnode = newCh[newEndIdx]; // 新后节点

  let keyMap = null;
  while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
    // 新前与旧前
    if (oldStartVnode == null || oldCh[oldStartIdx] == undefined) {
      oldStartVnode = oldCh[++oldStartIdx];
    } else if (oldEndVnode == null || oldCh[oldEndIdx] == undefined) {
      oldEndVnode = oldCh[--oldEndIdx];
    } else if (newStartVnode == null || newCh[newStartIdx] == undefined) {
      newStartVnode = newCh[++newStartIdx]
    } else if (newEndVnode == null || newCh[newEndIdx] == undefined) {
      newEndVnode = newCh[--newEndIdx]
    } else if (checkSameVnode(oldStartVnode, newStartVnode)) {
      console.log('命中新前与旧前');
      patchVNode(oldStartVnode, newStartVnode);
      oldStartVnode = oldCh[++oldStartIdx];
      newStartVnode = newCh[++newStartIdx]
    } else if (checkSameVnode(oldEndVnode, newEndVnode)) {
      console.log('命中新后与旧后');
      patchVNode(oldEndVnode, newEndVnode);
      oldEndVnode = oldCh[--oldEndIdx];
      newEndVnode = newCh[--newEndIdx]
    } else if (checkSameVnode(oldStartVnode, newEndVnode)) {
      console.log('命中新后与旧前');
      patchVNode(oldStartVnode, newEndVnode);
      parentElm.insertBefore(oldStartVnode.elm, oldEndVnode.elm.nextSibling);
      oldStartVnode = oldCh[++oldStartIdx];
      newEndVnode = newCh[--newEndIdx]
    } else if (checkSameVnode(oldEndVnode, newStartVnode)) {
      console.log('命中新前与旧后');
      patchVNode(oldEndVnode, newStartVnode);
      parentElm.insertBefore(oldEndVnode.elm, oldStartVnode.elm);
      oldEndVnode = oldCh[--oldEndIdx];
      newStartVnode = newCh[++newStartIdx]
    } else {
      console.log('都没有命中');
      if (!keyMap) {
        keyMap = {};
        for (let i = oldStartIdx; i <= oldEndIdx; i++) {
          const key = oldCh[i].key;
          if (key !== undefined) {
            keyMap[key] = i;
          }
        }
      }
      console.log(keyMap);
      // 寻找当前这项 {newStartIdx} 这项在keyMap中的 映射位置序号
      const idxInOld = keyMap[newStartVnode.key];
      if (idxInOld === undefined) {
        // 如果idxInOld为undefined表示他是全新的项
        parentElm.insertBefore(createElement(newStartVnode), oldStartVnode.elm)
      } else {
        // 如果不说undefined说明不是全新的项，需要移动节点
        const elmToMove = oldCh[idxInOld];
        patchVNode(elmToMove, newStartVnode);
        oldCh[idxInOld] = undefined;
        parentElm.insertBefore(elmToMove.elm, oldStartVnode.elm)
      }
      newStartVnode = newCh[++newStartIdx];
    }
  }
  // new还有剩余节点没有更新
  if (newStartIdx <= newEndIdx) {
    const before = newCh[newStartIdx + 1] == null ? null : newCh[newStartIdx + 1].elm;
    console.log('new还有剩余节点没有更新');
    // insertBefore会自动识别null，当为支点null时，会自动添加到末尾，相当于appendChild
    for (let i = newStartIdx; i <= newEndIdx; i++) {
      parentElm.insertBefore(createElement(newCh[i]), oldCh[oldStartIdx].elm)
    }
  } else if (oldStartIdx <= oldEndIdx) {
    // old 节点还有多余的没处理完，需要删除
    console.log('old 节点还有多余的没处理完，需要删除');
    for (let i = oldStartIdx; i <= oldEndIdx; i++) {
      if (oldCh[i]) {
        parentElm.removeChild(oldCh[i].elm)
      }
    }
  }
}

// 判断是否是同一个节点
function checkSameVnode(a, b) {
  return a.sel === b.sel && a.key === b.key;
}

import h from './h'
import patch from "./patch";
let myVnode1 = h('ul', {}, [
  h('li', {key: 'A'}, 'A'),
  h('li', {key: 'B'}, 'B'),
  h('li', {key: 'C'}, 'C'),
  h('li', {key: 'D'}, 'D'),
  h('li', {key: 'E'}, 'E'),
  h('li', {key: 'F'}, 'F'),
  h('li', {key: 'G'}, 'G'),
]);

let myVnode2 = h('ul', {}, [
  h('li', {key: 'B'}, 'B'),
  h('li', {key: 'A'}, 'A'),
  h('li', {key: 'D'}, 'D'),
  h('li', {key: 'C'}, 'C'),
  h('li', {key: 'F'}, 'F'),
  h('li', {key: 'G'}, 'G'),
  h('li', {key: 'E'}, 'E'),
]);

// let myVnode1 = h('h1', {}, '你好');
let container = document.getElementById('container');

patch(container, myVnode1);

let btn = document.getElementById('btn');
btn.onclick = function () {
  patch(myVnode1, myVnode2)
};

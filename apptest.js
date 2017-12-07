import arrMap from './src/common'
import fetch from 'isomorphic-fetch'
// import $ from 'jquery'

console.log('this is test')
let arr = ['a','b','c']
arrMap(arr)

// let aa = $('#aa').html()
// console.log(aa)

fetch('/api/data').then(function(res) {
  return res.json();
}).then(function(data) {
  console.log(data);
}).catch(function(e) {
  console.log("Oops, error");
});
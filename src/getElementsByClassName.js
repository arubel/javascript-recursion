// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className) {
  'use strict';

  let result = [];
  let hasClass = (node, someClass) => {
    if (typeof node.classList !== 'undefined' && node.classList.length > 0) {
      if (node.classList.contains(someClass)) {
        result.push(node);
      }
    }
    if (node.childNodes.length > 0) {
      for (let i = 0, j = node.childNodes.length; i < j; ++i) {
        hasClass(node.childNodes[i], someClass);
      }
    }
  }
  hasClass(document.body, className);

  return result;
};

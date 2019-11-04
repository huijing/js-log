"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

(function () {
  var old = console.log;
  var LOG = document.getElementById('log');

  console.log = function (message) {
    if (_typeof(message) == 'object') {
      LOG.innerHTML += (JSON && JSON.stringify ? JSON.stringify(message) : message) + '<br />';
    } else {
      LOG.innerHTML += message + '<br />';
    }
  };
})();

function buildList(list) {
  var result = [];

  var _loop = function _loop() {
    var item = 'item' + i;
    result.push(function () {
      console.log(item + ' ' + list[i]);
    });
  };

  for (var i = 0; i < list.length; i++) {
    _loop();
  }

  return result;
}

function testList() {
  var fnlist = buildList([1, 2, 3]); // Using j only to help prevent confusion -- could use i.

  for (var j = 0; j < fnlist.length; j++) {
    fnlist[j]();
  }
}

testList(); //logs "item2 undefined" 3 times
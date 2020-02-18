"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

(function () {
  var LOG = document.getElementById('log');

  console.log = function (message) {
    if (_typeof(message) == 'object') {
      LOG.innerHTML += (JSON && JSON.stringify ? JSON.stringify(message) : message) + '<br />';
    } else {
      LOG.innerHTML += message + '<br />';
    }
  };
})();
"use strict";
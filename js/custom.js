(function() {
  let old = console.log;
  const LOG = document.getElementById('log');
  console.log = function(message) {
    if (typeof message == 'object') {
      LOG.innerHTML += (JSON && JSON.stringify ? JSON.stringify(message) : message) + '<br />';
    } else {
      LOG.innerHTML += message + '<br />';
    }
  }
})();

function buildList(list) {
  let result = [];
  for (var i = 0; i < list.length; i++) {
    let item = 'item' + i;
    result.push(function() { console.log(item + ' ' + list[i]) });
  }
  return result;
}

function testList() {
  let fnlist = buildList([1, 2, 3]);
  // Using j only to help prevent confusion -- could use i.
  for (var j = 0; j < fnlist.length; j++) {
    fnlist[j]();
  }
}

testList() //logs "item2 undefined" 3 times

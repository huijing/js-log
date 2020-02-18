(function() {
  const LOG = document.getElementById('log');
  console.log = function(message) {
      if (typeof message == 'object') {
      LOG.innerHTML += (JSON && JSON.stringify ? JSON.stringify(message) : message) + '<br />';
      } else {
      LOG.innerHTML += message + '<br />';
      }
  }
})();
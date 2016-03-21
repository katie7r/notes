(function() {
  'use strict';

  angular
    .module('app')
    .filter('titleize', titleize);

  function titleize() {
    return titleizeFilter;

    function titleizeFilter(str) {
      if (str)
        return str.replace(/\w\S*/g, function(s) { return s.charAt(0).toUpperCase() + s.substr(1).toLowerCase(); });
    }
  }

})();

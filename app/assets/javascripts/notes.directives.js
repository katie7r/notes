(function() {
    'use strict';

    angular
        .module('app')
        .directive('noteForm', noteForm);

        function noteForm() {
          return {
            restrict: 'E',
            scope: {
              note: '='
            },
            templateUrl: 'form.html',
            transclude: true
          }
        }

})();

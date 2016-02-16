(function() {
    'use strict';

    angular
        .module('app')
        .factory('NoteService', NoteService);

        NoteService.$inject = ['railsResourceFactory'];

        function NoteService(railsResourceFactory) {
          return railsResourceFactory({
            url: '/notes',
            name: 'note'
          });
        }

})();

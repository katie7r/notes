(function() {
    'use strict';

    angular
        .module('app')
        .controller('NotesController', NotesController);

        NotesController.$inject = ['NoteService'];

        function NotesController(NoteService) {
          var vm = this;
          vm.query = query;
          vm.create = create;
          vm.update = update;
          vm.destroy = destroy;

          vm.all = vm.query();

          function query() {
            NoteService.query().then(function(response) {
              console.log(response);
              return response;
            });
          }

          function create(note) {
            new NoteService(note).create().then(function(response) {
              console.log('Created note.');
              console.log(response);
              // add note to notes
            });
          }

          function update(note) {
            new NoteService(note).update().then(function(response) {
              console.log('Updated note.');
              console.log(response);
              // update note in notes
            });
          }

          function destroy(note) {
            new NoteService(note).delete().then(function(response) {
              console.log('Destroyed note.');
              console.log(response);
              // remove note from notes
            });
          }
        }

})();

(function() {
    'use strict';

    angular
        .module('app')
        .controller('NotesController', NotesController);

        NotesController.$inject = ['NoteService'];

        function NotesController(NoteService) {
          var vm = this;
          vm.index = index;
          vm.create = create;
          vm.update = update;
          vm.destroy = destroy;

          vm.all = vm.index();

          function index() {
            return NoteService.query();
          }

          function create(note) {
            new NoteService(note).$save().then(function(note) {
              vm.all.push(note);
            });
          }

          function update(note) {
            return NoteService.update({ id: note.id }, note);
          }
          // function update(noteData) {
          //   var note = new NoteService(noteData);
          //   return NoteService.update({ id: note.id }, note);
          // }

          function destroy(note) {
            return NoteService(note).delete({ id: note.id });
          }
          // function destroy(noteData) {
          //   var note = new NoteService(noteData);
          //   return NoteService(note).delete({ id: note.id });
          // }
        }

})();

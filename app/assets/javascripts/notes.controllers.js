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

          vm.noteData = noteData;

          function index() {
            return NoteService.query();
          }

          function create(note) {
            // validation
            new NoteService(note).$save().then(function(savedNote) {
              vm.all.push(savedNote);
            });
          }

          function update(note) {
            var noteData = vm.noteData(note);
            new NoteService(noteData).$update({ id: note.id }, noteData).then(function(savedNote) {
              console.log(savedNote);
            });
          }

          function destroy(note) {
            new NoteService(noteData).$delete({ id: note.id }).then(function(response) {
              // if success
              var index = vm.all.indexOf(note);
              vm.all.splice(index, 1);
            });
          }
        }

        function noteData(note) {
          return {
            'title': note.title,
            'category': note.category,
            'details': note.details,
            'text': note.text
          };
        }

})();

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

          vm.filter = notesFilter;
          vm.prefilter = prefilter;
          vm.filterOn;
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

          function notesFilter(item) {
            if (!vm.filtering)
              return true;

            var filtered = true;
            angular.forEach(vm.filterOn, function(terms, attr) {
              if (filtered && terms.length) {
                var filterAgainst;
                if (attr == 'all')
                  filterAgainst = item.title + item.category + item.details + item.text;
                else
                  filterAgainst = item[attr];
                filterAgainst = filterAgainst.toLowerCase();

                angular.forEach(terms, function(term, idx) {
                  filtered = (filtered && filterAgainst.indexOf(term) != -1);
                });
              }
            });
            return filtered;
          }

          function prefilter() {
            // e.g., 'cats', 'pigeon genetics', 'd:ideas d:ponies', 'title:projects body:secretsssss', etc.
            if (!vm.filterInput) {
              vm.filterOn = {};
            } else {
              var input = vm.filterInput.toLowerCase();
              var raw = [];
              var terms = { 'all': [], 'title': [], 'category': [], 'details': [], 'text': [] };

              if (input.indexOf(' ') == -1)
                raw.push(input);
              else
                raw = input.split(' ');

              angular.forEach(raw, function(term, idx) {
                if (term.indexOf(':') == -1) {
                  terms['all'].push(term);
                } else {
                  var pair = term.split(':');
                  var attr = pair[0];

                  if (attr == 't' || 'title'.indexOf(attr) != -1)
                    attr = 'title';
                  else if (attr == 'c' || 'category'.indexOf(attr) != -1)
                    attr = 'category';
                  else if (attr == 'd' || 'details'.indexOf(attr) != -1)
                    attr = 'details';
                  else if (attr == 'b' || 'body'.indexOf(attr) != -1 || attr == 'text')
                    attr = 'text';
                  else
                    attr = 'all';
                  console.log(attr);

                  terms[attr].push(pair[1]);
                }
              });

              vm.filterOn = terms;
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
        }

})();

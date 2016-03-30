'use strict';
var redmine = require('./redmine.js');

module.exports =
{
    help: function(command, args, bot) {
      bot.postWithParams(`
        *GETTING STARTED:*
           help                                           Show help;
           redmine                                        Redmine actions;
              _note_ $id                                  Print redmine note by its id;
              _new_note_ $TITLE, $BODY                    TBD > Create new note in redmine knowledgebase ( Title and Body should be splited by comma symbol);
              _search_ $query                             Full text search in redmine;
           something                                      Tell me something;
      `)
    },
    redmine: function(command, args, bot) {
      redmine.call(command, args, bot);
    },
    call: function(namespace, command, args, bot) {
      this[namespace](command, args, bot);
    }
}



'use strict';
var redmine = require('./redmine.js');
var password = require('./password.js');

module.exports =
{
    help: function(command, args, bot) {
      bot.postWithParams(`
        *GETTING STARTED:*
           help                                           Show help;
           redmine                                        Redmine actions;
              _note_ $id                                  Print redmine note by its id;
              _new_note_ $TITLE; $BODY                    TBD > Create new note in redmine knowledgebase ( Title and Body should be splited by comma symbol);
              _search_ $query                             Full text search in redmine;
           password encode $PASSWORD                      password url encoder
           something                                      Tell me something;
      `)
    },
    redmine: function(command, args, bot) {
      redmine.call(command, args, bot);
    },
    password: function(command, args, bot) {
      password.call(command, args, bot);
    },
    call: function(namespace, command, args, bot) {
      this[namespace](command, args, bot);
    }
}



'use strict';

var util = require('util');
var password = require('./password.js');

module.exports =
{
  encode: function(args, bot) {
    var passwords = args.split(' ')
    var results = ""
    passwords.forEach (function (str){
      results += encodeURIComponent(str).replace(/[!'()*]/g, function(c) {
                  return '%' + c.charCodeAt(0).toString(16);
                }) + "\n"
    });
    bot.postWithParams("\n*Results:*\n"+results);
  },
  call: function(command, args, bot) {
    // console.log('> inside Redmine.call: "' + command + '" "' + util.inspect(args) + '"');
    this[command](args, bot);
  }
}

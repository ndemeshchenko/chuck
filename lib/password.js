'use strict';

var util = require('util');

module.exports =
{
  encode: function(args, bot) {
    passwords = args.split(' ')
    results = ""
    args.forEach (function (result){
      results += encodeURIComponent(str).replace(/[!'()*]/g, function(c) {
                  return '%' + c.charCodeAt(0).toString(16);
                }) + "\n"
    }
    bot.postWithParams("\n*Results:*\n"+results);
  },
  call: function(command, args, bot) {
    // console.log('> inside Redmine.call: "' + command + '" "' + util.inspect(args) + '"');
    this[command](args, bot);
  }
}
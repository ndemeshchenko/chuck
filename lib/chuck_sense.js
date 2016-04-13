'use strict';

var request = require('request');
var util = require('util');

module.exports =
{
  call: function(bot) {
    request({
      uri: 'http://api.icndb.com/jokes/random',
      method: 'GET',
      followRedirect: true
    }, function (error, response, body) {
      if (error)
        console.log(error);
      try {
          data = JSON.parse(body);
          bot.postWithParams("> "+ data.value.joke);
        } catch (ex) {
          console.log(ex);
        }
    });
  }
}

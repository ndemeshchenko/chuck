'use strict';

var util = require('util');
var fs = require('fs');
var path = require('path');
var commands = require('../lib/commands.js');
var SQLite = require('sqlite3').verbose();
var SlackBot = require('slackbots');
var Entities = require('html-entities').XmlEntities;

var bot_trigger_name = 'chuck'

SlackBot.prototype.postWithParams = function (original_message) {
  var params = {
      icon_url: 'https://raw.githubusercontent.com/lmammino/norrisbot/master/icon.jpg'
  };
  // bot.postMessageToChannel('ua_dev_ops_talks', 'Anyone asked for Chuck', params);
  //
  // UNCOMMENT ME
  bot.postMessageToChannel('ua_dev_ops_talks', original_message, params);
}

var bot = new SlackBot({ token: process.env.SLACK_ACCESS_TOKEN,name: 'Chuck Norris'});


var isChatMessage = function (message) {
  return message.type === 'message' && Boolean(message.text);
}

var isChannelConversation = function (message) {
  return typeof message.channel === 'string' &&
          message.channel[0] === 'C';
}

var isFromNorrisBot = function (message) {
  return message.user === bot.id;
}

var isMentioningChuckNorris = function (message) {
  return message.text.toLowerCase().indexOf('chuck') > -1 ||
          message.text.toLowerCase().indexOf(bot.name) > -1;
}

bot.on('start', function() {
    // more information about additional params https://api.slack.com/methods/chat.postMessage
    var params = {
        icon_url: 'https://raw.githubusercontent.com/lmammino/norrisbot/master/icon.jpg'
    };

    // bot.postMessageToChannel('ua_dev_ops_talks', 'init bot');

    //// define existing username instead of 'user_name'
    //// bot.postMessageToUser('user_name', 'test', params);

    //// define private group instead of 'private_group', where bot exist
    //// bot.postMessageToGroup('devops_ua', 'test_bot!', params);
});

bot.on('message', function(message) {
  if (isChatMessage(message) &&
      // isChannelConversation(message) &&
      !isFromNorrisBot(message) &&
       isMentioningChuckNorris(message)
     ){

        var entities = new Entities();
        var word_regexp = /(?:^|(?:[.!?]\s))(\w+)/
        // parse bot params
        var command_string = entities.decode(message.text.replace(bot_trigger_name, '').trim());
        // var namespace = command_string.substr(0,command_string.indexOf(' ')).trim();

        var namespace = command_string.match(word_regexp)[0]
        var namespace_command_string = command_string.replace(namespace, '').trim();
        if ( namespace_command_string != undefined && namespace_command_string != null && namespace_command_string.length > 0){
          console.log(util.inspect(namespace_command_string))
          var namespace_command_name = namespace_command_string.match(word_regexp)[0];
          var namespace_command_args = namespace_command_string.replace(namespace_command_name, '');
        }


        console.log('==============');
        console.log(util.inspect(command_string));
        // console.log("command_string: " + command_string);
        console.log("namespace: "+ namespace);
        console.log("namespace_command_name: " + namespace_command_name);
        console.log("namespace_command_args: " + util.inspect(namespace_command_args));
        console.log("\n");

	try {
          commands.call(namespace, namespace_command_name, namespace_command_args, bot);
        } catch (error) {
          console.log(error)
        }

     }
});



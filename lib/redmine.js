'use strict';

var request = require('request');
var util = require('util');
var redmine = require('./redmine.js');

module.exports =
{
    new_note: function(args, bot) {
      // console.log('> inside Redmine.new_note: "' + args + '"');

      var title = args.substr(0, args.indexOf(';'));
      var body = args.substr(args.indexOf(';')+1);
      console.log(util.inspect(body))
      var payload = {
          category_id: 2,
          article: {
            title: title,
            content: body
          }
        }
      this.redmine_post_request('/projects/npa/knowledgebase/articles.json', payload, bot, function (response_body) {
        var url = response_body['url'].replace(process.env.REDMINE_HOST, process.env.REDMINE_PUBLIC_HOST + ":" + process.env.REDMINE_PUBLIC_PORT)
        bot.postWithParams("*New article:*\n"+"> :notebook: <"+ url + "|" + response_body["article"]["title"] + ">")
        // console.log(response_body["url"]);
      });
    },
    note: function(args, bot) {
      // console.log('> inside Redmine.note' + args)
      var id = args.trim();
      this.redmine_get_request('/projects/3/knowledgebase/articles/' + id + '.json', bot, function (response_body) {
        bot.postWithParams("\n*" + response_body.title + "*\n " + response_body.content.replace(/<pre>/gi, '```').replace(/<\/pre>/gi, '```'))
      });
    },

    new_tkt: function(args, bot) {
      console.log('> inside Redmine.new_tkt: "' + args + '"');

      var subject = args.substr(0, args.indexOf(';'));
      var description = args.substr(args.indexOf(';')+1);
      console.log(util.inspect(description))
      var payload = {
          issue: {
            project_id: 'npa',
            subject: subject,
            description: description,
            priority_id: 4
          }
        }
      this.redmine_post_request('/issues.json', payload, bot, function (response_body) {
        var url = response_body['url'].replace(process.env.REDMINE_HOST, process.env.REDMINE_PUBLIC_HOST + ":" + process.env.REDMINE_PUBLIC_PORT)
        bot.postWithParams("*New issue:*\n"+"> :notebook: <"+ url + "|" + response_body["issue"]["subject"] + ">")
        // console.log(response_body["url"]);
      });
    },
    search: function(args, bot) {
      console.log('> inside Redmine.search: "' + args + '"');
      var uri = '/search.json?q=' + args.trim();
      this.redmine_get_request(uri, bot, function (response_body) {
        var results = '';
        response_body['results'].forEach (function (result){
	      var url = result['url'].replace(process.env.REDMINE_HOST, process.env.REDMINE_PUBLIC_HOST + ":" + process.env.REDMINE_PUBLIC_PORT)
              results += "<" + url + "|" + result['title'].trim() + ">" + "\n";
        });
        bot.postWithParams("\n*Results:*\n"+results);
      })
    },

    call: function(command, args, bot) {
      // console.log('> inside Redmine.call: "' + command + '" "' + util.inspect(args) + '"');
      this[command](args, bot);
    },

    redmine_get_request: function(rest_uri,bot, callback) {
      request({
        uri: process.env.REDMINE_PROTOCOL + "://" + process.env.REDMINE_HOST + ":" + process.env.REDMINE_PORT + rest_uri,
        method: 'GET',
        headers: {
              'X-Redmine-API-Key': process.env.REDMINE_ACCESS_TOKEN,
              'Content-Type': 'application/json'
        },
        followRedirect: true
      }, function (error, response, body) {
        if (error)
          console.log(error);
        try {
            callback(JSON.parse(body));
          } catch (ex) {
            console.log(ex);
          }
      });
    },
    redmine_post_request: function(rest_uri, payload, bot, callback) {
      request({
        uri: process.env.REDMINE_PROTOCOL + "://" + process.env.REDMINE_HOST + ":" + process.env.REDMINE_PORT + rest_uri,
        method: 'POST',
        headers: {
            'X-Redmine-API-Key': process.env.REDMINE_ACCESS_TOKEN,
            'Content-Type': 'application/json'
        },
        followRedirect: true,
        form: payload
      }, function (error, response, body) {
        console.log('body: ' + body);
	if (error)
	  console.log(error);
        try {
          callback(JSON.parse(body));
        } catch (ex) {
          console.log(ex)
        }
      });
    }
}



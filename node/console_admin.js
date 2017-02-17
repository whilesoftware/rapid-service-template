#!/usr/bin/env node

if (typeof Object.assign != 'function') {
  Object.assign = function(target) {
    'use strict';
    if (target == null) {
      throw new TypeError('Cannot convert undefined or null to object');
    }

    target = Object(target);
    for (var index = 1; index < arguments.length; index++) {
      var source = arguments[index];
      if (source != null) {
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
    }
    return target;
  };
}

'use strict';

const mongo_url = 'mongodb://db:27017/rapid';

var mongoose = require('mongoose');
require('./models/User');

// load the super secret key from file
var fs = require('fs');
var SUPERSECRETKEY = fs.readFileSync(__dirname + '/config/secret');
SUPERSECRETKEY = SUPERSECRETKEY.slice(0, SUPERSECRETKEY.length - 1)

var path = require('path');

var db = mongoose.connection;
var User = mongoose.model('User');

function register_user(_username, _password) {
  var user = new User();
  user.username = _username;
  user.setPassword(_password);
  user.save(function(err) {
    if (err) {
      console.log('error creating user :(');
    }
    console.log('user created: ' + _username);
    process.exit(0);
  });
}

function mongo_entrypoint() {
  mongoose.connect(mongo_url);
}

db.once('open', function() {
  // we're connected via mongoose

  const args = process.argv;
  var username=args[2];
  var password=args[3];

  // try to add the new user account
  register_user(username, password);
});

db.on('error', function() {
  console.error.bind(console, 'connection error:');
});

mongo_entrypoint();

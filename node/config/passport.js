var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({username:username}, function(err, user) {
      if (err) {
        return done(err);
      }
      var creds_good = false;
      if (user) {
        if (user.validPassword(password)) {
          creds_good = true;
        }
      }

      if (creds_good) {
        return done(null, user);
      }else{
        return done(null, false, {message: 'username/password did not match'});
      }
    });
  }
));

var crypto = require('crypto');
var mongoose = require('mongoose');
User = mongoose.model('User');

function hashPW(pwd) {
  return crypto.createHash('sha256').update(pwd).digest('base64').toString();
};

exports.login = function(req, res) {
  User.findOne({ username: req.body.username }).exec(function(error, user) {
    if(!user) {
      error = "User not found";
    }
    else if(user.hashed_password === hashPW(req.body.password.toString())) {
      req.session.regenerate(function() {
        req.session.user = user.id;
        req.session.username = user.username;
        req.session.msg = "Signed in as " + user.username;
        res.redirect('/');
      });
    }
    else {
      error = "Authentication failed!";
    }
    if(error) {
      req.session.regenerate(function() {
        req.session.msg = error;
        res.redirect('/login');
      });
    }
  });
};

exports.signup = function(req, res) {
  var user = new User({ username: req.body.username });
  user.set('hashed_password', hashPW(req.body.password));
  user.set('email', req.body.email);
  user.save(function(error) {
    if(error) {
      res.session.error = error;
      res.redirect('/signup');
    }
    else {
      req.session.user = user.id;
      req.session.username = user.username;
      req.session.msg = 'Signed up as ' + user.username;
      res.redirect('/');
    }
  });
};

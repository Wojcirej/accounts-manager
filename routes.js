var crypto = require('crypto');
var express = require('express');
module.exports = function(app) {
  var users = require('./controllers/users_controller');
  app.use('/static', express.static('./static')).
  use('/lib', express.static('../lib')
  );

  app.get('/', function(req, res) {
    if (req.session.user) {
      res.render('index', { username: req.session.username, msg: req.session.msg });
    }
    else {
      req.session.msg = 'Access denied!';
      res.redirect('/login');
    }
  });

  app.get('/signup', function(req, res) {
    if(req.session.user) {
      res.redirect('/');
    };
    res.render('signup', { msg: req.session.msg });
  });

  app.get('/login', function(req, res) {
    if(req.session.user) {
      res.redirect('/');
    };
    res.render('login', { msg: req.session.msg} );
  });
}

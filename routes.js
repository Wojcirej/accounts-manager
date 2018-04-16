var crypto = require('crypto');
var express = require('express');
module.exports = function(app) {
  var users = require('./controllers/usersController');
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

  app.post('/signup', users.signup);

  app.get('/login', function(req, res) {
    if(req.session.user) {
      res.redirect('/');
    };
    res.render('login', { msg: req.session.msg} );
  });

  app.post('/login', users.login);

  app.get('/logout', function(req, res) {
    req.session.destroy(function() {
      res.redirect('/login');
    });
  });

  app.get('/user', function(req, res) {
    if (req.session.user) {
      res.render('show', { msg: req.session.msg });
    }
    else {
      req.session.msg = 'Access denied!';
      res.redirect('/login');
    };
  });

  app.get('/user/profile', users.show);
  app.post('/user/delete', users.destroy);
  app.post('/user/update', users.update);
}

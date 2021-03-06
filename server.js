var express = require('express');
require('dotenv').config();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var mongoStore = require('connect-mongo')({ session: expressSession });
var mongoose = require('mongoose');
require('./models/User.js');
var conn = mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/accounts-manager');
var app = express();
app.engine('.html', require('ejs').__express);
app.set('views',__dirname + '/views');
app.set('view engine', 'html');
app.use(bodyParser());
app.use(cookieParser());
app.use(expressSession({
  secret: 'SECRET',
  cookie: { maxAge: 60*60*1000 },
  store: new mongoStore({
    db: mongoose.connection.db,
    url: process.env.MONGODB_URI || 'mongodb://localhost:27017/accounts-manager',
    collection: 'sessions'
  })
}));
require('./routes')(app);
app.listen(process.env.PORT || 3000);

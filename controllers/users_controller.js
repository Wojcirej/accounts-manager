var crypto = require('crypto');
var mongoose = require('mongoose');
User = mongoose.model('User');

function hashPW(pwd) {
  return crypto.createHash('sha256').update(pwd).digest('base64').toString();
};

const crypto = require('crypto').randomBytes(256).toString('hex');

module.exports = {
  uri: 'mongodb://carlos:carlosabc@ds243345.mlab.com:43345/heroku_jl0q256v',
  specialpassword: crypto,
  db: 'mean-stack'
}
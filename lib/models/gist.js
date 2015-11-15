'use strict';

/**
 * Dependencies
 */
const mongoose = require('mongoose');




const Schema = mongoose.Schema({
  title: String,
  markdown: String,
  content: String,
  lang: String
});

module.exports = mongoose.model('Gist', Schema);

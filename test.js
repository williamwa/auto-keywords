var extract = require('./index');

var options = {
  limit: 100, // defaults to 10
  wordMinLen: 2, // words min len to be counted, defaults to 3
  completeReturns: true, // defaults to false. Thi will return word count instead of only unique words
  language: 'all' // defaults to 'en'. Putting all, we will use all dictionaries got from **dicts folder**
};

console.log(extract('hey buddy, what\'s up!', options));
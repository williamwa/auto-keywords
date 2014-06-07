var MIN_LEN = 3;
var LIMITS_RESULTS_TO = 10;

function extract(content, options) {
  'use strict';

  var stops = [];
  
  // check if there are some options
  options = options || {};
  options.limit = options.limit || LIMITS_RESULTS_TO;
  options.wordMinLen = options.wordMinLen || MIN_LEN;
  options.completeReturns = options.completeReturns || false;
  options.language = options.language || 'en'; // all

  // check for stop keywords
  var dicts = {};
  if (options.language == 'all') {
    dicts = require('require-all')(__dirname + '/dicts');
  } else {
    dicts['placeholder'] = require(__dirname + '/dicts/' + options.language + '.json');
  }
  for (var key in dicts) {
    var dict = dicts[key];
    //
    stops = stops.concat(dict.skip);
  }

  // steps:
  // 1.  lower case
  // 2.  remove tags
  // 3.  remove html special character
  // 4.  remove non-character symbol
  // 5.  merge spaces
  // 6.  split words
  // 7.  count words
  // 8.  sort
  // 9.  remove length less than X
  // 10. remove stop words
  // 11. get words
  // 12. return only X words

  return content
    .toLowerCase()
    .replace(/<[^>]+?>/g, '')
    .replace(/\&[^\s]*?\;/g, '')
    .replace(/[^a-z.]/g, ' ')
    .replace(/\s+/g, ' ')
    .split(/\s/)
    .reduce(function (cts, kw) {
      var found = false;
      cts.forEach(function (v, i) {
        if (v.kw === kw) {
          found = i;
        }
      });
      if (found !== false) {
        cts[found].ct = cts[found].ct + 1;
      } else {
        cts.push({kw: kw, ct: 1});
      }
      return cts;
    }, [])
    .sort(function (x, y) { return y.ct - x.ct; })
    .filter(function (v) {
      return v.kw.length > options.wordMinLen;
    })
    .filter(function (v) {
      return stops.indexOf(v.kw) === -1;
    })
    .map(function (v) {
      return options.completeReturns ? v : v.kw;
    })
    .slice(0, options.limit);
}

exports = module.exports = extract;
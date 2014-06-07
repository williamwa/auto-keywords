Extract keywords from text

to use it:

```
npm install auto-keywords
```

```
var extract = require('auto-keywords');

var keywords = extract('your text here');
```

## Options

You can pass some options to `extract()` this way:

```
var options = {
  limit: 100, // defaults to 10
  wordMinLen: 2, // words min len to be counted, defaults to 3
  completeReturns: true, // defaults to false. Thi will return word count instead of only unique words
  language: 'all' // defaults to 'en'. Putting all, we will use all dictionaries got from **dicts folder**
};
var keywords = extract('your text here', options);
```
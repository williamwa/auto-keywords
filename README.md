Extract keywords from text

to use it:

```
npm install auto-keywords
```

```
var extract = require('auto-keywords');

var keywords = extract('your text here');
```

var keywords = extract('your text here') , { minWordLength : 2, maxNumOfKeywords: 20};

by default, keywords has to be more then 3 letters and maxmium of number of returned keywords is 10.
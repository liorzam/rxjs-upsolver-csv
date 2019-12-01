
# CSV Stream proccessor 
Initilaize new ```StreamBuilder``` instance with relevant path. 
```js
new StreamBuilder({ path: '/Users/lior/Documents/projects/upsolver/data/0.csv' })
```

*By default*, ```CSV_PATH``` environment variable set to path regarding the file or folder contains relevant csv files. 
can be modified by explicit or relative path like:
``` export CSV_PATH=./data```
``` export CSV_PATH=/workdir/csv/data```

Talked with Shani and decided that ```filter``` and ```pluck``` will work throgth field name
*filter* - (fieldName, desiredValue)
*pluck* - (fieldName)


examples:
```
const StreamBuilder = require('lib/');
new StreamBuilder()
	.filter('state', 'Delaware')
	.pluck('mark')
	.max()
	.run();
```
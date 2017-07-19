var _ = require('lodash');
var fs = require('fs');
var fetchData = require('./utils/fetchData.js').fetchData;

var settings = {
    surrogate: {
        propsFilter: ['data', 'children'],
    },
    operation: {
        type: 'aggregate',
        args: [(i) => i.data.domain, (a, b) => { return { domain: b.data.domain, count: a.count + 1 }; }, {domain: '', count: 0}],
    }
}

fetchedDataPromise = fetchData(url='https://www.reddit.com/r/javascript/.json', settings)

fetchedDataPromise
    .then(data=>fs.writeFile('output.json', JSON.stringify(data, null, 4), ()=>{}))


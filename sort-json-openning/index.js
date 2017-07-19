var _ = require('lodash');
var fs = require('fs');
var fetchData = require('./utils/fetchData.js')

var settings = {
    filter: {
        propsFilter: ['data', 'childrens'],
    },
    operation: {
        type: 'sort',
        args: {},
    },
}

fetchedDataPromise = fetchData(url='https://www.reddit.com/r/javascript/.json', settings)
    
fetchedDataPromise
    .then(data=>console.log(data))
// setTimeout(function() {console.log(jsonprovider.jsonObject.value())}, 3000);



// var data = JSON.parse(fs.readFileSync('input.json', 'utf-8'));
// fs.writeFile('output.json', JSON.stringify(data , null, 4), function(err, data) {})

// var oldestParent = _(data).sortBy((x) => x.parentId).value()[0].parentId;

// console.log(oldestParent)

// data.forEach((i) => {
//     if (i.parentId !== oldestParent) {
//         parent = data.filter(j => i.parentId === j.id)[0]
//         if (!parent.children) {
//             parent.children = [];
//         }
//         parent.children = parent.children.concat(i)
//     }
// })
// data = data.filter(x=>x.parentId === oldestParent)

// fs.writeFile('output.json', JSON.stringify(data, null, 4), function(err, data) {});

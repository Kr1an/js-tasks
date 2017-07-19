var fetch = require('node-fetch');
var _ = require('lodash');

var operations = {
    exec: function(data, type, args) {
        if (Object.keys(this).indexOf(type) === -1) {
            return data;
        } else {
            return this[type].apply(null, data.concat(args));
        }
    }
}

function fetchData(url, settings={}) {
    return fetch(url)
        .then(data => data.json())
        .then(data => filter(data, settings.filter))
        .then(data => operation(data, settings.operation))
        .then(data => format(data, settings.format))
        .catch(err => console.error(err))
}
function filter(data, settings={propsFilter: []}) {
    return new Promise((resolve, reject) => {
        settings.propsFilter.forEach((i => {
            if (Object.keys(data).indexOf(i) !== -1) {
                data = data[i]
            } else {
                reject(`Property filter Error: object ${data} does not contains <${i}> property name`)
            }
        }))
        resolve(data);
    })
}
function operation(data, settings={}) {
    return new Promise((resolve, reject) => {
        

        resolve(data);
    })
}
function format(data, settings={}) {
    return new Promise((resolve, reject) => {
        resolve(data);
    })
}



module.exports = {
    fetchData,
    filter,
    operation,
    format,
    operations,
}
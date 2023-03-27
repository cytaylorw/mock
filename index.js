const fs = require('fs')
const schema = require("./schema")
const parser = require('./parser')


const index = 1
const data = {}

Object.entries(schema).forEach(([index, value]) => {
    data[index] = []
    Array.from({length: value.count}).forEach(() => {
        const args = []
        value.arrayFrom?.forEach(array => {
            args.push(data[array[0]].map(name => name.data[array[1]]))
        })
        data[index].push({...value, data: value.mock(...args)})
    })
})

// Array.from({length: 50}).forEach(() => {
//     data.push({...schema[index], data: schema[index].mock()})
// })

console.log(data)

const sql = {}

Object.entries(data).forEach(([index, value]) => {
    sql[index] = value.map(v => parser?.[v.db].insert(v))
})

console.log(sql)

Object.entries(sql).forEach(([index, value]) => {
    var file = fs.createWriteStream(`output/${index}.sql`);
    file.on('error', function(err) { console.log(err) });
    value.forEach(function(v) { file.write(v + '\n') });
    file.end();
})
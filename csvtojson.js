const csv = require('csvtojson')
const fs = require('fs')
const path = require('path')

const input = 'klu'
csv()
    .fromFile(path.join(__dirname, input) + '.csv')
    .then(json => {
        fs.writeFile(input + '.json', JSON.stringify(json), err => {
            if(err) return console.log('Gagal')
            console.log('Berhasil')
        })
    })
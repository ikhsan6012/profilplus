const express = require('express')
const path = require('path')
const router = express.Router()

const KLUModel = require('../models/klu')

router.get('/import', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'html', 'import-klu.html'))
})

router.post('/import', (req, res) => {
    const file = req.files.file.data
    const json = JSON.parse(file.toString('utf8'))
    if(!json.length) res.status(400).json({ msg: 'Gagal Import Data...' })
    const update = json.map(klu => {
        return {
            updateOne: {
                filter: { kd_klu: klu.kd_klu },
                update: klu,
                upsert: true
            }
        }
    })
    return KLUModel.bulkWrite(update)
        .then(data => {
            console.log(data.insertedCount, data.modifiedCount, data.deletedCount)
            res.json({
                insertedCount: data.insertedCount,
                modifiedCount: data.modifiedCount,
                deletedCount: data.deletedCount,
                upsertedCount: data.upsertedCount
            })
        })
})

module.exports = router
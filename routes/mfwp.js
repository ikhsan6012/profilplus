const express = require('express')
const path = require('path')
const router = express.Router()

const MFWPModel = require('../models/mfwp')
const KLUModel = require('../models/klu')

router.get('/import', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'html', 'import-mfwp.html'))
})

router.post('/import', (req, res) => {
    const file = req.files.file.data
    const json = JSON.parse(file.toString('utf8'))
    if(!json.length) res.status(400).json({ msg: 'Gagal Import Data...' })
    const update = json.map(wp => {
        return {
            updateOne: {
                filter: { npwp: wp.npwp },
                update: wp,
                upsert: true
            }
        }
    })
    return MFWPModel.bulkWrite(update)
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

router.get('/:npwp', (req, res) => {
    return MFWPModel.findOne({ npwp: req.params.npwp })
        .populate('alamat_lain email_lain telp_lain')
        .then(async data => {
            console.log(data)
            if(!data) return res.json({ data: null })
            const klu = await KLUModel.findOne({ kd_klu: data.klu })
            res.json({ data: { mfwp: { ...data._doc, klu } } })
        })
        .catch(err => {
            console.log(err)
            res.status(400).json({ msg: 'Gagal Mengambil Data...' })
        })
})

module.exports = router
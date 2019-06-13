const express = require('express')
const router = express.Router()
const { promisify } = require('util')
const fs = require('fs')
const path = require('path')
const writeFile = promisify(fs.writeFile)
const unlink = promisify(fs.unlink)

const MFWPModel = require('../models/mfwp')
const DokumenModel = require('../models/dokumen')

router.get('/:dokumen', (req, res) => {
    const { dokumen } = req.params
    res.sendFile(path.resolve(__dirname, '..', 'dokumen', dokumen), err => {
        if(err){
            console.log(err)
            let error
            if(err.msg) error = err
            res.status(400).json(error || { msg: 'Gagal Menambah Dokumen...' })
        }
    })
})

router.post('/:npwp', (req, res) => {
    const npwp = req.params.npwp
    const { dokumen_nama, dokumen_keterangan } = req.body
    const { dokumen_file } = req.files
    if(!dokumen_nama || !dokumen_file) return res.status(400).json({ msg: 'Nama dan File Tidak Boleh Kosong...' })
    const filename = npwp.replace(/[.-]/gi, '') + '_' + new Date().getTime() + '.pdf'
    return MFWPModel.findOne({ npwp })
        .then(async mfwp => {
            if(!mfwp) throw { msg: 'NPWP Tidak Ditemukan' }
            try {
                const Dokumen = new DokumenModel({ dokumen_nama, dokumen_file: filename, dokumen_keterangan, pemilik: mfwp.id })
                const [ dokumen ] = await Promise.all([
                    Dokumen.save(),
                    writeFile(path.resolve(__dirname, '..', 'dokumen', filename), dokumen_file.data)
                ])
                mfwp.dokumen_lain = mfwp.dokumen_lain || []
                mfwp.dokumen_lain.push(dokumen.id)
                mfwp.save()
                res.json({ data: { dokumen_lain: dokumen } })
            } catch (err) {
                throw err
            }
        })
        .catch(err => {
            console.log(err)
            let error
            if(err.msg) error = err
            res.status(400).json(error || { msg: 'Gagal Menambah Dokumen...' })
        })
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params
    if(!id) return res.status(400).json({ msg: 'ID Dokumen Diperlukan...' })
    try {
        const del = { dokumen_lain: id }
        const [ dokumen ] = await Promise.all([
            DokumenModel.findByIdAndDelete(id),
            MFWPModel.findOneAndUpdate(del, { $pull: del }, { new: true, select: '_id' }),
        ])
        unlink(path.resolve(__dirname, '..', 'dokumen', dokumen.dokumen_file))
        res.json({ data: { dokumen_lain: dokumen } })
    } catch (err) {
        console.log(err)
        let error
        if(err.msg) error = err
        res.status(400).json(error || { msg: 'Gagal Menghapus Dokumen...' })
    }
})

router.patch('/:id', async (req, res) => {
    const { id } = req.params
    const { dokumen_file } = req.files || {}
    const { dokumen_nama, dokumen_keterangan } = req.body
    let validKeys = [ 'dokumen_nama', 'dokumen_keterangan' ]
    let update = req.body
    Object.keys(update).forEach(k => {
        validKeys.includes(k) || delete update[k]
    })
    if(!id) return res.status(400).json({ msg: 'ID Dokumen Diperlukan...' })
    try {
        const dokumen = await DokumenModel.findByIdAndUpdate(id, { dokumen_nama, dokumen_keterangan }, { new: true })
        dokumen_file && writeFile(path.resolve(__dirname, '..', 'dokumen', dokumen.dokumen_file), dokumen_file.data)
        res.json({ data: { dokumen_lain: dokumen } })
    } catch (err) {
        console.log(err)
        let error
        if(err.msg) error = err
        return res.status(400).json(error || { msg: 'Gagal Menghapus Dokumen...' })
    }
})

module.exports = router
const express = require('express')
const router = express.Router()

const AlamatModel = require('../models/alamat')
const MFWPModel = require('../models/mfwp')

router.post('/:npwp', (req, res) => {
    const npwp = req.params.npwp
    const alamat_alamat = req.body.alamat_alamat
    const alamat_jenis = req.body.alamat_jenis
    const alamat_keterangan = req.body.alamat_keterangan
    if(!alamat_alamat || !alamat_jenis) return res.status(400).json({ msg: 'Alamat dan Jenis Alamat Tidak Boleh Kosong...' })
    let MFWP
    return MFWPModel.findOne({ npwp })
        .then(mfwp => {
            if(!mfwp) throw { msg: 'NPWP Tidak Ditemukan' }
            MFWP = mfwp
            const Alamat = new AlamatModel({
                alamat_jenis,
                alamat_alamat,
                alamat_keterangan,
                pemilik: mfwp.id
            })
            return Alamat.save()
        })
        .then(alamat => {
            !MFWP.alamat_lain ? MFWP.alamat_lain = [] : null
            MFWP.alamat_lain.push(alamat.id)
            MFWP.save()
            res.json({ data: { alamat_lain: alamat } })
        })
        .catch(err => {
            console.log(err)
            let error
            if(err.msg) error = err
            res.status(400).json(error || { msg: 'Gagal Menambah Alamat...' })
        })
})

router.delete('/:id', (req, res) => {
    const id = req.params.id
    if(!id) return res.status(400).json({ msg: 'ID Alamat Diperlukan...' })
    let Alamat
    return AlamatModel.findByIdAndDelete(id)
        .then(alamat => {
            if(!alamat) throw { msg: 'ID Alamat Tidak Ada...' }
            Alamat = alamat
            return MFWPModel.findById(alamat.pemilik)
        })
        .then(mfwp => {
            mfwp.alamat_lain.pull(Alamat.id)
            mfwp.save()
            res.json({ data: { mfwp } })
        })
        .catch(err => {
            console.log(err)
            let error
            if(err.msg) error = err
            res.status(400).json(error || { msg: 'Gagal Menghapus Alamat...' })
        })
})

router.patch('/:id', (req, res) => {
    const id = req.params.id
    const alamat_alamat = req.body.alamat_alamat || ""
    const alamat_jenis = req.body.alamat_jenis || ""
    const alamat_keterangan = req.body.alamat_keterangan || ""
    if(!id) return res.status(400).json({ msg: 'ID Alamat Diperlukan...' })
    return AlamatModel.findByIdAndUpdate(id, { alamat_alamat, alamat_jenis, alamat_keterangan }, { upsert: false, new: true })
        .then(alamat => {
            if(!alamat) throw { msg: 'ID Alamat Tidak Ada...' }
            res.json({ data: { alamat_lain: alamat } })
        })
        .catch(err => {
            console.log(err)
            let error
            if(err.msg) error = err
            res.status(400).json(error || { msg: 'Gagal Mengubah Alamat...' })
        })
})

module.exports = router
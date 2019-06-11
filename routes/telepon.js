const express = require('express')
const router = express.Router()

const TeleponModel = require('../models/telepon')
const MFWPModel = require('../models/mfwp')

router.post('/:npwp', (req, res) => {
    const npwp = req.params.npwp
    const telepon_nama = req.body.telepon_nama
    const telepon_telepon = req.body.telepon_telepon
    const telepon_keterangan = req.body.telepon_keterangan
    if(!telepon_nama || !telepon_telepon) return res.status(400).json({ msg: 'Nama dan No. Telepon Tidak Boleh Kosong...' })
    let MFWP
    return MFWPModel.findOne({ npwp })
        .then(mfwp => {
            if(!mfwp) throw { msg: 'NPWP Tidak Ditemukan...' }
            MFWP = mfwp
            const Telepon = new TeleponModel({
                telepon_nama,
                telepon_telepon,
                telepon_keterangan,
                pemilik: mfwp.id
            })
            return Telepon.save()
        })
        .then(telepon => {
            !MFWP.telp_lain ? MFWP.telp_lain = [] : null
            MFWP.telp_lain.push(telepon.id)
            MFWP.save()
            res.json({ data: { telp_lain: telepon } })
        })
        .catch(err => {
            console.log(err)
            let error
            if(err.msg) error = err
            res.status(400).json(error || { msg: 'Gagal Menambah Telepon...' })
        })
})

router.delete('/:id', (req, res) => {
    const id = req.params.id
    let Telepon
    return TeleponModel.findByIdAndDelete(id)
        .then(telepon => {
            if(!telepon) throw { msg: 'ID Telepon Tidak Ada...' }
            Telepon = telepon
            return MFWPModel.findById(telepon.pemilik)
        })
        .then(mfwp => {
            mfwp.telp_lain.pull(Telepon.id)
            mfwp.save()
            res.json({ data: { mfwp } })
        })
        .catch(err => {
            console.log(err)
            let error
            if(err.msg) error = err
            res.status(400).json(error || { msg: 'Gagal Menghapus Telepon...' })
        })
})

router.patch('/:id', (req, res) => {
    const id = req.params.id
    const telepon_nama = req.body.telepon_nama || ''
    const telepon_telepon = req.body.telepon_telepon || ''
    const telepon_keterangan = req.body.telepon_keterangan || ''
    if(!id) return res.status(400).json({ msg: 'ID Telepon Diperlukan...' })
    return TeleponModel.findByIdAndUpdate(id, { telepon_nama, telepon_telepon, telepon_keterangan }, { upsert: false, new: true })
        .then(telepon => {
            if(!telepon) throw { msg: 'ID Telepon Tidak Ada!' }
            res.json({ data: { telp_lain: telepon } })
        })
        .catch(err => {
            console.log(err)
            let error
            if(err.msg) error = err
            res.status(400).json(error || { msg: 'Gagal Menghapus Telepon...' })
        })
})

module.exports = router
const express = require('express')
const router = express.Router()

const EmailModel = require('../models/email')
const MFWPModel = require('../models/mfwp')

router.post('/:npwp', (req, res) => {
    const npwp = req.params.npwp
    const email_nama = req.body.email_nama
    const email_email = req.body.email_email
    const email_keterangan = req.body.email_keterangan
    if(!email_email || !email_nama) return res.status(400).json({ msg: 'Email dan Nama Diperlukan...' })
    if(!email_email.includes('.' && '@')) res.status(400).json({ msg: 'Email Tidak Valid...' })
    let MFWP
    return MFWPModel.findOne({ npwp })
        .then(mfwp => {
            if(!mfwp) throw { msg: 'NPWP Tidak Ditemukan...' }
            MFWP = mfwp
            const Email = new EmailModel({ email_nama, email_email, email_keterangan, pemilik: mfwp.id })
            return Email.save()
        })
        .then(email => {
            !MFWP.email_lain ? MFWP.email_lain = [] : null
            MFWP.email_lain.push(email.id)
            MFWP.save()
            res.json({ data: { email_lain: email } })
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
    if(!id) return res.status(400).json({ msg: 'ID Email Diperlukan...' })
    let Email
    return EmailModel.findByIdAndDelete(id)
        .then(email => {
            if(!email) throw { msg: 'ID Email Tidak Ada...' }
            Email = email
            return MFWPModel.findById(email.pemilik)
        })
        .then(mfwp => {
            mfwp.email_lain.pull(Email.id)
            mfwp.save()
            res.json({ data: { mfwp } })
        })
        .catch(err => {
            console.log(err)
            let error
            if(err.msg) error = err
            res.status(400).json(error || { msg: 'Gagal Menambah Alamat...' })
        })
})

router.patch('/:id', (req, res) => {
    const id = req.params.id
    const email_nama = req.body.email_nama || ''
    const email_email = req.body.email_email || ''
    const email_keterangan = req.body.email_keterangan || ''
    if(!id) res.status(400).json({ msg: 'ID Email Diperlukan...' })
    return EmailModel.findByIdAndUpdate(id, { email_email, email_nama, email_keterangan })
        .then(email => {
            if(!email) throw { msg: 'ID Email Tidak Ada...' }
            return res.json({ data: { email_lain: email } })
        })
        .catch(err => {
            console.log(err)
            let error
            if(err.msg) error = err
            res.status(400).json(error || { msg: 'Gagal Menambah Alamat...' })
        })
})

module.exports = router
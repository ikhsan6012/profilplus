const mongoose = require('mongoose')
const Schema = mongoose.Schema

const mfwpSchema = new Schema({
    npwp: {
        type: String,
        trim: true,
        unique: true
    },
    nama_wp: {
        type: String,
        trim: true,
        uppercase: true
    },
    alamat: {
        type: String,
        trim: true,
        uppercase: true,
    },
    kelurahan: {
        type: String,
        trim: true,
        uppercase: true,
    },
    kecamatan: {
        type: String,
        trim: true,
        uppercase: true,
    },
    kota: {
        type: String,
        trim: true,
        uppercase: true,
    },
    provinsi: {
        type: String,
        trim: true,
        uppercase: true,
    },
    alamat_lain: [{
        type: Schema.Types.ObjectId,
        ref: 'Alamat'
    }],
    jenis_badan: {
        type: String,
        trim: true,
        uppercase: true,
    },
    jenis_wp: {
        type: String,
        trim: true,
        uppercase: true,
    },
    klu: {
        type: String,
        trim: true,
        uppercase: true,
    },
    tgl_daftar: {
        type: String,
        trim: true,
    },
    tgl_pkp: {
        type: String,
        trim: true,
    },
    tgl_lain: {
        type: String,
        trim: true,
    },
    nik: {
        type: String,
        trim: true,
    },
    telp: {
        type: String,
        trim: true,
    },
    telp_lain: [{
        type: Schema.Types.ObjectId,
        ref: 'Telepon'
    }],
    status: {
        type: String,
        trim: true,
        uppercase: true,
    },
    ar: {
        type: String,
        trim: true,
        uppercase: true,
    },
    email_lain: [{
        type: Schema.Types.ObjectId,
        ref: 'Email'
    }],
    dokumen_lain: [{
        type: Schema.Types.ObjectId,
        ref: 'Dokumen'
    }],
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })

module.exports = mongoose.model('MFWP', mfwpSchema)
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const mfwpSchema = new Schema({
    npwp: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    nama_wp: {
        type: String,
        required: true,
        trim: true,
        uppercase: true
    },
    alamat: {
        type: String,
        required: true,
        trim: true,
        uppercase: true,
    },
    kelurahan: {
        type: String,
        required: true,
        trim: true,
        uppercase: true,
    },
    kecamatan: {
        type: String,
        required: true,
        trim: true,
        uppercase: true,
    },
    kota: {
        type: String,
        required: true,
        trim: true,
        uppercase: true,
    },
    provinsi: {
        type: String,
        required: true,
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
        required: true,
        trim: true,
        uppercase: true,
    },
    klu: {
        type: String,
        required: true,
        trim: true,
        uppercase: true,
    },
    tgl_daftar: {
        type: String,
        required: true,
        trim: true,
    },
    tgl_pkp: {
        type: String,
        required: true,
        trim: true,
    },
    tgl_lain: {
        type: String,
        required: true,
        trim: true,
    },
    nik: {
        type: String,
        required: true,
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
        required: true,
        trim: true,
        uppercase: true,
    },
    ar: {
        type: String,
        required: true,
        trim: true,
        uppercase: true,
    },
    email_lain: [{
        type: Schema.Types.ObjectId,
        ref: 'Email'
    }]
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })

module.exports = mongoose.model('MFWP', mfwpSchema)
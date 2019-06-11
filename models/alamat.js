const mongoose = require('mongoose')
const Schema = mongoose.Schema

const alamatSchema = new Schema({
    alamat_jenis: {
        type: String,
        required: true,
        trim: true
    },
    alamat_alamat: {
        type: String,
        required: true,
        trim: true,
        uppercase: true
    },
    alamat_keterangan: {
        type: String,
        trim: true
    },
    pemilik: {
        type: Schema.Types.ObjectId,
        ref: 'MFWP'
    }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })

module.exports = mongoose.model('Alamat', alamatSchema)
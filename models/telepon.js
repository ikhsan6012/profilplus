const mongoose = require('mongoose')
const Schema = mongoose.Schema

const teleponSchema = new Schema({
    telepon_nama: {
        type: String,
        required: true,
        trim: true,
    },
    telepon_telepon: {
        type: String,
        required: true,
        trim: true,
    },
    telepon_keterangan: {
        type: String,
        trim: true,
    },
    pemilik: {
        type: Schema.Types.ObjectId,
        ref: 'MFWP'
    }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })

module.exports = mongoose.model('Telepon', teleponSchema)
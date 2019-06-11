const mongoose = require('mongoose')
const Schema = mongoose.Schema

const emailSchema = new Schema({
    email_nama: {
        type: String,
        required: true,
        trim: true,
    },
    email_email: {
        type: String,
        required: true,
        trim: true,
    },
    email_keterangan: {
        type: String,
        trim: true,
    },
    pemilik: {
        type: Schema.Types.ObjectId,
        ref: 'MFWP'
    }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })

module.exports = mongoose.model('Email', emailSchema)
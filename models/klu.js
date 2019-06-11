const mongoose = require('mongoose')
const Schema = mongoose.Schema

const kluSchema = new Schema({
    kd_klu: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    nama_klu: {
        type: String,
        required: true,
        trim: true,
        uppercase: true
    },
    sektor: {
        type: String,
        required: true,
        trim: true,
        uppercase: true
    },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })

module.exports = mongoose.model('KLU', kluSchema)
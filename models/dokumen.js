const mongoose = require('mongoose')
const Schema = mongoose.Schema

const dokumenSchema = new Schema({
    dokumen_nama: {
        type: String,
        required: true,
        trim: true,
    },
    dokumen_file: {
        type: String,
        required: true,
        trim: true,
    },
    dokumen_keterangan: {
        type: String,
        trim: true,
    },
    pemilik: {
        type: Schema.Types.ObjectId,
        ref: 'MFWP'
    }
})

module.exports = mongoose.model('Dokumen', dokumenSchema)
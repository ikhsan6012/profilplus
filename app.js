const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const fileupload = require('express-fileupload')
const mfwpRoutes = require('./routes/mfwp')
const kluRoutes = require('./routes/klu')
const alamatRoutes = require('./routes/alamat')
const teleponRoutes = require('./routes/telepon')
const emailRoutes = require('./routes/email')
const dokumenRoutes = require('./routes/dokumen')

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(fileupload())

app.use('/mfwp', mfwpRoutes)
app.use('/klu', kluRoutes)
app.use('/alamat', alamatRoutes)
app.use('/telepon', teleponRoutes)
app.use('/email', emailRoutes)
app.use('/dokumen', dokumenRoutes)

mongoose.connect('mongodb://localhost:27017/profilplus', {
	useNewUrlParser: true, 
	useFindAndModify: false,
	useCreateIndex: true 
}).then(() => {
    app.listen(4001, () => console.log('Server Berjalan Pada Port 4001'))
}).catch(err => console.log(err))
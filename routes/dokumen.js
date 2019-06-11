const express = require('express')
const router = express.Router()

router.post('/:id', (req, res) => {
    const id = req.params.id
    const file = req.body.files[0]
    console.log(file)
    res.json({ msg: 'ok' })
})

module.exports = router
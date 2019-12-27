const express = require('express')
const router = new express.Router()

router.get('/directory', (req, res) =>{
    res.render('directory')
})

module.exports = router
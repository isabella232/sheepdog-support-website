const express = require('express')
const router = new express.Router()

router.get('/assistance',(req,res) => {
    res.render('assistance')
})

router.get('/assistance/*', (req, res) => {
    res.render('404', {
        errorMessage: 'Assistance page not found'
    })
})

module.exports = router

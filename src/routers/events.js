const express = require('express')
const router = new express.Router()

router.get('/events',(req,res) => {
    res.render('events')
})

router.get('/events/*', (req, res) => {
    res.render('404', {
        errorMessage: 'Events page not found'
    })
})

module.exports = router

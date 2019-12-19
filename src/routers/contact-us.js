const express = require('express')
const ContactForm = require('../models/contact-form')
const router = new express.Router()

/*
 * Creating the form
 */
router.post('/contact-us/forms', async (req, res) => {
    console.log(req.body)

    const form = new ContactForm(req.body)
    console.log(req.body)

    try {
        await form.save()
        res.status(201).send(req.body)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/contact-us',(req,res) => {
    res.render('contact-us')
})

router.get('/contact-us/*', (req, res) => {
    res.render('404', {
        errorMessage: 'Contact-us page not found'
    })
})

module.exports = router

const express = require('express')
const ContactUs = require('../models/contactus')
const router = new express.Router()

// =================== ROUTES */

/**
 * Display Webpage
 */
router.get('/contact-us',(req, res) => {
    res.render('contactus')
})

/**
 * Creating the form
 */
router.post('/contact-us', async (req, res) => {
    try {
        const form = new ContactUs(req.body)
        await form.save()
        res.status(201).send(req.body)
    } catch (e) {
        res.status(400).send(e)
    }
})

/**
 * Handle Errors
 */
router.get('/contact-us/*', (req, res) => {
    res.render('404', {
        errorMessage: 'Contact Us Page Not Found'
    })
})

module.exports = router

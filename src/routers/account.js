const express = require('express')
const multer  = require('multer')
const shrap = require('sharp')
const User = require('../models/user')
const VeteranFile = require('../models/veteranFile')
const { userAuth } = require('../middleware/auth')
const router = new express.Router()

/*
 * Display Login/Signup Page
 */
router.get('/account', async (req, res) => {

    ///////////////////////// TODO need to refactor into another middleware REDIRECT?
    const jwt = require('jsonwebtoken')
    const User = require('../models/user')

    try {
        const token = req.cookies.auth.replace('Bearer ', '') // if token exists
        
        const decoded = jwt.verify(token, 'BL1T-8R0J$CT') // verify token
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token }) // search token

        if (user) { // if token exists
            return res.redirect('/account/portal')
        } else {
            res.render('account')
        }
    } catch (e) {
        res.render('account')
    }
    /////////////////////////
})

/*
 * User Signup
 */
router.post('/account/signup', async (req, res) => {
    const user = new User(req.body)
    user.verified = false;

    

    try {
        await user.save()
        const token = await user.generateAuthToken()

        res.cookie('auth', 'Bearer ' + token, { /* maxAge: 604800, */ httpOnly: true })
        res.status(201).send(user)
    } catch (e) {
        res.status(400).send({errorMessage:e.message})
    }
})

/*
 * File Upload
 */
const upload = multer({
    limits:{
        fileSize:1000000
    },
    fileFilter(req, file, cb){
        if(!file.originalname.match(/\.(pdf)$/)){
            return cb(new Error('Please upload a pdf!'))
        }
        cb(undefined, true)
    }
})

router.post('/account/signup/veteranFile-upload', userAuth, upload.single('veteranFile'),async (req, res, next) =>{
    if(!req.file){
        return new Error('Please Submit a PDF File')
    }

    console.log('NOOOOOO')
    console.log(req)

    const veteranFile = new VeteranFile({owner: req.user._id, veteranFile: req.file.buffer})
    await veteranFile.save()
    res.send()
}, (error, req, res, next) =>{
    res.status(400).send({error: error.message})
})

/*
 * User Login
 */
router.post('/account/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        console.log('LMAO')

        res.cookie('auth', 'Bearer ' + token, { /* maxAge: 604800 ,*/ httpOnly: true })
        res.send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

/*
 * User Logout
 */
router.post('/account/logout', userAuth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => { // delete from database
            return token.token !== req.token
        })
        await req.user.save()

        res.clearCookie('auth') // delete cookie
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

/*
 * User Logout of All Sessions
 */
router.post('/account/logout-all', 

userAuth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()

        res.send()
    } catch (e) {
        res.status(500).send()
    }
})



/**
 * Handle Error Pages
 */
router.get('/account/*', (req, res) => {
    res.render('404', {
        errorMessage: 'Accounts page not found'
    })
})

module.exports = router

const express = require('express')
const auth = require('../middleware/auth')
const Event = require('../models/event')
const VeteranFile = require('../models/veteranFile')
const User = require('../models/user')
const router = new express.Router()

// =========== Routes

/**
 * Get Portal Page
 * - new middleware created for redirect
 */
router.get('/account/portal', auth.userAuth, async (req, res) => {
    const { firstName, lastName, email, username, biography, location,
            emailOnProf, locationOnProf, subscribedEventsOnProf, locationOnVD } = req.user
            
    var myEvents = []
    try { 
        myEvents = await Event.find({ owner: req.user._id })

        if (myEvents.length !== 0) {
            for (const event of myEvents) {
                event.ownerFirstName = firstName
                event.ownerLastName = lastName
            }
        }
    } catch(error) {
        myEvents = { error: 'Unable to obtain events' }
    }
    const subscribedEvents = []

    res.render('portal', { firstName, lastName, email, username, biography, location,
        emailOnProf, locationOnProf, subscribedEventsOnProf, locationOnVD, myEvents });
})

// =========== Resource Endpoints

/**
 * User Check Auth
 */
router.get('/account/portal/auth', auth.userAuth, async (req, res) => {
    var response = ""
    if (!req.cookies.auth) {
        response = "no-auth"
    }
    res.send(response)
})

/**
 * User Update Profile
 */
router.patch('/account/portal', auth.userAuth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['firstName', 'lastName', 'username', 'biography', 'location',
            'email', 'password', 'emailOnProf', 'locationOnProf', 'subscribedEventsOnProf',
            'locationOnVD']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        updates.forEach((update) => req.user[update] = req.body[update])

        await req.user.save()

        res.send(req.user)
    } catch (e) {
        res.status(400).send(e)
    }
})

/**
 * User Delete Profile (deactivate acc)
 */
router.delete('/account/portal', auth.userAuth, async (req, res) => {
    try {
        await req.user.remove()
        res.send(req.user)
    } catch (e) {
        res.status(500).send()
    }
})

/*
 *  Grabs ALL Users including the file they upload
 */

router.get('/account/portal/Users', auth.adminAuth, async (req, res) =>{
    try{
        await VeteranFile.find({}).populate({
            path:'owner',
            populate:{
                path:'user',
                model:'User'
                }
            }).exec(function(err, data){
            if (err){
                return res.status(400).send(err)
            }
            res.send(data)
        })
          
        
    }catch(error){
        res.status(400).send(error)
    }
})

/*
 * Verification Update, Verifies user
 */
    router.patch('/account/portal/Users/:_id', auth.userAuth, async (req, res) =>{
        try {
            const user = await User.findById(req.params._id)
            user.verified = true
            await user.save()
                if(!user){
                    return res.status(404).send()
                }
            res.status(200).send(user)
        }catch(error){
            res.status(400).send(error)
        }

    })

/**
 * Handle Error Pages
 */
router.get('/account/portal/*', (req, res) => {
    res.render('404', {
        errorMessage: 'Portal page not found'
    })
})

module.exports = router

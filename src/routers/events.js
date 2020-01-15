const express = require('express')
const jwt = require('jsonwebtoken')
const Event = require('../models/event')
const User = require('../models/user')
const auth = require('../middleware/auth')

const router = new express.Router()



/**
 * Display Events Page
 */
router.get('/events', async (req, res) => {
    try {
        const eventsList = await Event.find({})

        if (eventsList.length === 0) {
            return res.render('events', { error: 'There are no events to display.' });
        }

        const cookie = req.cookies.auth
        var user = false
        if (cookie) {
            var token = cookie.replace('Bearer ', '') // if token exists
            const decoded = jwt.verify(token, 'BL1T-8R0J$CT') // verify token
            user = await User.findOne({ _id: decoded._id, 'tokens.token': token }) // search token
        }
        
        // TODO default always shows "Subscribe", never "Unsubscribe"
        for (const event of eventsList) {
            const ownerData = await User.findById(event.owner)
            if (ownerData) {
                event.ownerFirstName = ownerData.firstName
                event.ownerLastName = ownerData.lastName
            } else {
                event.ownerFirstName = '[deleted user]'
            }
        }
        console.log(user)
        res.render('events', { eventsList, user })
    } catch (e) {
        console.log(e)
        res.status(500).render('events', { error: 'There was a problem with the server.' });
    }
})
router.get('/events/get-own', auth.userAuth, async (req, res) => {
    try { 
        const event = await Event.find({ owner: req.user._id })
        res.send(event)
    } catch(error) {
        res.status(500).send(error)
    }
})

// ========== Resource Endpoints

/**
 * Event Creation
 * - Owner ID tagged on to represent who created it
 */
router.post('/events', auth.userAuth, async (req, res) => {
    const event = new Event({
        ...req.body,
        owner: req.user.id
    })

    try {
        await event.save()
        res.status(201).send(event)
    } catch(error) {
        res.status(400).send(error)
    }
})

/**
 * Event Read Specific 
 */
router.get('/events/:_id', auth.userAuth, async (req, res) => {
    const _id = req.params._id

    try {
        const event = await Event.findOne({ _id, owner: req.user._id })

        if (!event) {
            return res.status(404).send()
        }
        res.status(200).send(event)
    } catch(error) {
        res.status(500).send(error)
    }
})

/**
 * Event Update
 */
router.patch('/events/:_id', auth.userAuth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'desciption', 'location', 'time', 'subscribers']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    
    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const event = await Event.findOne({ _id: req.params._id, owner: req.user._id })

        if (!event) {
            res.status(404).send()
        }

        updates.forEach((update) => event[update] = req.body[update])
        await event.save()

        res.send(event)
    }catch(error){
        res.status(400).send(error)
    }

})

/**
 * Update Subscriber Status (In Progress)
 */
router.post('/events/subscribe', auth.userAuth, async (req, res) =>{

    try {
        eventId = req.body['id']
        const event = await Event.findOne({ _id: eventId })

        /* get current user */
        const token = req.cookies.auth.replace('Bearer ', '') // if token exists

        const decoded = jwt.verify(token, 'BL1T-8R0J$CT') // verify token
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token }) // search token
    
        if (!user) { // if token exists
            throw new Error()
        }
    
        req.token = token; // edit tokens for the purposes of login, logout
        req.user = user

        /* get current user */
        if (!event) {
            res.status(404).send()
        }

        var subscribed = false
        if (!event.userIds.includes(user._id)) {
            // subscribe and add ids
            console.log("Subscribed")
            event.userIds.push(user._id)
            user.eventIds.push(eventId)
            subscribed = true
        } else {
            // unsubscribe and remove ids
            console.log("Unsubscribed")
            var index = event.userIds.indexOf(user._id)
            event.userIds.splice(index, 1);
            index = user.eventIds.indexOf(eventId)
            user.eventIds.splice(index, 1)
            subscribed = false
        }

        await event.save()
        await user.save()

        res.send(subscribed)
    }catch(error){
        console.log(error)
        res.status(400).send(error)
    }
})

/**
 * Delete a specific event
 */
router.delete('/events/:_id', auth.userAuth, async (req, res) =>{
    try{
        const event = await Event.findOneAndDelete({ _id: req.params._id, owner: req.user._id })

        if (!event) {
            res.status(404).send()
        }

        res.send(event)
    }catch(error){
        res.status(500).send(error)
    }
})

/**
 * Handle Error Pages
 */
router.get('/events/*', (req, res) => {
    res.render('404', {
        errorMessage: 'Events page not found'
    })
})

module.exports = router

const express = require('express')
const Event = require('../models/event')
const auth = require('../middleware/auth')
const router = new express.Router()

/**
 * Display Events Page
 */
router.get('/events', (req,res) => {
    res.render('events', {
        // #TODO merge get-all with here
    })
})
router.get('/events/get-all', auth, async (req, res) => {
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
router.post('/events', auth, async (req, res) => {
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
router.get('/events/:_id', auth, async (req, res) => {
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
router.patch('/events/:_id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'desciption', 'location', 'time']
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
 * Delete a specific event
 */
router.delete('/events/:_id', auth, async (req, res) =>{
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

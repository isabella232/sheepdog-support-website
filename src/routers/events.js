const Event = require('../models/events')
const express = require('express')
const router = new express.Router()

//Routes
router.get('/events',(req,res) => {
    res.render('events')
})

router.get('/events/*', (req, res) => {
    res.render('404', {
        errorMessage: 'Events page not found'
    })
})

//Resource endpoints
//Event Creation
router.post('/events', async (req, res)=>{
    const event = new Event({
        ...req.body,
        owner: req.user._id
    })

    try{
        await event.save()
        res.status(200).send(event)
    }catch(error){
        res.status(400).send(error)
    }
    
})

//Event Read All
router.get('/events', async (req, res)=>{

    try{
        const event = await Event.find({})
        res.send(event)
    }catch(error){
        res.status(400).send(error)
    }
})

//Event Read Specific 
router.get('/events/:id', async (req, res) =>{
    
    try{
        const event = await Event.findById(req.params.id)
        if(!event){
            return res.status(400).send('Error: user not found!')
        }
        res.status(200).send(event)
    }catch(error){
        res.status(400).send(error)
    }
})

//Event Update
router.patch('/events', async (req, res) =>{
    const updates = Object.keys(req.body)
    const allowedUpdates = ['desciption', 'location', 'time']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    
    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try{
        const event = await Event.findById(req.params.id)
        updates.forEach((update) => event[update] = req.body[update])
        await event.save()
        if(!event){
            return res.status(400).send()
        }
        res.send(event)
    }catch(error){
        res.status(400).send(error)
    }

})

//Delete a  specific event
router.delete('/events', async (req, res) =>{
    try{
        const event = await Event.findByIdAndDelete(req.params.id)
        if(!event){
            return res.status(400).send()
        }
        res.send(event)
    }catch(error){
        res.status(400).send(error)
    }
})
module.exports = router

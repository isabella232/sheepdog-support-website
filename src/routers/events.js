const Event = require('../models/events')
const express = require('express')
const auth = require('../middleware/auth')
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
router.post('/events',auth, async (req, res)=>{
    const event = new Event({
        ...req.body,
        owner: req.user.id
    })

    try{
        await event.save()
        res.status(200).send(event)
    }catch(error){
        res.status(400).send(error)
    }
    
})

//Event Read All
router.get('/events',auth, async (req, res)=>{

    try{
        const event = await Event.find({ owner: req.user._id })
        res.send(event)
    }catch(error){
        res.status(400).send(error)
    }
})

//Event Read Specific 
router.get('/events/:id',auth, async (req, res) =>{
    
    try{
        const event = await Event.findByIdAndRemove({_id:req.params._id ,owner:req.user._id})
        if(!event){
            return res.status(400).send('Error: user not found!')
        }
        res.status(200).send(event)
    }catch(error){
        res.status(400).send(error)
    }
})

//Event Update
router.patch('/events',auth, async (req, res) =>{
    const updates = Object.keys(req.body)
    const allowedUpdates = ['desciption', 'location', 'time']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    
    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try{
        const event = await Event.findOne({ _id: req.params._id, owner: req.user._id })
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
router.delete('/events/:id',auth, async (req, res) =>{
    try{
        const event = await  Event.findOneAndDelete({ _id: req.params._id, owner: req.user._id })
        if(!event){
            return res.status(400).send()
        }
        res.send(event)
    }catch(error){
        res.status(400).send(error)
    }
})
module.exports = router

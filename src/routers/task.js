const express = require('express')
const Task = require('../models/task')
const auth = require('../middleware/auth')
const router = new express.Router()

/*
 * Task Creation
 * - Owner ID tagged on to represent who created it
 */
router.post('/tasks', auth, async (req, res) => {
    const task = new Task( {
        ...req.body,
        owner: req.user._id
    })

    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

/*
 * Task Retrieve All
 */
router.get('/tasks', auth, async (req, res) => {
    try {
        const tasks = await Task.find({ owner: req.user._id })
        // await req.user.populate('tasks').execPopulate()
        res.send(tasks)
    } catch (e) {
        res.status(500).send(e)
    }
})

/*
 * Task Retrieve One
 */
router.get('/tasks/:_id', auth, async (req, res) => {
    const _id = req.params._id

    try {
        // const task = await Task.findById(_id)
        const task = await Task.findOne({ _id, owner: req.user._id })

        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(500).send(e)
    }
})

/*
 * Task Update
 */
router.patch('/tasks/:_id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    
    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const task = await Task.findOne({ _id: req.params._id, owner: req.user._id })

        if (!task) {
            res.status(404).send()
        }
        
        updates.forEach((update) => task[update] = req.body[update])
        await task.save()

        res.send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

/*
 * Task Deletion
 */
router.delete('/tasks/:_id', auth, async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params._id, owner: req.user._id })

        if (!task) {
            res.status(404).send()
        }

        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router

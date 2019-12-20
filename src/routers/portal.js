const express = require('express')
const auth = require('../middleware/auth')
const router = new express.Router()

/*
 * Display Portal Page #TODO redirect middleware before AUTH
 */
router.get('/account/portal', auth, async(req, res) => {
    res.render('portal', function (err, html) {
        res.send(html)
    });
})

/*
 * User Access Portal
 */
router.get('/account/portal/data', auth, async (req, res) => {
    res.send(req.user)
})

/*
 * User Update Profile
 */
router.patch('/account/portal', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    console.log(updates)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        updates.forEach((update) => req.user[update] = req.body[update])

        await req.user.save()

        res.send()
    } catch (e) {
        res.status(400).send(e)
    }
})

/*
 * User Delete Profile (deactivate acc)
 */
router.delete('/account/portal', auth, async (req, res) => {
    try {
        await req.user.remove()
        res.send(req.user)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router

const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const cookieParser = require('cookie-parser')
const router = new express.Router()

router.use(cookieParser())

/*
 * User Signup
 */
router.post('/account/signup', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        const token = await user.generateAuthToken()

        res.cookie('auth', 'Bearer ' + token, { httpOnly: true })
        res.status(201).send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

/*
 * User Login
 */
router.post('/account/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()

        res.cookie('auth', 'Bearer ' + token, { httpOnly: true })
        res.send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

/*
 * User Logout
 */
router.post('/account/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()

        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

/*
 * User Logout of All Sessions
 */
router.post('/account/logout-all', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()

        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

/*
 * Display Login/Signup/Account
 */
router.get('/account', async (req, res) => {
    res.render('account')
})

/*
 * User Access Portal
 */
router.get('/account/portal', auth, async (req, res) => {
    res.send(req.user)
})

/*
 * User Update Profile
 */
router.patch('/account/portal', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
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

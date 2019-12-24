const express = require('express')
const auth = require('../middleware/auth')
const router = new express.Router()

// =========== Routes

/**
 * Get Portal Page
 * - new middleware created for redirect
 */
const redirectLogin = async (req, res, next) => {
    if (!req.cookies.auth) {
        res.redirect('/account')
    }
    next()
}
router.get('/account/portal', redirectLogin, auth, async(req, res) => {
    const { name, email } = req.user
    res.render('portal', { name, email });
})

// =========== Resource Endpoints

/**
 * User Check Auth
 */
router.get('/account/portal/auth', async (req, res) => {
    var response = ""
    if (!req.cookies.auth) {
        response = "no-auth"
    }
    res.send(response)
})

/**
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

/**
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

/**
 * Handle Error Pages
 */
router.get('/account/portal/*', (req, res) => {
    res.render('404', {
        errorMessage: 'Portal page not found'
    })
})

module.exports = router


// router.get('/users/:_id', async (req, res) => {
//     const _id = req.params._id

//     try {
//         const user = await User.findById(_id)

//         if (!user) {
//             return res.status(404).send()
//         }
//         res.send(user)
//     } catch (e) {
//         res.status(500).send()
//     }
// })

// router.patch('/users/:_id', async (req, res) => {
//     const updates = Object.keys(req.body)
//     const allowedUpdates = ['name', 'email', 'password', 'age']
//     const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

//     if (!isValidOperation) {
//         return res.status(400).send({ error: 'Invalid updates!' })
//     }

//     try {
//         const user = await User.findById(req.params._id)
//         updates.forEach((update) => user[update] = req.body[update])
//         await user.save()

//         // const user = await User.findByIdAndUpdate(req.params._id, req.body, { new: true, runValidators: true })

//         if (!user) {
//             return res.status(404).send()
//         }
//         res.send(user)
//     } catch (e) {
//         res.status(400).send(e)
//     }
// })

// router.delete('/users/:_id', auth, async (req, res) => {
//     try {
//         const user = await User.findByIdAndDelete(req.params._id)

//         if (!user) {
//             return res.status(404).send()
//         }
//         res.send(user)
//     } catch (e) {
//         res.status(500).send()
//     }
// })

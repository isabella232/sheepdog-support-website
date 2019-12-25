const RequestForm = require('../models/assistance')
const express = require('express')
const router = new express.Router()


router.get('/assistance',(req,res) => {
    res.render('assistance')
})

router.get('/assistance/*',(req, res) => {
    res.render('404', {
        errorMessage: 'Assistance page not found'
    })
})

//Resource Creation Endpoint
router.post('/assistance', async (req, res) =>{
    const assistForm = new RequestForm(req.body)

    try{
        await assistForm.save()
        res.status(201).send(assistForm)

    }catch(error){
        res.status(400).send(error)
        console.log(error)
    }
})

module.exports = router

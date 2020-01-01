const express = require('express')
const router = new express.Router()
const { findFacility } = require('../vaFacilities')


router.get('/directory', (req, res) =>{
    res.render('directory')
})

router.get('/directory', (req, res) =>{
    if(!req.query.name){
        return res.send({
            error: 'No Name Given'
        })
    }
    console.log(req.query.name)
    findFacility(req.query.name, (error, { data } ={}) =>{
        if(error){
            return res.send({error})
        }
        res.send(data)
        console.log(data)
    })
})



module.exports = router
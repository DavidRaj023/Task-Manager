const express = require('express')
const User = require('../model/user')
const router = new express.Router()

// ..............USER..............

//Create User
router.post('/users', async (req, res) =>{
    const user = new User(req.body)
    try {
        await user.save()
        res.status(201).send(user)
    } catch (e){
        res.status(400).send(e)
    }
})

//Get Users
router.get('/users', async (req, res) => {
    try{
        const users = await User.find({})
        res.send(users)
    } catch(e){
        res.status(500).send(e)
    }
})

//Get User
router.get('/user/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const user = await User.findById(_id)
        if(!user){
            return res.status(404).send()
        }
        res.send(user)
    } catch (e) {
        res.status(500).send(e)
    }
})

//Update User
router.patch('/user/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const user = await User.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true})
        if(!user){
            return res.status(404).send()
        }
        res.send(user)
    } catch (e) {
        res.status(500).send(e)
    }
})

//Delete User
router.delete('/user/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const user = await User.findByIdAndDelete(_id)
        if(!user){
            return res.status(404).send()
        }
        res.send(user)
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router

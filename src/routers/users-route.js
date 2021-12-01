const express = require('express')
const User = require('../model/user')
const router = new express.Router()

// ..............USER..............

//Create User
router.post('/user', async (req, res) =>{
    const user = new User(req.body)
    console.log(req.body.email)
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
router.post('/user', async (req, res) => {
    const _id = req.body.id
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
router.post('/user-update', async (req, res) => {
    const _id = req.body.id
    const updates = Object.keys(req.body)

    try {
        const user = await User.findById(req.body.id);
        //const user = await User.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true})
        //findByIdAndUpdate not use save() operation so it can't use in userscema.pre()

        updates.forEach((update) => {
            user[update] = req.body[update]
        })

        await user.save();

        if(!user){
            return res.status(404).send();
        }
        res.send(user);
    } catch (e) {
        res.status(500).send(e);
    }
})

//Delete User
router.post('/user-delete', async (req, res) => {
    const _id = req.body.id
    console.log(_id)
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

//login
router.post('/user/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        res.send(user)
    } catch (e) {
        console.log(e)
        res.status(400).send()
    }
})

module.exports = router


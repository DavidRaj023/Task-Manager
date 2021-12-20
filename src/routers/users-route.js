const express = require('express');
const User = require('../model/user');
const router = new express.Router();
const auth = require('../middleware/auth');

// ..............USER..............

//Sign up
router.post('/user', async (req, res) =>{
    const user = new User(req.body);
    console.log(req.body.email);
    try {
        await user.save();
        const tocken = await user.generateTokens();
        //res.status(201).send({ user, tocken});
        res.status(201).send(user);
    } catch (e){
        res.status(400).send(e);
    }
})

//Sign In
router.post('/user/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const tocken = await user.generateTokens();
        res.send({ user, tocken});
    } catch (e) {
        console.log(e);
        res.status(400).send();
    }
})

//Get Users
router.get('/users', auth, async (req, res) => {
    try{
        const users = await User.find({});
        res.send(users);
    } catch(e){
        res.status(500).send(e);
    }
})

router.get('/users/me', auth, async (req, res) => {
    res.send(req.user)
})


//Get User
router.post('/user', async (req, res) => {
    const _id = req.body.id;
    try {
        const user = await User.findById(_id);
        if(!user){
            return res.status(404).send();
        }
        res.send(user);
    } catch (e) {
        res.status(500).send(e);
    }
})

//Update User
router.post('/user-update', async (req, res) => {
    const _id = req.body.id;
    const updates = Object.keys(req.body);

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
    const _id = req.body.id;
    console.log(_id)
    try {
        const user = await User.findByIdAndDelete(_id);
        if(!user){
            return res.status(404).send();
        }
        res.send(user);
    } catch (e) {
        res.status(500).send(e);
    }
})

module.exports = router;


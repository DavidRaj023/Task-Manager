const express = require('express');
const User = require('../model/user');
const router = new express.Router();
const auth = require('../middleware/auth');
const { sendWelcomeEmail, sendCancelationEmail } = require('../utill/emailService');

// ..............USER..............

//Sign up
router.post('/user', async (req, res) =>{
    const user = new User(req.body);
    try {
        const checkEmail = await User.find({ email: user.email });
        if(checkEmail.length > 0){
            return res.status(400).send({
                'Error': 'This Email id is already used'
            });
        }
        sendWelcomeEmail(user.email, user.name);
        await user.save();
        const token = await user.generateTokens();
        res.status(201).send({ user, token});
    } catch (e){
        res.status(400).send(e);
    }
})

//login
router.post('/user/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateTokens();
        res.send({user, token});        
    } catch (e) {
        res.status(400).send({
            message: "Please enter the valid user name and password"
        });
    }
})

//logout
router.post('/user/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter(( token ) => {
            return token.token !== req.token;
        });
        await req.user.save();

        res.send();
    } catch (e) {
        res.status(500).send(e);
    }
})

//logout from all sectoin
router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save();
        res.send();
    } catch (e) {
        res.status(500).send();
    }
})

//Get Profile
router.get('/user/me', auth, async (req, res) => {
    res.send(req.user);
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

//Update User
router.post('/user-update', auth, async (req, res) => {
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
router.delete('/user/me', auth, async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.user._id);
        if(!user){
            return res.status(404).send();
        }
        sendCancelationEmail(req.user.email, req.user.name);
        res.send(user);
    } catch (e) {
        res.status(500).send(e);
    }
})

module.exports = router;


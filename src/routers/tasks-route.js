const express = require('express')
const Task = require('../model/task')
const router = new express.Router()

// ............TASKS.................

//Create Tasks
router.post('/tasks', async (req, res) =>{
    const task = new Task(req.body)
    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

//Get Tasks
router.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({})
        res.send(tasks)
    } catch (e) {
        res.status(500).send(e)
    }
})

//Get Task
router.post('/task', async (req, res) => {
    const _id = req.body.id
    try {
        const task = await Task.findById(_id)
        if(!task){
            return res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(500).send(e)
    }
})

//Update Task
router.post('/task-update', async (req, res) => {
    const _id = req.body.id
    const updates = Object.keys(req.body)
    try {
        const task = await Task.findById(req.body._id)
        console.log(req.body._id)

        updates.forEach((update) => task[update] = req.body[update])
        await task.save()

        //const task = await Task.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true})
        if(!task){
            return res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(500).send(e)
    }
})

//Delete User
router.post('/task-delete', async (req, res) => {
    const _id = req.body.id
    try {
        const task = await Task.findByIdAndDelete(_id)
        if(!task){
            return res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(500).send(e)
    }
})


module.exports = router
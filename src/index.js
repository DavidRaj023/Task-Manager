const express = require('express')
require('./db/mongoose')
const User = require('./model/user')
const Task = require('./model/task')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.post('/users', (req, res) =>{
    const user = new User(req.body)
    user.save().then( (me) => {
        res.status(201).send(user)
    }).catch((e) => {
        console.log(e)
        res.status(400).send(e)
    })
})

app.get('/users', (req, res) => {
    User.find({}).then((users) =>{
        res.send(users)
    }).catch((e) =>{
        console.log(e)
        res.status(500).send(e)
    })
})

app.get('/user/:id', (req, res) => {
    const _id = req.params.id
    User.findById(_id).then((users) =>{
        if(!users){
            return res.status(404).send()
        }
        res.send(users)
    }).catch((e) =>{
        console.log(e)
        res.status(500).send(e)
    })
})


//Tasks
app.post('/tasks', (req, res) =>{
    const task = new Task(req.body)
    task.save().then( (me) => {
        res.status(201).send(task)
    }).catch((e) => {
        res.status(400).send(e)
    })
})

app.get('/tasks', (req, res) => {
    Task.find({}).then((tasks) =>{
        res.send(tasks)
    }).catch((e) =>{
        console.log(e)
        res.status(500).send(e)
    })
})

app.get('/task/:id', (req, res) => {
    const _id = req.params.id
    Task.findById(_id).then((task) =>{
        if(!task){
            return res.status(404).send()
        }
        res.send(task)
    }).catch((e) =>{
        console.log(e)
        res.status(500).send(e)
    })
})



app.listen(port, () => {
    console.log('Server up and running on port: ' + port)
})

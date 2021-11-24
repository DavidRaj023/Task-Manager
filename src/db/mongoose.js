const mongoose = require('mongoose')
const validator = require('validator')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true
})


//Model Definition
const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid: ' + value)
            }
        }
    },
    age: {
        type: Number,
        validate(value){
            if(value <= 0){
                throw new Error('Age can not be a negative number, please enter the valid age value')
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error('Password cannot contains "password')
            }
        }
    }
})

// //Create a object the with above model
const David = new User({
    name: '  KuMar A  ',
    email: ' davidRaj023@gmail.com',
    age: 2,
    password: 'pass'
})

// //Insert the object to the db

// David.save().then( (me) => {
//     console.log(me)
// }).catch((error) => {
//     console.log(error)
// })


const Task = mongoose.model('Task', {
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    }
})

const task1 = new Task({
    title: 'Complete section 11 in Node.js course',
    description: 'This is the course i have been working in last 2 weeks'
})

task1.save().then((t) => {
    console.log(t)
}).catch((error) => {
    console.log(error)
})

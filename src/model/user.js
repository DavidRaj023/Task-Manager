const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const userSchema = mongoose.Schema({
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
        unique: true,
        audoIndex: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid: ' + value)
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

userSchema.statics.findByCredentials = async (email, password) =>{
    const user = await User.findOne({email})
    if (!user){
        throw new Error('Unable to login, please enter a valid username / password')
    }
    
    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch){
        throw new Error('Unable to login, Plase enter a valid username / password')
    }

    return user;
}

// Hasing the password using bcrypt
userSchema.pre('save', async function (next) {
    const user = this
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)
        console.log(user.password)
    }
    next();
})

const User = mongoose.model('User', userSchema)

module.exports = User

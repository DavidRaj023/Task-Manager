const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Task = require('./task');

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
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    avatar: {
        type: Buffer
    }
}, {
    timestamps: true
})

userSchema.methods.generateTokens = async function () {
    const user = this;
    //const tocken = jwt.sign({ _id: '1234David' }, 'david' ,{ expiresIn: '1 seconds' });
    const token = jwt.sign({ _id: user._id.toString() }, 'DavidUserVerify');
    user.tokens = user.tokens.concat({token});
    await user.save();
    return token;
}

userSchema.statics.findByCredentials = async (email, password) =>{
    const user = await User.findOne({email});
    if (!user){
        throw new Error('Unable to login, please enter a valid username / password');
    }
    
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch){
        throw new Error('Unable to login, Plase enter a valid username / password');
    }

    return user;
}

// Hasing the password using bcrypt
userSchema.pre('save', async function (next) {
    const user = this;
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
})

//Delete user tasks when user is removed
userSchema.pre('remove', async function (next) {
    const user = this;
    await Task.deleteMany({ owner: user._id });
    next();
})


//virtual
userSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner'
})

//Method to 
userSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();

    delete userObject.password;
    delete userObject.tokens;

    return userObject;
}


const User = mongoose.model('User', userSchema);

module.exports = User;

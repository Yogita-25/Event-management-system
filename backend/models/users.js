const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

let userSchema = new mongoose.Schema({
    u_name: {
        type: String
    },
    u_password: {
        type: String,
        required:true
    },
    u_cpassword: {
        type: String,
       
    },
    u_email:{
        type:String,
        required:true,
        lowercase:true,
        unique:true
    },
    u_org:{
        type:String
    },
    u_phone:{
        type:Number
    },
    tokens:[{
        token:{
            type:String,    
            required:true
        }
    }]
});


userSchema.methods.generateAuthToken = async function(){
    const user = this
    const token = jwt.sign( {_id:user._id.toString() },'myuserdatabase',{expiresIn:'10 day'})

    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

userSchema.statics.findByCredentials = async (u_email, u_password) => {
    
    const user = await User.findOne({ u_email })

    if (!user) {
        return null;
    }

    const isMatch = await bcrypt.compare(u_password, user.u_password);

    if (!isMatch) {
        throw new Error('Unable to login')
    }
    return user
}

userSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('u_password')) {
        user.u_password = await bcrypt.hash(user.u_password, 8)
    }

    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User
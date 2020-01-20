import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'
import bcrypt from 'bcryptjs'

const Schema = mongoose.Schema;

export const UserSchema = new Schema({
    
    username: {
        type: String,
        required: 'Username cannot be empty',
        unique: 'Username already exist'
    },
    email: {
        type: String,
        required: 'User email cannot be empty',
        unique: 'Email already exist'
    },
    hashPassword: {
        type: String,
        required: 'User password cannot be empty',
    },
    role: {
        type: String,
        enum : ['user','admin'],
        required: 'User role cannot be empty'
    },
    status: {
        type: String,
        enum : ['active','disabled'],
        default: 'active',
    },
    createdDate: {
        type: Date,
        default: Date.now
    }
},
{ 
    versionKey: false 
})

//enabling mongoose validation
UserSchema.plugin(uniqueValidator);

///method to encrypt
UserSchema.methods.comparePassword = (password, hashPassword) => {
    bcrypt.compareSync(password, hashPassword);

}

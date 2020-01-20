import mongoose from 'mongoose'
import {UserSchema} from '../models/userModel'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const User = mongoose.model('User', UserSchema);

export const register = (req, res) => {
    const newUser = new User (req.body);
    newUser.hashPassword = bcrypt.hashSync(req.body.password, 10)
    newUser.save()
    .then(user =>{
        user.hashPassword = undefined
        res.json(user);
    })
    .catch(err =>{
        res.status(500).send({
            message: err.message || "Some error occurred while creating new user."
        });
    });
}

export const login = (req, res) => {
    User.findOne({email: req.body.email})
    .then(user =>{
        if(!user){
            return res.status(404).send({
                message: "Authentication failed ! user not found "
            });  
        }else if(user){
            if(user.comparePassword(req.body.password, user.hashPassword)){
                return res.status(404).send({
                    message: "Authentication failed ! Wrong password "
                });
            }
            else{
                res.json({token: jwt.sign({email: user.email, username: user.email, _id: user.id, role:user.role}, 'JWT')});
            }
        }
    })
    .catch(err =>{
        if(err.kind === 'ObjectId'){
            return res.status(404).send({
                message: "User not found"
            }); 
        }
        return res.status(500).send({
            message: err.message || "Error retrieving user "
        });
    });
}

export const userAccessCheck = (req, res, next) => {
    if(req.user && (req.user.role === 'user' || req.user.role === 'admin')){
        next();
    }else{
        return res.status(404).send({
            message: "Unauthorised user"
        });
    }
}

export const adminAccessCheck = (req, res, next) => {
    if(req.user && req.user.role === 'admin' ){
        next();
    }else{
        return res.status(404).send({
            message: "Unauthorised user"
        });
    }
}
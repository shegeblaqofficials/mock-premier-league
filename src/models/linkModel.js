import mongoose from 'mongoose'

const Schema = mongoose.Schema;

export const LinkSchema = new Schema({
    
    longUrl: {
        type: String,
    },
    shortUrl: {
        type: String,
        index: true
    },
    resourceId: {
        type: String,
    },
    createdDate: {
        type: Date,
        default: Date.now
    }
},
{ 
    versionKey: false 
});
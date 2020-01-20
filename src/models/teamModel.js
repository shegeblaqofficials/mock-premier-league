import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator'

const Schema = mongoose.Schema;

export const TeamsSchema = new Schema({
    
    teamName: {
        type: String,
        required: 'Enter a team name',
        unique: 'Two teams cannot share the same team name'
    },
    manager: {
        type: String,
        required: 'Manager name cannot be empty'
    },
    numberOfPlayers: {
        type: Number,
        required: 'Enter team total number of players'
    },
    founded: {
        type: Number,
    },
    createdDate: {
        type: Date,
        default: Date.now
    }
},
{ 
    versionKey: false 
});

TeamsSchema.index({teamName: 'text', manager: 'text'});

//enabling mongoose validation
TeamsSchema.plugin(uniqueValidator);
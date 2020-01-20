import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

const Schema = mongoose.Schema;

export const FixtureSchema = new Schema({

    status: {
        type: String,
        required: 'Enter a match fixture status',
        enum: ['SCHEDULED', 'ONGOING','FINISHED'],
        default: 'SCHEDULED'
    },
    venue: {
        type: String,
        required: 'Match venue cannot be empty'
    },
    matchDate: {
        type: Date,
        required: 'Match date cannot be empty',
    },
    awayTeam: {
        id: {
            type: String,
        },
        teamName: {
            type: String,
            required: 'Away team name cannot be empty'
        } 
    },
    homeTeam: {
        id: {
            type: String,
        },
        teamName: {
            type: String,
            required: 'Home team name cannot be empty'
        } 
    },
    score: {
        fullTime: {
            homeTeam: {
                type: Number,
                default: 0
            },
            awayTeam: {
                type: Number,
                default: 0
            },
        },
        halfTime: {
            homeTeam: {
                type: Number,
                default: 0
            },
            awayTeam: {
                type: Number,
                default: 0
            },
        },
        penalties: {
            homeTeam: {
                type: Number,
                default: 0
            },
            awayTeam: {
                type: Number,
                default: 0
            },
        } 
    },
    createdDate: {
        type: Date,
        default: Date.now
    }
},
{
    versionKey: false 
})

//FixtureSchema.index({status: 'text', venue: 'text', matchDate: 'text', awayTeam: 'text', homeTeam: 'text'});
FixtureSchema.index({ "$**": "text" });

//enabling mongoose validation
FixtureSchema.plugin(uniqueValidator);
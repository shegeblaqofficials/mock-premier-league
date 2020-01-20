import mongoose from 'mongoose'
import { TeamsSchema } from '../models/teamModel'

const Team = mongoose.model('Team', TeamsSchema);

///Add new team logic
export const addNewTeam = (req, res) => {
    let newTeam = new Team(req.body);
    newTeam.save()
    .then(team =>{
        res.json(team);
    })
    .catch(err =>{
        res.status(500).send({
            message: err.message || "Some error occurred while creating new team."
        });
    });
}

///Get all the teams logic
export const getTeams = (req, res) => {
    Team.find()
    .then(teams =>{
        res.json(teams);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Error occurred while retrieving teams"
        });
    });
}

///Fetch team with team id
export const getTeamsWithId = (req, res) => {
    Team.findById(req.params.teamId)
    .then(team =>{
        if(!team){
            return res.status(404).send({
                message: "Team not found with id " + req.params.teamId
            });  
        }
        res.json(team);
    })
    .catch(err => {
        if(err.kind === 'ObjectId'){
            return res.status(404).send({
                message: "Team not found with id " + req.params.teamId
            }); 
        }
        return res.status(500).send({
            message: "Error retrieving team with id " + req.params.teamId
        });
    })
}

///Update team with team id
export const updateTeam = (req, res) => {
    Team.findOneAndUpdate({_id: req.params.teamId}, req.body, {new: true, useFindAndModify: false})
    .then(team =>{
        if(!team){
            return res.status(404).send({
                message: "Team not found with id " + req.params.teamId
            });  
        }
        res.json(team);
    })
    .catch(err =>{
        if(err.kind === 'ObjectId'){
            return res.status(404).send({
                message: "Team not found with id " + req.params.teamId
            }); 
        }
        return res.status(500).send({
            message: "Error retrieving team with id " + req.params.teamId
        });
    });
}

///delete team with team id
export const deleteTeam = (req, res) => {
    Team.findByIdAndRemove({_id: req.params.teamId})
    .then(team =>{
        if(!team){
            return res.status(404).send({
                message: "Team not found with id " + req.params.teamId
            });  
        }
        res.send('Delete request successful !')
    })
    .catch(err =>{
        if(err.kind === 'ObjectId'){
            return res.status(404).send({
                message: "Team not found with id " + req.params.teamId
            }); 
        }
        return res.status(500).send({
            message: "Could not delete team with id " + req.params.teamId
        });
    });
}


///Search team with query
export const searchTeamsWithQueryParam = (req, res) => {
    Team.find({'$text':{'$search': req.params.queryParam}})
    .then(team =>{
        if(!team){
            return res.status(404).send({
                message: "Team not found with  the search parameter" + req.params.queryParam
            });  
        }
        res.json(team);
    })
    .catch(err => {
        if(err.kind === 'ObjectId'){
            return res.status(404).send({
                message: "Team not found with  the search parameter" + req.params.queryParam
            }); 
        }
        return res.status(500).send({
            message: err.message || "Error searching team with seach parameter " + req.params.queryParam
        });
    })
}
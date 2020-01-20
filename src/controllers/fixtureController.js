import mongoose from 'mongoose'
import { FixtureSchema } from '../models/fixtureModel'
import {LinkSchema} from '../models/linkModel'
import shortenUrl from 'shortid'

const Fixture = mongoose.model('Fixture', FixtureSchema);
const Link = mongoose.model('Link', LinkSchema);

///Add new Fixture logic
export const addNewFixture = (req, res) => {
    let newFixture = new Fixture(req.body);
    newFixture.save()
    .then(fixture =>{
        res.json(fixture);
    })
    .catch(err =>{
        res.status(500).send({
            message: err.message || "Some error occurred while creating new fixture."
        });
    });
}

///Get all the Fixture logic
export const getFixture = (req, res) => {
    Fixture.find()
    .then(fixtures =>{
        res.json(fixtures);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Error occurred while retrieving fixtures"
        });
    });
}

///Fetch Fixture with Fixture id
export const getFixtureWithId = (req, res) => {
    Fixture.findById(req.params.fixtureId)
    .then(fixture =>{
        if(!fixture){
            return res.status(404).send({
                message: "Fixture not found with id " + req.params.fixtureId
            });  
        }
        res.json(fixture);
    })
    .catch(err => {
        if(err.kind === 'ObjectId'){
            return res.status(404).send({
                message: "Fixture not found with id " + req.params.fixtureId
            }); 
        }
        return res.status(500).send({
            message: "Error retrieving fixture with id " + req.params.fixtureId
        });
    })
}

///Update Fixture with Fixture id
export const updateFixture = (req, res) => {
    Fixture.findOneAndUpdate({_id: req.params.fixtureId}, req.body, {new: true, useFindAndModify: false})
    .then(fixture =>{
        if(!fixture){
            return res.status(404).send({
                message: "Fixture not found with id " + req.params.fixtureId
            });  
        }
        res.json(fixture);
    })
    .catch(err =>{
        if(err.kind === 'ObjectId'){
            return res.status(404).send({
                message: "Fixture not found with id " + req.params.fixtureId
            }); 
        }
        return res.status(500).send({
            message: "Error retrieving fixture with id " + req.params.fixtureId
        });
    });
}

///Delete Fixture with Fixture id
export const deleteFixture = (req, res) => {
    Fixture.findByIdAndRemove({_id: req.params.fixtureId})
    .then(fixture =>{
        if(!fixture){
            return res.status(404).send({
                message: "Fixture not found with id " + req.params.fixtureId
            });  
        }
        res.send('Delete request successful !')
    })
    .catch(err =>{
        if(err.kind === 'ObjectId'){
            return res.status(404).send({
                message: "Fixture not found with id " + req.params.fixtureId
            }); 
        }
        return res.status(500).send({
            message: "Could not delete fixture with id " + req.params.fixtureId
        });
    });
}

///Search fixture with query
export const searchFixtureWithQueryParam = (req, res) => {
    Fixture.find({'$text':{'$search': req.params.queryParam}})
    .then(fixture =>{
        if(!fixture){
            return res.status(404).send({
                message: "Fixture not found with the search parameter" + req.params.queryParam
            });  
        }
        res.json(fixture);
    })
    .catch(err => {
        if(err.kind === 'ObjectId'){
            return res.status(404).send({
                message: "Fixture not found with the search parameter" + req.params.queryParam
            }); 
        }
        return res.status(500).send({
            message: "Error searching fixture with seach parameter " + req.params.queryParam
        });
    })
}

///generate short url
export const generateFixtureUrl = (req, res) => {
    let longUrl = '/fixture/'+req.params.fixtureParam;
    let shortUrl = shortenUrl.generate();
    let newLink = new Link({
        longUrl: longUrl,
        shortUrl: shortUrl,
        resourceId: req.params.fixtureParam
    })
    newLink.save()
    .then(link =>{
        res.json({
            url: req.protocol + '://' + req.get('host') +'/'+ shortUrl
        });
    })
    .catch(err =>{
        res.status(500).send({
            message: "Some error occurred while generating new fixture."
        });
    });
}

///find fixture through generate link
export const getFixtureWithGeneratedUrl = (req, res) => {
    Link.findOne({shortUrl: req.params.shortUrl})
    .then(link =>{
        if(!link){
            return res.status(404).send({
                message: "Fixture not found with url " + req.params.shortUrl
            });  
        }
        return link;
    })
    .then(link => {
        Fixture.findById(link.resourceId)
            .then(fixture =>{
                if(!fixture){
                    return res.status(404).send({
                        message: "Fixture not found with id " + link.resourceId
                    });  
                }
                res.json(fixture);
            })
            .catch(err => {
                if(err.kind === 'ObjectId'){
                    return res.status(404).send({
                        message: "Fixture not found with id " + link.resourceId
                    }); 
                }
                return res.status(500).send({
                    message: "Error retrieving fixture with id " + link.resourceId
                });
            })
    })
    .catch(err => {
        if(err.kind === 'ObjectId'){
            return res.status(404).send({
                message: "Fixture not found with id " + req.params.shortUrl
            }); 
        }
        return res.status(500).send({
            message: "Error retrieving fixture with url " + req.params.shortUrl
        });
    })
}
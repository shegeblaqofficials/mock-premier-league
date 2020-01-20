import express from 'express';
import {dbUrl} from './config'
import teamRoute from './src/routes/teamsRoute';
import fixturesRoute from './src/routes/fixturesRoute';
import userRoute from './src/routes/userRoute';
import mongoose from 'mongoose';
import bodyParser from'body-parser';
import jsonwebtoken from 'jsonwebtoken'
import user from './src/routes/userRoute'

const app = express();

///mongoose connection
mongoose.Promise = global.Promise;
mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

//bodyParser setup
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

///JWT set up
app.use((req, res, next) => {
    if(req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer'){
        jsonwebtoken.verify(req.headers.authorization.split(' ')[1],'JWT', (err, decode) => {
            if(err)req.user = undefined;
            req.user = decode;
            next();
        })
    }else{
        req.user = undefined;
        next();
    }
});

///set the teams Routes
teamRoute(app);

///set the Fixtures Routes
fixturesRoute(app);

///set the Auth Routes
userRoute(app);

export default app;

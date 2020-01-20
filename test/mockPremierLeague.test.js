import '@babel/polyfill'
import request from 'supertest'
import mongoose from 'mongoose'
import {UserSchema} from '../src/models/userModel'
import {FixtureSchema} from '../src/models/fixtureModel'
import {TeamsSchema} from '../src/models/teamModel'
import app from '../server'
import {teamTestId, fixtureTestId, userTestToken, adminTestToken} from '../config'

const User = mongoose.model('User', UserSchema);
const Fixture = mongoose.model('Fixture', FixtureSchema);
const Team = mongoose.model('Team', TeamsSchema);

///Before all test initialize things
let mockUser = null;
let mockFixture = null;
let mockTeam = null;

beforeAll(() => {
    ///mock user
    mockUser = {
        username: 'testUser',
        email: 'testMail@gmail.com',
        password: 'testPassword',
        role: 'admin'
    }
    //mock fixture
    mockFixture = {
        venue: 'TestVenue',
        matchDate : '2020-01-20T20:00:00.813Z',
        awayTeam : {
            id: '5e231e124db72c6cf0eac073',
            teamName : 'Arsenal'
        },
        homeTeam : {
            id: '5e1dc0190e76370f7c0b1078',
            teamName : 'Liverpool'
        }
    }
    ///mock team
    mockTeam = {
        teamName: 'TestName',
        manager: 'TestManager',
        numberOfPlayers: 39,
        founded: 1980
    }
  });

///TEST ALL THE USER AND AUTHENTICATION OPERATIONS
describe('Admin and User Authentication Test Suite', () => {

    it ('User should be able to register', async (done) => {
        const response = await request(app)
        .post('/auth/register')
        .send(mockUser);
        expect(response.status).toBe(200);
        expect(response.body.user).not.toBeNull();
        done();
    })

    it ('User should be able to login', async (done) => {
        const response = await request(app)
        .post('/auth/login')
        .send(mockUser);
        expect(response.status).toBe(200);
        expect(response.body.token).not.toBeNull();
        done();
    })
})


///TEST ALL THE FIXTURE OPERATIONS
describe('Fixtures Test Suite', () => {

    it ('should be able to add a new fixture', async (done) => {
        const response = await request(app)
        .post('/fixture')
        .send(mockFixture)
        .set({ 'Authorization': adminTestToken})
        expect(response.status).toBe(200);
        expect(response.body.fixture).not.toBeNull();
        done();
    })

    it('should return the list of fixtures', async (done) => {
        const response = await request(app)
        .get('/fixtures')
        .set({ 'Authorization': userTestToken})
        expect(response.status).toBe(200);
        expect(response.body.teams).not.toBeNull();
        done();
    })

    it('should return a fixture by Id', async (done) => {
        const response = await request(app)
        .get('/fixture/'+ fixtureTestId)
        .set({ 'Authorization': userTestToken})
        expect(response.status).toBe(200);
        expect(response.body.teams).not.toBeNull();
        done();
    })

    it ('should be able to update an existing fixture', async (done) => {
        let newMockFixture = {
            venue: 'Changed Venue'
        } 
        const response = await request(app)
        .put('/fixture/'+ fixtureTestId)
        .send(newMockFixture)
        .set({ 'Authorization': adminTestToken})
        expect(response.status).toBe(200);
        expect(response.body.fixture).not.toBeNull();
        done();
    })

    it('should be able to search fixtures that are in scheduled status', async (done) => {
        const response = await request(app)
        .get('/fixture/search/scheduled')
        expect(response.status).toBe(200);
        expect(response.body.teams).not.toBeNull();
        done();
    })
})


///TEST ALL THE TEAM OPERATIONS
describe('Teams Test Suite', () => {

    it ('should be able to add a new Team', async (done) => {
        const response = await request(app)
        .post('/team')
        .send(mockTeam)
        .set({ 'Authorization': adminTestToken})
        expect(response.status).toBe(200);
        expect(response.body.fixture).not.toBeNull();
        done();
    })

    it("should return the list of teams", async (done) => {
        const response = await request(app)
        .get('/teams')
        .set({ 'Authorization': userTestToken})
        expect(response.status).toBe(200);
        expect(response.body.fixtures).not.toBeNull();
        done();
    });
    
    it('should return a team by Id', async (done) => {
        const response = await request(app)
        .get('/team/'+ teamTestId)
        .set({ 'Authorization': userTestToken})
        expect(response.status).toBe(200);
        expect(response.body.teams).not.toBeNull();
        done();
    })

    it ('should be able to update an existing team', async (done) => {
        let newMockTeam ={
            founded: 1900
        }
        const response = await request(app)
        .put('/team/'+ teamTestId)
        .send(newMockTeam)
        .set({ 'Authorization': adminTestToken})
        expect(response.status).toBe(200);
        expect(response.body.fixture).not.toBeNull();
        done();
    })
})

 afterAll(async () => {
     ///the new user created
	await User.deleteOne({
	    username: 'testUser'
    })
    ///delete the new fixture created
	await Fixture.deleteOne({
	    venue: 'TestVenue'
    })
    //delete the new team created
    await Team.deleteOne({
	    teamName: 'TestName'
    })
})
import {addNewFixture, 
    getFixture, 
    getFixtureWithId, 
    updateFixture, 
    deleteFixture, 
    searchFixtureWithQueryParam, 
    generateFixtureUrl, 
    getFixtureWithGeneratedUrl} from '../controllers/fixtureController'
import {userAccessCheck, adminAccessCheck} from '../controllers/userController'

const fixturesRoutes = (app) => {

    // Retrieve all fixture
    app.get('/fixtures', userAccessCheck, getFixture)

    ///create a new fixture
    app.post('/fixture', adminAccessCheck, addNewFixture)

    // Retrieve fixture team with fixtureId
    app.get('/fixture/:fixtureId', userAccessCheck, getFixtureWithId)

    // Update a fixture with fixtureId
    app.put('/fixture/:fixtureId', adminAccessCheck, updateFixture)

    // Delete a fixture with fixtureId
    app.delete('/fixture/:fixtureId', adminAccessCheck, deleteFixture)

    // Search fixture
    app.get('/fixture/search/:queryParam', searchFixtureWithQueryParam)

    // generate fixture url
    app.get('/fixture/link/:fixtureParam', adminAccessCheck, generateFixtureUrl)

    // get resource fixture through short url
    app.get('/:shortUrl', userAccessCheck, getFixtureWithGeneratedUrl)
}

export default fixturesRoutes;
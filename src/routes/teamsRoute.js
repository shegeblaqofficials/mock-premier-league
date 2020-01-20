import {addNewTeam, getTeams, getTeamsWithId, updateTeam, deleteTeam, searchTeamsWithQueryParam} from '../controllers/teamController'
import {userAccessCheck, adminAccessCheck} from '../controllers/userController'

const teamRoutes = (app) => {

    // Retrieve all teams
    app.get('/teams', userAccessCheck, getTeams)

    ///create a new team
    app.post('/team', adminAccessCheck, addNewTeam)
    
    // Retrieve single team with teamId
    app.get('/team/:teamId', userAccessCheck, getTeamsWithId)

    // Update a team with teamId
    app.put('/team/:teamId', adminAccessCheck, updateTeam)
    
    // Delete a team with teamId
    app.delete('/team/:teamId', adminAccessCheck, deleteTeam)

     // Search teams
     app.get('/team/search/:queryParam', searchTeamsWithQueryParam)
}

export default teamRoutes;
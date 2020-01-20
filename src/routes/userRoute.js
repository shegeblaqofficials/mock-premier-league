import {login, register, loginRequired} from '../controllers/userController'

const userRoute = (app) => {
    
    app.route('/auth/register')
        .post(register)

    app.route('/auth/login')
        .post(login)
}

export default userRoute;
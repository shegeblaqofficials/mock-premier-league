import app from './index'
import {port} from './config'

let PORT = port;

///set server to listen on port declared
const server = app.listen(process.env.PORT || PORT, ()=>{
    console.log(`Server running on ${PORT}`)
})

export default server;

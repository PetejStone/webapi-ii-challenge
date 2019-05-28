const express = require('express')

//importing router from router hs
//const router = require('../data/router.js')

//setting server to use express
const server = express();

//middleware for body
server.use(express.json());

server.get('/', (req, res) => {
    res.send( `
        <h2>This is a test for the main endpoing</h2>
    `)
})


//places /api as an endpoint in all the urls
//server.use('/api', router)

module.exports= server;
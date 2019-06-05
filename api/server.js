const express = require('express')

//importing router from router hs
const postsRouter = require('../data/router.js')

//setting server to use express
const server = express();

//middleware for body
server.use(express.json());

server.get('/', (req, res) => {
    res.send( `
        <h2>This is a test for the main endpoint</h2>
    `)
})

//places /api as an endpoint in all the urls
server.use('/api/posts', postsRouter)

module.exports = server;
const server = require('./api/server.js');

server.listen(4000, () => {
    console.log('server running on http://localhost:4000')
})
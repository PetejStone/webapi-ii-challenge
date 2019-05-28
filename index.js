const server = require('./data/db.js');

server.listen(4000, () => {
    console.log('server running on http://localhost:4000')
})
//importing server
const Posts = require('./db.js')

//hooking up express to use Router
const router = require('express').Router()

router.get('/', (req, res) => {
   Posts.find()
   .then(post => {
       res.status(200).json(post)
   })
   .catch(err => {
       res.status(500).json(err)
   })
})


module.exports = router;
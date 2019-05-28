//importing server
const Posts = require('./db.js')

//hooking up express to use Router
const router = require('express').Router()


//getting all posts
router.get('/', (req, res) => {
   Posts.find()
   .then(post => {
       res.status(200).json(post)
   })
   .catch(err => {
       res.status(500).json({ error: "The posts information could not be retrieved." })
   })
})

//getting posts by id

router.get('/:id', async (req, res) => {
    try { // try is like using 'then' when testing a conditional parameter
        const id = await Posts.findById(req.params.id); // setting id to retrieve the id from params

        if (id) { // id id exists in database
            res.status(200).json(id); //return the item with the id
        } else { //else, return error
            res.status(404).json({message: "The post with the specified ID does not exist." })
        }
    } catch (error) { //catch 
        res.status(500).json({error: "The post information could not be retrieved." })
    }
})

router.get('/:id/comments', async (req, res) => {
    try { // try is like using 'then' when testing a conditional parameter
        const id = await Posts.findPostComments(req.params.id); // setting id to retrieve the id from params

        if (id) { // id id exists in database
            res.status(200).json(id); //return the item with the id
        } else { //else, return error
            res.status(404).json({message: "The post with the specified ID does not exist." })
        }
    } catch (error) { //catch 
        res.status(500).json({error: "The comments information could not be retrieved." })
    }
})


module.exports = router;
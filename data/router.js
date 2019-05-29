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
//////  WORKS


router.get('/:id', async (req, res) => {
    try {
      const post = await Posts.findById(req.params.id);
  
      if (post && post.length) {
          console.log(post)
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: "The post with the specified ID does not exist." });
      }
    } catch (error) {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving the hub',
      });
    }
  });
  ////WORKS



//get comments by id
router.get('/:id/comments', async (req, res) => {
    try { // try is like using 'then' when testing a conditional parameter
        const post = await Posts.findById(req.params.id);
        

        if (post && post.length) { // if id exists in database
            const id = await Posts.findPostComments(req.params.id); // setting id to retrieve the id from params
            res.status(200).json(id); //return the item with the id
        } else { //else, return error
            res.status(404).json({message: "The post with the specified ID does not exist." })
        }
    } catch (error) { //catch 
        res.status(500).json({error: "The comments information could not be retrieved." })
    }
})
///WORKS

//create post
router.post('/', async (req, res) => {
    
if (!req.body.title || !req.body.contents) {res.status(400).json({errorMessage: "Please provide title and contents for the post." }) }
    try {
        const post = await Posts.insert(req.body);
        
            res.status(201).json(post) 
        
        
    } catch (error) {
        res.status(500).json({error: "There was an error while saving the post to the database" })
    }
})
//WORKING


router.post('/:id/comments', async (req, res) => {
    const commentInfo = {...req.body, post_id: req.params.id}
   
   if (!req.body.text) { res.status(400).json({ errorMessage: "Please provide text for the comment." })}
   
   try { // try is like using 'then' when testing a conditional parameter
        const post = await Posts.findById(req.params.id);
        

        if (post && post.length) { // if id exists in database
            const saved = await Posts.insertComment(commentInfo);
            res.status(201).json(saved)
        } else { //else, return error
            res.status(404).json({message: "The post with the specified ID does not exist." })
        }
    } catch (error) { //catch 
        res.status(500).json({error: "The comments information could not be retrieved." })
    }
  
})
///WORKING


//delete


router.delete('/:id', async (req, res) => {
 
    // }
    try { // try is like using 'then' when testing a conditional parameter
        const post = await Posts.findById(req.params.id);
        

        if (post && post.length) { // if id exists in database
            const id = await Posts.remove(req.params.id); // setting id to retrieve the id from params
            res.status(200).json("You have successfully deleted")
        } else { //else, return error
            res.status(404).json({message: "The post with the specified ID does not exist." })
        }
    } catch (error) { //catch 
        res.status(500).json({error: "The comments information could not be retrieved." })
    }
  });
  ///WORKING

  //put
  router.put('/:id', async (req, res) => {
  

    if (!req.body.title || !req.body.contents) {res.status(400).json({errorMessage: "Please provide title and contents for the post." }) }

    try { // try is like using 'then' when testing a conditional parameter
        const post = await Posts.findById(req.params.id);
        

        if (post && post.length) { // if id exists in database
            const post = await Posts.update(req.params.id, req.body);
            res.status(200).json(post)
        } else { //else, return error
            res.status(404).json({message: "The post with the specified ID does not exist." })
        }
    } catch (error) { //catch 
        res.status(500).json({error: "The post information could not be modified."  })
    }
  });

///WORKING

module.exports = router;

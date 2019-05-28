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

//get comments by id
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

//create post
router.post('/', async (req, res) => {
    

    try {
        const post = await Posts.insert(req.body);
        if (post) {
           
            res.status(201).json(post) 
        } else {
            res.status(400).json({errorMessage: "Please provide title and contents for the post." })
        }
    } catch (error) {
        res.status(500).json({error: "There was an error while saving the post to the database" })
    }
})

router.post('/:id/comments', async (req, res) => {
    const commentInfo = {...req.body, post_id: req.params.id}
    
    try {
        const saved = await Posts.insertComment(commentInfo);
        if (commentInfo) {
            res.status(201).json(saved)
        } else {
            res.status(404).json({message: "The post with the specified ID does not exist."})
        }
    } catch (err) {
        res.status(500).json({ error: "There was an error while saving the comment to the database"})
    }
    // try {
    //     const saved = await Posts.insertComment(commentInfo)
    //     res.status(201).json(saved)
    // } catch {
    //     res.status(500).json({message: "failed to save message"}), err
    // }
})

//delete

router.delete('/:id', async (req, res) => {
    try { // try is like using 'then' when testing a conditional parameter
        const id = await Posts.remove(req.params.id); // setting id to retrieve the id from params

        if (id) { // id id exists in database
            res.status(200).json({message: 'You hae succesfully deleted'}); //return the item with the id
        } else { //else, return error
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        }
    } catch (error) { //catch 
        res.status(500).json({error: "The post could not be removed" })
    }



    // try {
    //   const count = await Posts.remove(req.params.id);
    //   if (count > 0) {
    //     res.status(200).json({ message: 'The hub has been nuked' });
    //   } else {
    //     res.status(404).json({ message: 'The hub could not be found' });
    //   }
    // } catch (error) {
    //   // log error to database
    //   console.log(error);
    //   res.status(500).json({
    //     message: 'Error removing the hub',
    //   }); }
    
  });

  //put
  router.put('/:id', async (req, res) => {
    try {
      const post = await Posts.update(req.params.id, req.body);
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: "The post with the specified ID does not exist."  });
      }
    } catch (error) {
      // log error to database
      console.log(error);
      res.status(500).json({
        error: "The post information could not be modified." ,
      });
    }
  });



module.exports = router;
//try {
    //         const post = await Posts.insert(req.body);
    //         res.status(201).json(post);
    //       } catch (error) {
    //         // log error to database
    //         console.log(error);
    //         res.status(500).json({
    //           message: 'Error adding the hub',
    //         });
    //       }
    // })
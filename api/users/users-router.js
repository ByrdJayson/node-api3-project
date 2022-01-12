const express = require('express');
const { logger, validateUserId, validateUser, validatePost } = require('../middleware/middleware')
// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required

const Users = require('./users-model')
const Posts = require('../posts/posts-model')
const router = express.Router();

router.get('/', (req, res, next) => {
  Users.get()
  .then(user => {
    res.status(200).json(user)
  })
  .catch(next)
});

router.get('/:id', validateUserId, (req, res) => {
  res.json(req.user)
});

router.post('/', validateUser, (req, res, next) => {
  Users.insert({name: req.name})
    .then((newU) => {
      res.status(201).json(newU)
    })
    .catch(next)
});

router.put('/:id', validateUserId, validateUser, (req, res, next) => {
  Users.update(req.params.id, req.body)
    .then(user => {
      res.status(200).json(user)
    })
    .catch(next)
});

router.delete('/:id', validateUserId, (req, res, next) => {
  Users.remove(req.params.id)
    .then(user => {
      res.status(200).json(user)
    })
    .catch(next)
});

router.get('/:id/posts', validateUserId, (req, res, next) => {
  Users.getUserPosts(req.params.id)
    .then(post => {
      res.status(200).json(post)
    })
    .catch(next)
});

router.post('/:id/posts', validateUserId, validatePost, (req, res, next) => {
  req.body.user_id = req.params
  Posts.insert(req.body)
    .then(post => {
      res.status(200).json(post)
    })
    .catch(next)
});

router.use((err, req, res, next) => {
  res.status(err.status || 500).json({message: err.message, customMessage: "Something went wrong", stack: err.stack})
})

// do not forget to export the router
module.exports = router
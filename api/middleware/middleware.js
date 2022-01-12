const User = require('../users/users-model')

function logger(req, res, next) {
  const time = new Date().toLocaleString()
  console.log(time, req.method, req.url, )
  next()
}

async function validateUserId(req, res, next) {
  const { id } = req.params
  User.getById(id)
  .then(user => {
    if(user){
      req.user = user
      next()
    } else {
      res.status(404).json({message: "user not found"})
    }
  })
  .catch(next)
}

function validateUser(req, res, next) {
  const { name } = req.body

  if(!name){
    res.status(400).json({message: "missing required name field"})
  } else {
    req.name = name
    next()
  }
  
}

function validatePost(req, res, next) {
  const { text } = req.body

  if(!text) {
    res.status(400).json({message: "missing required text field"})
  } else {
    next()
  }

}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validatePost,
  validateUser,
  validateUserId
}
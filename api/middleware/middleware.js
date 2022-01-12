const User = require('../users/users-model')

function logger(req, res, next) {
  const time = new Date().toLocaleString()
  console.log(time, req.method, req.originalUrl, )
  next()
}

async function validateUserId(req, res, next) {
  try {
    const user = await User.getById(req.params.id)
    if(!user){
      res.status(404).json({message: "User does not exist"})
    } else {
      req.user = user
    }
  } catch (err) {
    next({status: 500, message: "Internal Error"})
  }
}

function validateUser(req, res, next) {
  console.log('scaffolding log')
  next()
  
}

function validatePost(req, res, next) {
  console.log('scaffolding log')
  next()
  
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validatePost,
  validateUser,
  validateUserId
}
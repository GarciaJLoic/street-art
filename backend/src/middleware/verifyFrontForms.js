const Joi = require('joi')

const userSignUpSchema = Joi.object({
  firstName: Joi.string().max(255).required(),
  lastName: Joi.string().max(255).required(),
  email: Joi.string().email().max(255).required(),
  password: Joi.string().max(255).min(5).required(),
})

const ValidateUserSignUp = async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body
  try {
    const { error } = userSignUpSchema.validate(
      { firstName, lastName, email, password },
      { abortEarly: false }
    )
    if (error) {
      res.status(422).json({ validationErrors: error.details })
    } else {
      next()
    }
  } catch (error) {
    console.error(error)
  }
}

// WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW
// WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW
// WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW

const userLoginSchema = Joi.object({
  pseudo: Joi.string().max(255), // .required(),
  email: Joi.string().email().max(255).required(),
  password: Joi.string().max(255).min(5).required(),
})

const ValidateUserLogin = async (req, res, next) => {
  const { email, password } = req.body
  // const { pseudo, email, password } = (req.body);
  try {
    const { error } = userLoginSchema.validate(
      { email, password },
      // { email },
      { abortEarly: false }
    )
    if (error) {
      res.status(422).json({ validationErrors: error.details })
    } else {
      next()
    }
  } catch (error) {
    console.error(error)
  }
}
module.exports = {
  ValidateUserSignUp,
  ValidateUserLogin,
}

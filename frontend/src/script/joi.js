import Joi from "joi"

const schemaAdminOeuvre = Joi.object({
  quartierId: Joi.number().integer().required(),
  lat: Joi.number().required(),
  lng: Joi.number().required(),
  oeuvreUrl: Joi.required(),
  points: Joi.number().integer().required(),
})
const schemaAddeuvreByUser = Joi.object({
  quartierId: Joi.number().integer().required(),
  lat: Joi.number().required(),
  lng: Joi.number().required(),
  oeuvreUrl: Joi.required(),
})
export { schemaAdminOeuvre, schemaAddeuvreByUser }

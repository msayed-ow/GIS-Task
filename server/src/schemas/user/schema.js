const decimalExtention = require('joi-decimal');
const baseJoi = require('Joi')
const joi = baseJoi.extend(decimalExtention);

const usersSchema = joi.object().keys({
    id: joi.number().integer().required(),
    name: joi.string().required(),
    username: joi.string(),
    email: joi.string().required(),
    address: {
        street: joi.string(),
        suite: joi.string(),
        city: joi.string(),
        zipcode: joi.string(),
        geo: {
            lat: joi.decimal().required(),
            lng: joi.decimal().required()
        }
    },
    phone: joi.string().required(),
    website: joi.string(),
    company: {
        name: joi.string().required(),
        catchPhrase: joi.string(),
        bs: joi.string()
    }
});

module.exports = usersSchema;
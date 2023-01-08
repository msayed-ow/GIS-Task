validateEmail = _ =>  (req, res, next) => {
    var validator = require("email-validator");
    if (validator.validate(req?.body.email))
        next();
    else {
        console.log("email is not valid");
        res?.status(400)
        throw new Error("Email is not vaild !!");
    }

}
module.exports = validateEmail;
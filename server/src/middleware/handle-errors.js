handleErrors = (err, req, res, next) => {
    console.log(err)
    console.log(res)

    switch (res.statusCode) {
        case 500:
            return res.status(500).send({
                result: null, error: err.message.replace(/[^a-zA-Z ]/g, "")
            });
            break;
        case 400:
            return res.status(400).send({
                result: null, error: err.message.replace(/[^a-zA-Z ]/g, "")
            });
            break;
        default:
            return res.status(404).send({
                result: null, error: err.message.replace(/[^a-zA-Z ]/g, "")
            });
            break;

    }

};

module.exports = handleErrors;
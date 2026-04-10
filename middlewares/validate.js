function validate(schema) {

return (req, res, next) => {
    const { error } = schema.validate(req.body, {
        abortEarly: true,
        allowUnknown: false
    });

    if(error){
        console.log(error);
        return res.status(400).json({
            message: error.details[0].message
        });
    }

    next();
}

}

module.exports = validate;
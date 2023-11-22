const errHandler = (err, req, res, next) => {
    switch (err.name) {
        case "SequelizeValidationError":
        case "SequelizeUniqueConstraintError":
            res.status(400).json({message: err.errors[0].message})
            break;
        case "InvalidInput":
            res.status(400).json({message: 'Email or Password is required'})
            break;
        case "InvalidEmail/Password":
            res.status(401).json({message: 'Invalid Email or Password'})
            break;
        case "InvalidEmail":
            res.status(401).json({message: 'Email is not registered'})
            break;
        case "NotFound":
            res.status(404).json({message: 'Thread Not Found'})
            break;
        case "JsonWebTokenError":
        case "InvalidToken":
            res.status(401).json({message: 'Invalid Token'})
            break;
        case "Forbidden":
            res.status(403).json({message: 'Forbidden'})
            break;
        default:
            console.log(err);
            res.status(500).json({message: 'Internal Server Error'})
            break;
    }
}

module.exports = errHandler
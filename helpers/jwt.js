const jwt = require('jsonwebtoken');

const jwtSecret = process.env.JWT_SECRET
//sign token
// const token = jwt.sign({ name: 'test' }, jwt_secret);
// //verifying token
// const decoded = jwt.verify(token, jwt_secret);

// console.log({token, decoded});

const signInToken = (data) => {
    return jwt.sign(data, jwtSecret)
}
const verifyingToken = (token) => {
    return jwt.verify(token, jwtSecret)
}


module.exports = {signInToken, verifyingToken}
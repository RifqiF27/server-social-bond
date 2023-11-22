const bcrypt = require('bcryptjs')

const hasPassword = (password) => {
    return bcrypt.hashSync(password);
}

const comparePassword = (password, hashedPassword) => {
    return bcrypt.compareSync(password, hashedPassword);
    
}

module.exports = { hasPassword, comparePassword }
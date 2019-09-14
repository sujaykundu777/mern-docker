// Setup Environment Variables
require('dotenv').config();

const userRoles = {
    guest: 1,            // ...001
    user: 2,             // ...010
    admin: 4,            // ...100
}

const accessLevels = {
    guest: userRoles.guest | userRoles.user | userRoles.admin,   // ...111
    user: userRoles.user | userRoles.admin,                      // ...110
    admin: userRoles.admin                                       // ...100
}


module.exports = {
    secret: process.env.NODE_ENV === "production" ? process.env.SECRET : 'secret',
    'userRoles': userRoles,
    'accessLevels': accessLevels
};
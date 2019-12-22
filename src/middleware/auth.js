const jwt = require('jsonwebtoken')
const User = require('../models/user')

/*
 * Authenticate User using 'JSON Web Token'.
 * - This function utilizes middleware to grab the authentication token from the header,
 *      and after decoding, verify that the token is indeed the object id and do whatever.
 * - The above was in technical terms; what actually happens when a route is used is that
 *      whenever a user does something, the token of the current login is sent over with the 
 *      call and the server performs operations depending on what was decoded from the token.
 */
const auth = async (req, res, next) => {
    try {
        // const token = req.header('Authorization').replace('Bearer ', '')
        const token = req.cookies.auth.replace('Bearer ', '') // if token exists
        
        const decoded = jwt.verify(token, 'BL1T-8R0J$CT') // verify token
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token }) // search token
    
        if (!user) { // if token exists
            throw new Error()
        }
    
        req.token = token; // edit tokens for the purposes of login, logout
        req.user = user
            
        next()
    } catch (e) {
        res.redirect(401, '/account')
    }
} 

module.exports = auth

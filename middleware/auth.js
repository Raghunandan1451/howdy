const Users = require("../models/userModel") // Importing userModel to interact with the database
const jwt = require('jsonwebtoken') // Importing jsonwebtoken for token verification

/**
 * Authentication middleware
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 * @returns {Object} JSON response or calls the next function
 */
const auth = async (req, res, next) => {
    try {
        const token = req.header("Authorization") // Extracting token from the request header

        if(!token) return res.status(400).json({msg: "Invalid Authentication."}) // Checking if token exists

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET) // Verifying the token
        if(!decoded) return res.status(400).json({msg: "Invalid Authentication."}) // Checking if token is valid

        const user = await Users.findOne({_id: decoded.id}) // Finding user by the decoded token id
        
        req.user = user // Adding user to the request object
        next() // Calling the next function
    } catch (err) {
        return res.status(500).json({msg: err.message}) // Returning error message if any error occurs
    }
}

module.exports = auth // Exporting the authentication middleware

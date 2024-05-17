const Users = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// Controller for user authentication
const authCtrl = {
	// Register a new user
	register: async (req, res) => {
		try {
			const { username, email, password } = req.body
			const user_name = await Users.findOne({username}) // Check if username already exists
			if(user_name) return res.status(400).json({msg: "This user name already exists."})

			const user_email = await Users.findOne({email}) // Check if email already exists
			if(user_email) return res.status(400).json({msg: "This email already exists."})

			if(password.length < 6) // Check if password is at least 6 characters
			return res.status(400).json({msg: "Password must be at least 6 characters."})

			const passwordHash = await bcrypt.hash(password, 12) // Hash the password

			const newUser = new Users({ // Create a new user
				username, email, password: passwordHash
			})

			const access_token = createAccessToken({id: newUser._id}) // Create an access token
			const refresh_token = createRefreshToken({id: newUser._id}) // Create a refresh token

			res.cookie('refreshtoken', refresh_token, { // Set the refresh token in a cookie
				httpOnly: true,
				path: '/api/refresh_token',
				maxAge: 30*24*60*60*1000 // 30 days
			})

			await newUser.save() // Save the new user to the database

			res.json({ // Return success message and user data
				msg: 'Register Success!',
				access_token,
				user: {
					...newUser._doc,
					password: ''
				}
			})
		} catch (err) {
			return res.status(500).json({msg: err.message})
		}
	},
	// Login a user
	login: async (req, res) => {
		try {
			const { username, password } = req.body
			const user = await Users.findOne({username}) // Check if username exists

			if(!user) return res.status(400).json({msg: "This username does not exist."})

			const isMatch = await bcrypt.compare(password, user.password) // Check if password is correct
			if(!isMatch) return res.status(400).json({msg: "Password is incorrect."})

			const access_token = createAccessToken({id: user._id}) // Create an access token
			const refresh_token = createRefreshToken({id: user._id}) // Create a refresh token

			res.cookie('refreshtoken', refresh_token, { // Set the refresh token in a cookie
				httpOnly: true,
				path: '/api/refresh_token',
				maxAge: 30*24*60*60*1000 // 30 days
			})

			res.json({ // Return success message and user data
				msg: 'Login Success!',
				access_token,
				user: {
					...user._doc,
					password: ''
				}
			})
		} catch (err) {
			return res.status(500).json({msg: err.message})
		}
	},
	// Logout a user
	logout: async (req, res) => {
		try {
			res.clearCookie('refreshtoken', {path: '/api/refresh_token'}) // Clear the refresh token cookie
			return res.json({msg: "Logged out!"})
		} catch (err) {
			return res.status(500).json({msg: err.message})
		}
	},
	// Generate an access token
	generateAccessToken: async (req, res) => {
		try {
			const rf_token = req.cookies.refreshtoken // Get the refresh token from cookie
			if(!rf_token) return res.status(400).json({msg: "Please login now."})

			jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, async(err, result) => {
				if(err) return res.status(400).json({msg: "Please login now."})

				const user = await Users.findById(result.id).select("-password") // Find the user by id and exclude password

				if(!user) return res.status(400).json({msg: "This does not exist."})

				const access_token = createAccessToken({id: result.id}) // Create an access token

				res.json({ // Return the access token and user data
					access_token,
					user
				})
			})
			
		} catch (err) {
			return res.status(500).json({msg: err.message})
		}
	}
}

// Function to create access token
const createAccessToken = (payload) => {
	return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1d'})
}

// Function to create refresh token
const createRefreshToken = (payload) => {
	return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '30d'})
}

module.exports = authCtrl

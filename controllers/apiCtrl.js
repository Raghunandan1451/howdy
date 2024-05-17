// Controllers for API endpoints
const Users = require('../models/userModel') // Import User model
const Conversation = require('../models/conversationModel'); // Import Conversation model
const Message = require('../models/messageModel'); // Import Message model

const apiCtrl = {
	// Get all users
	getUsers : async (req, res) => {
		try {
			const user = await Users.find({}) // Find all users
			
			res.json({ user }); // Return users
		} catch (err) {
			return res.status(500).json({ msg: err.message }); // Return error message
		}
	},
	// Get user by id or username
	getUser: async (req, res) => {
		const userId = req.query.userId; // Get userId from query parameter
		const username = req.query.username; // Get username from query parameter
		try {
			const user = userId // If userId is provided, find user by id
				? await Users.findById(userId)
				: await Users.findOne({ username: username }); // If username is provided, find user by username
			const { password, updatedAt, ...other } = user._doc; // Remove password and updatedAt fields from user object
			
			res.status(200).json(other); // Return user object
		} catch (err) {
			res.status(500).json(err); // Return error message
		}
	},
	// Get conversations by user id
	getConversations: async (req, res) => {
		try {
			const conversation = await Conversation.find({
				members: { $in: [req.params.userId] }, // Find conversations where user id is in members array
			});

			res.status(200).json(conversation); // Return conversations
		} catch (err) {
			res.status(500).json(err); // Return error message
		}
	},
	// Get messages by conversation id
	getMessages: async (req, res) => {
		try {
			const messages = await Message.find({
				conversationId: req.params.conversationId, // Find messages by conversation id
			});
			res.status(200).json(messages); // Return messages
		} catch (err) {
			res.status(500).json(err); // Return error message
		}
	},
	// Create a new conversation
	postConversations: async (req, res) => {
		const {senderId, receiverId } = req.body; // Get senderId and receiverId from request body
		
		const newConversation = new Conversation({
			members: [senderId, receiverId], // Create a new conversation object with members array
		});
		
		const exists = await Conversation.findOne({members: [senderId, receiverId]}) // Check if conversation already exists

		try {
			if(exists) {
				res.status(400).json({msg: 'conversation id already existed'}) // Return error message if conversation already exists
			}
			else {
				const savedConversation = await newConversation.save(); // Save new conversation
				res.status(200).json([savedConversation]); // Return saved conversation
			}

		} catch (err) {
			res.status(500).json(err); // Return error message
		}
	},
	// Create a new message
	postMessages: async (req, res) => {
		const newMessage = new Message(req.body); // Create a new message object from request body

		try {
			const savedMessage = await newMessage.save(); // Save new message
			res.status(200).json(savedMessage); // Return saved message
		} catch (err) {
			res.status(500).json(err); // Return error message
		}
	}
}

module.exports = apiCtrl; // Export apiCtrl object

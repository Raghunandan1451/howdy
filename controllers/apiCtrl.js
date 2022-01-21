const Users = require('../models/userModel')
const Conversation = require('../models/conversationModel');
const Message = require('../models/messageModel');

const apiCtrl = {
	getUsers : async (req, res) => {
		try {
			const user = await Users.find({})
			
			res.json({ user });
		} catch (err) {
			return res.status(500).json({ msg: err.message });
		}
	},
	getUser: async (req, res) => {
		const userId = req.query.userId;
		const username = req.query.username;
		try {
			const user = userId
				? await Users.findById(userId)
				: await Users.findOne({ username: username });
			const { password, updatedAt, ...other } = user._doc;
			
			res.status(200).json(other);
		} catch (err) {
			res.status(500).json(err);
		}
	},
	getConversations: async (req, res) => {
		try {
			const conversation = await Conversation.find({
				members: { $in: [req.params.userId] },
			});

			res.status(200).json(conversation);
		} catch (err) {
			res.status(500).json(err);
		}
	},
	getMessages: async (req, res) => {
		try {
			const messages = await Message.find({
				conversationId: req.params.conversationId,
			});
			res.status(200).json(messages);
		} catch (err) {
			res.status(500).json(err);
		}
	},
	postConversations: async (req, res) => {
		const {senderId, receiverId } = req.body;
		
		const newConversation = new Conversation({
			members: [senderId, receiverId],
		});
		
		const exists = await Conversation.findOne({members: [senderId, receiverId]})

		try {
			if(exists) {
				res.status(400).json({msg: 'conversation id already existed'})
			}
			else {
				const savedConversation = await newConversation.save();
				res.status(200).json([savedConversation]);
			}

		} catch (err) {
			res.status(500).json(err);
		}
	},
	postMessages: async (req, res) => {
		const newMessage = new Message(req.body);

		try {
			const savedMessage = await newMessage.save();
			res.status(200).json(savedMessage);
		} catch (err) {
			res.status(500).json(err);
		}
	}
}

module.exports = apiCtrl;
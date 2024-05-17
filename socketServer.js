// Store the list of connected users
let users = [];

/**
 * Add a new user to the list of connected users
 * @param {string} userId - The unique identifier of the user
 * @param {string} socketId - The unique identifier of the socket connection
 */
const addUser = (userId, socketId) => {
	// Check if the user is already in the list of connected users
	if (!users.some(user => user.userId === userId)) {
		// If not, add the user to the list of connected users
		users.push({ userId, socketId });
	}
};

/**
 * Remove a user from the list of connected users
 * @param {string} socketId - The unique identifier of the socket connection
 */
const removeUser = (socketId) => {
	// Remove the user from the list of connected users
	users = users.filter(user => user.socketId !== socketId);
};

/**
 * Get the user object from the list of connected users
 * @param {string} userId - The unique identifier of the user
 * @returns {Object|undefined} - The user object if found, otherwise undefined
 */
const getUser = (userId) => {
	return users.find(user => user.userId === userId);
};

/**
 * Handle the socket events
 * @param {object} socket - The socket object representing the connection
 * @param {object} io - The socket.io server instance
 */
const socketServer = (socket, io) => {
	console.log('user connected')

	// Event handler for adding a new user
	socket.on('addUser', (userId) => {
		addUser(userId, socket.id);
		// Emit the updated list of connected users to all connected clients
		io.emit('getUsers', users);
	});

	// Event handler for sending a message
	socket.on("sendMessage", ({ senderId, receiverId, text }) => {
		const user = getUser(receiverId);

		const data = {
			senderId,
			text
		}
	
		// Emit the message to the receiver's socket connection
		io.to(user.socketId).emit("getMessages", data);
		
	});

	// Event handler for when a user disconnects
	socket.on('disconnect', () => {
		console.log('A user Disconnected')
		// Remove the user from the list of connected users
		removeUser(socket.id)
		// Emit the updated list of connected users to all connected clients
		io.emit('getUsers', users)
	})
}

module.exports = socketServer;

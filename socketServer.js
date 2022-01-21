let users = [];

const addUser = (userId, socketId) => {
	!users
		.some((user) => user.userId === userId) && 
		users.push({ userId, socketId });
};

const removeUser = (socketId) => {
	users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
	return users.find((user) => user.userId === userId);
};


const socketServer = (socket, io) => {
	console.log('user connected')

	socket.on('addUser', (userId) => {
		addUser(userId, socket.id);
		io.emit('getUsers', users);
	});

	socket.on("sendMessage", ({ senderId, receiverId, text }) => {
		const user = getUser(receiverId);

		const data = {
			senderId,
			text
		}
	
		io.to(user.socketId).emit("getMessages", data);
		
	});

	socket.on('disconnect', () => {
		console.log('A user Disconnected')
		removeUser(socket.id)
		io.emit('getUsers', users)
	})
}

module.exports = socketServer;
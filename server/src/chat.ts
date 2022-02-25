/** @format */
import * as socketIo from 'socket.io';
import {saveMessage} from './controller/chatController';
const ChatHandler = (io: socketIo.Server) => {
	io.on('connection', (socket: socketIo.Socket) => {
		socket.on('send-message', data => handleMessage(data, io));
		socket.on('leave-room', data => handleLeaveRoom(data, socket));
		socket.on('join-room', data => handleJoinRoom(data, socket));
		socket.on('disconnect', () => handleDisconnect(socket));
	});
};

const handleMessage: ({sentBy, sentTo, message, roomId}: {sentBy: string; sentTo: string; message: string; roomId: string}, io: socketIo.Server) => void = ({sentBy, sentTo, message, roomId}, io: socketIo.Server) => {
	console.log(`message sent by ${sentBy} to ${sentTo} in room ${roomId}`);
	io?.to(roomId)?.emit('new-message', {sentBy,content: message});
	saveMessage(sentBy, message, roomId);
};
const handleLeaveRoom = ({email, roomId}: {email: string; roomId: string}, socket: socketIo.Socket) => {
	socket.broadcast.emit('user-disconnected', email);
	socket.leave(roomId);
};
function handleJoinRoom({joinerId, roomId}: {joinerId: string; roomId: string}, socket: socketIo.Socket) {
	console.log(`user ${joinerId} joined room ${roomId}`);
	socket.join(roomId);
	socket.to(roomId).emit('new-user-joined', {joinerId});
}
const handleDisconnect = (socket: socketIo.Socket) => {
	socket.disconnect();
};
export default ChatHandler;

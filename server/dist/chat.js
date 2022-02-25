"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chatController_1 = require("./controller/chatController");
const ChatHandler = (io) => {
    io.on('connection', (socket) => {
        socket.on('send-message', data => handleMessage(data, io));
        socket.on('leave-room', data => handleLeaveRoom(data, socket));
        socket.on('join-room', data => handleJoinRoom(data, socket));
        socket.on('disconnect', () => handleDisconnect(socket));
    });
};
const handleMessage = ({ sentBy, sentTo, message, roomId }, io) => {
    var _a;
    console.log(`message sent by ${sentBy} to ${sentTo} in room ${roomId}`);
    (_a = io === null || io === void 0 ? void 0 : io.to(roomId)) === null || _a === void 0 ? void 0 : _a.emit('new-message', { sentBy, content: message });
    (0, chatController_1.saveMessage)(sentBy, message, roomId);
};
const handleLeaveRoom = ({ email, roomId }, socket) => {
    socket.broadcast.emit('user-disconnected', email);
    socket.leave(roomId);
};
function handleJoinRoom({ joinerId, roomId }, socket) {
    console.log(`user ${joinerId} joined room ${roomId}`);
    socket.join(roomId);
    socket.to(roomId).emit('new-user-joined', { joinerId });
}
const handleDisconnect = (socket) => {
    socket.disconnect();
};
exports.default = ChatHandler;
//# sourceMappingURL=chat.js.map
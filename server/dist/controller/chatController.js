"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUserByEmailOrDisplayName = exports.findUserByDisplayName = exports.findUserByEmail = exports.saveUser = exports.saveMessage = exports.findAllMessages = exports.createRoom = exports.findAllRooms = void 0;
const uuid_1 = require("uuid");
const Message_1 = __importDefault(require("../models/Message"));
const Rooms_1 = __importDefault(require("../models/Rooms"));
const Users_1 = __importDefault(require("../models/Users"));
const findAllRooms = async (userId) => {
    const rooms = await Rooms_1.default.find({ userIds: userId }).exec();
    return { data: rooms || [], success: true };
};
exports.findAllRooms = findAllRooms;
const createRoom = async (userName, friendName) => {
    let room = await Rooms_1.default.findOne({ userNamesArr: { $all: [userName, friendName] } }).exec();
    if (room)
        return { data: Object.assign(Object.assign({}, room), { message: 'Room already exists' }), success: true };
    const roomId = (0, uuid_1.v4)();
    const user1 = await Users_1.default.findOneAndUpdate({ displayName: userName }, { $push: { rooms: roomId } }).exec();
    const user2 = await Users_1.default.findOneAndUpdate({ displayName: friendName }, { $push: { rooms: roomId } }).exec();
    room = await new Rooms_1.default({ userNamesArr: [userName, friendName], roomId, userIds: [user1 === null || user1 === void 0 ? void 0 : user1._id, user2 === null || user2 === void 0 ? void 0 : user2._id] }).save();
    return { data: room, success: true };
};
exports.createRoom = createRoom;
const findAllMessages = async (roomId) => {
    const messages = await Rooms_1.default.findOne({ roomId }).select('messages').exec();
    return { data: (messages === null || messages === void 0 ? void 0 : messages.messages) || [], success: true };
};
exports.findAllMessages = findAllMessages;
const saveMessage = async (sentBy, message, roomId) => {
    const room = await Rooms_1.default.findOneAndUpdate({ roomId }, { $push: { messages: new Message_1.default({ sentBy, content: message }) }, lastMessage: message.substring(0, 15) }).exec();
    return { success: true, data: room };
};
exports.saveMessage = saveMessage;
const saveUser = async (email, displayName, photoUrl) => {
    let user = await Users_1.default.findOne({ email }).exec();
    if (user)
        return { data: user, success: true };
    user = await new Users_1.default({ email, displayName, photoUrl, friends: [] }).save();
    return { data: user, success: true };
};
exports.saveUser = saveUser;
const findUserByEmail = async (email) => {
    const users = await Users_1.default.find()
        .where({ email: { $regex: email, $options: 'i' } })
        .exec();
    return { data: users, success: true };
};
exports.findUserByEmail = findUserByEmail;
const findUserByDisplayName = async (displayName) => {
    const users = await Users_1.default.find()
        .where({ displayName: { $regex: displayName, $options: 'i' } })
        .exec();
    return { data: users, success: true };
};
exports.findUserByDisplayName = findUserByDisplayName;
const findUserByEmailOrDisplayName = async (email, displayName) => {
    const users = await Users_1.default.find()
        .or([{ displayName: { $regex: displayName, $options: 'i' } }, { email: { $regex: email, $options: 'i' } }])
        .exec();
    return { data: users, success: true };
};
exports.findUserByEmailOrDisplayName = findUserByEmailOrDisplayName;
//# sourceMappingURL=chatController.js.map
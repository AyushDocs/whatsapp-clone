/** @format */

import {v4} from 'uuid';
import ApiResponse from '../models/ApiResponse';
import Message, {MessageDocument} from '../models/Message';
import Rooms, {RoomDocument} from '../models/Rooms';
import Users, {UserDocument} from '../models/Users';
/**
 * this method is used to get all rooms a user has access to
 * @route 	GET /api/rooms/
 */
//TODO:add pagination later
export const findAllRooms = async (userId: string): ApiResponse<RoomDocument[]> => {
	const rooms = await Rooms.find({userIds: userId}).exec();
	return {data: rooms || [], success: true};
};
/**
 * this method is used to create a new room
 * @route 	POST /api/rooms/
 */
export const createRoom = async (userName: string, friendName: string) => {
	let room = await Rooms.findOne({userNamesArr: {$all: [userName, friendName]}}).exec();
	if (room) return {data: {...room, message: 'Room already exists'}, success: true};
	const roomId = v4();
	const user1 = await Users.findOneAndUpdate({displayName: userName}, {$push: {rooms: roomId}}).exec();
	const user2 = await Users.findOneAndUpdate({displayName: friendName}, {$push: {rooms: roomId}}).exec();
	room = await new Rooms({userNamesArr: [userName, friendName], roomId, userIds: [user1?._id, user2?._id]}).save();
	return {data: room, success: true};
};
/**
 * this method is used to get a list of messages in a room
 * TODO: ADD PAGING FUNCTIONALITY
 * @route 	GET /api/rooms/:roomId
 */
export const findAllMessages = async (roomId: string): ApiResponse<MessageDocument[]> => {
	const messages: RoomDocument | null = await Rooms.findOne({roomId}).select('messages').exec();
	return {data: messages?.messages || [], success: true};
};
/**
 * used to save message in a room
 * only in development mode
 * in production will be used by socket io
 * @route 	POST /api/rooms/:roomId/messages
 */
export const saveMessage = async (sentBy: string, message: string, roomId: string): ApiResponse<RoomDocument | null> => {
	const room: RoomDocument | null = await Rooms.findOneAndUpdate({roomId}, {$push: {messages: new Message({sentBy, content: message})},lastMessage:message.substring(0,15)}).exec();
	return {success: true, data: room};
};
/**
 * @param roomId
 * @param email
 */
export const saveUser = async (email: string, displayName: string, photoUrl: string): ApiResponse<UserDocument> => {
	let user: UserDocument | null = await Users.findOne({email}).exec();
	if (user) return {data: user, success: true};
	user = await new Users({email, displayName, photoUrl, friends: []}).save();
	return {data: user, success: true};
};
export const findUserByEmail = async (email: string): ApiResponse<UserDocument[]> => {
	const users = await Users.find()
		.where({email: {$regex: email, $options: 'i'}})
		.exec();
	return {data: users, success: true};
};
export const findUserByDisplayName = async (displayName?: string): ApiResponse<UserDocument[]> => {
	const users = await Users.find()
		.where({displayName: {$regex: displayName, $options: 'i'}})
		.exec();
	return {data: users, success: true};
};
export const findUserByEmailOrDisplayName = async (email: string, displayName: string): ApiResponse<UserDocument[]> => {
	const users = await Users.find()
		.or([{displayName: {$regex: displayName, $options: 'i'}}, {email: {$regex: email, $options: 'i'}}])
		.exec();
	return {data: users, success: true};
};

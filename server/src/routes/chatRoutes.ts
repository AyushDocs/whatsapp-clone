/** @format */

import {Router} from 'express';
import Users from '../models/Users';
import {createRoom, findAllMessages, findAllRooms, findUserByDisplayName, findUserByEmail, saveMessage, saveUser} from '../controller/chatController';
const router = Router();
import {isValidObjectId} from 'mongoose'
/**
 * this method is used to get all rooms a user has access to
 * @route 	GET /api/rooms/
 */
router.get('/rooms/', async (req, res) => {
	const {userId} = req.query;
	if (!userId || typeof userId !== 'string') return res.status(400).json({data: {message: 'user id is required'}, success: false});
	if(!isValidObjectId(userId))return res.status(400).json({data: {message: 'user id is not object id'}, success: false});
	const data = await findAllRooms(userId);
	return res.json(data);
});
/**
 * this method is used to create a new room
 * @route 	POST /api/rooms/
 */
router.post('/rooms/', async (req, res) => {
	let {userDisplayName, friendDisplayName} = req.body;
	if (!userDisplayName) return res.status(400).json({data: {message: 'userDisplayName is required'}, success: false});
	if (!friendDisplayName || typeof friendDisplayName !== 'string') return res.status(400).json({data: {message: 'friendDisplayName is required'}, success: false});
	const data = await createRoom(userDisplayName, friendDisplayName);
	return res.json(data);
});
/**
 * this method is used to get a list of messages in a room
 * TODO: ADD PAGING FUNCTIONALITY
 * @route 	GET /api/rooms/:roomId
 */
router.get('/rooms/:roomId', async (req, res) => {
	const {roomId} = req.params;
	if (!roomId) return res.status(404).json({data: {message: 'room id not found'}, success: false});
	const data = await findAllMessages(roomId);
	return res.json(data);
});
/**
 * used to save message in a room
 * only in development mode
 * in production will be used by socket io
 * @route 	POST /api/rooms/:roomId/messages
 */
router.post('/rooms/:roomId/messages', async (req, res) => {
	if (process.env.NODE_ENV !== 'development') return res.end();
	const {roomId} = req.params;
	const {sentBy, message} = req.body;
	if (!roomId) return res.status(404).json({data: {message: 'room id not found'}, success: false});
	if (!sentBy) return res.status(404).json({data: {message: 'by object id is required'}, success: false});
	if (!message) return res.status(400).json({data: {message: 'message is required'}, success: false});
	const data = await saveMessage(sentBy, message, roomId);
	return res.json(data);
});
/**
 * used to save a user in a room if he is new else returns existing user
 */
router.post('/users/', async (req, res) => {
	let {email, photoUrl, displayName} = req.body;
	if (!email) return res.status(400).json({data: {message: 'email is required'}, success: false});
	if (!photoUrl) return res.status(400).json({data: {message: 'photo url is required'}, success: false});
	if (!displayName) displayName = email.substring(0, email.indexOf('@'));
	const data = await saveUser(email, displayName, photoUrl);
	return res.json(data);
});
/**
 * used to get users in search of a specific email or display name
 */
router.get('/users/', async (req, res) => {
	const {email, displayName} = req.query;
	let data = undefined;
	if (!email && !displayName) return res.status(400).json({data: {message: 'email or display name is required'}, success: false});
	if (!email && displayName && typeof displayName === 'string') data = await findUserByDisplayName(displayName);
	else if (typeof email === 'string') data = await findUserByEmail(email);
	return res.json(data);
});
router.get('/user/get', async (_, res) => {
	if (process.env.NODE_ENV === 'production') return res.end();
	const user = await Users.findOne({displayName: 'Ayush Dubey'}).exec();
	return res.json(user);
});
export default router;

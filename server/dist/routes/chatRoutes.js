"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Users_1 = __importDefault(require("../models/Users"));
const chatController_1 = require("../controller/chatController");
const router = (0, express_1.Router)();
const mongoose_1 = require("mongoose");
router.get('/rooms/', async (req, res) => {
    const { userId } = req.query;
    if (!userId || typeof userId !== 'string')
        return res.status(400).json({ data: { message: 'user id is required' }, success: false });
    if (!(0, mongoose_1.isValidObjectId)(userId))
        return res.status(400).json({ data: { message: 'user id is not object id' }, success: false });
    const data = await (0, chatController_1.findAllRooms)(userId);
    return res.json(data);
});
router.post('/rooms/', async (req, res) => {
    let { userDisplayName, friendDisplayName } = req.body;
    if (!userDisplayName)
        return res.status(400).json({ data: { message: 'userDisplayName is required' }, success: false });
    if (!friendDisplayName || typeof friendDisplayName !== 'string')
        return res.status(400).json({ data: { message: 'friendDisplayName is required' }, success: false });
    const data = await (0, chatController_1.createRoom)(userDisplayName, friendDisplayName);
    return res.json(data);
});
router.get('/rooms/:roomId', async (req, res) => {
    const { roomId } = req.params;
    if (!roomId)
        return res.status(404).json({ data: { message: 'room id not found' }, success: false });
    const data = await (0, chatController_1.findAllMessages)(roomId);
    return res.json(data);
});
router.post('/rooms/:roomId/messages', async (req, res) => {
    if (process.env.NODE_ENV !== 'development')
        return res.end();
    const { roomId } = req.params;
    const { sentBy, message } = req.body;
    if (!roomId)
        return res.status(404).json({ data: { message: 'room id not found' }, success: false });
    if (!sentBy)
        return res.status(404).json({ data: { message: 'by object id is required' }, success: false });
    if (!message)
        return res.status(400).json({ data: { message: 'message is required' }, success: false });
    const data = await (0, chatController_1.saveMessage)(sentBy, message, roomId);
    return res.json(data);
});
router.post('/users/', async (req, res) => {
    let { email, photoUrl, displayName } = req.body;
    if (!email)
        return res.status(400).json({ data: { message: 'email is required' }, success: false });
    if (!photoUrl)
        return res.status(400).json({ data: { message: 'photo url is required' }, success: false });
    if (!displayName)
        displayName = email.substring(0, email.indexOf('@'));
    const data = await (0, chatController_1.saveUser)(email, displayName, photoUrl);
    return res.json(data);
});
router.get('/users/', async (req, res) => {
    const { email, displayName } = req.query;
    let data = undefined;
    if (!email && !displayName)
        return res.status(400).json({ data: { message: 'email or display name is required' }, success: false });
    if (!email && displayName && typeof displayName === 'string')
        data = await (0, chatController_1.findUserByDisplayName)(displayName);
    else if (typeof email === 'string')
        data = await (0, chatController_1.findUserByEmail)(email);
    return res.json(data);
});
router.get('/user/get', async (_, res) => {
    if (process.env.NODE_ENV === 'production')
        return res.end();
    const user = await Users_1.default.findOne({ displayName: 'Ayush Dubey' }).exec();
    return res.json(user);
});
exports.default = router;
//# sourceMappingURL=chatRoutes.js.map
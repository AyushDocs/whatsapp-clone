/** @format */
import cors from 'cors';
import dotenv from 'dotenv';
import express, {Express} from 'express';
import http from 'http';
import mongoose from 'mongoose';
import {Server} from 'socket.io';
import ChatHandler from './chat';
import errorHandler from './middlewares/errorHandler';
import logger from './middlewares/logger';
import Rooms from './models/Rooms';
import Users from './models/Users';
import * as chat from './controller/chatController'
import chatRoutes from './routes/chatRoutes';
const app: Express = express();
dotenv.config();
app.use(logger);
app.use(errorHandler);
app.use(cors({origin: 'http://localhost:3000'}));
app.use(express.json());
app.use('/api/', chatRoutes);
const PORT = process.env.PORT || 3001;
const httpServer = http.createServer(app);
const options = {
	cors: {
		origin: 'http://localhost:3000',
	},
};
const io: Server = new Server(httpServer, options);
ChatHandler(io);
(async () => {
	try {
		if (!process.env.DB_URL) return;
		mongoose.connect(process.env.DB_URL, async () => {
			console.log('connected to db successfully');
			await initData();
			httpServer.listen(PORT, () => console.log(`server started on port ${PORT}`));
		});
	} catch (error) {
		console.error(error.message);
	}
})();
const initData = async () => {
	await Users.deleteMany().exec();
	await Rooms.deleteMany().exec();
	const ayush=await chat.saveUser('ayush@gmail.com', 'Ayush Dubey', 'https://avatars3.githubusercontent.com/u/52709853?s=460&u=f9f8b8d8f9f8b8d8f9f8b8d8f9f8b8d8f9f8b8d8&v=4');
	const rahul=await chat.saveUser('rahul@gmail.com', 'Rahul Shrivastri', 'https://avatars3.githubusercontent.com/u/52709853?s=460&u=f9f8b8d8f9f8b8d8f9f8b8d8f9f8b8d8f9f8b8d7&v=4');
	const shivam=await chat.saveUser('shivam@gmail.com', 'Shivam Tripathi', 'https://avatars3.githubusercontent.com/u/52709853?s=460&u=f9f8b8d8f9f8b8d8f9f8b8d8f9f8b8d8f9f8b8d6&v=4');
	await chat.createRoom(ayush.data.displayName,rahul.data.displayName);
	await chat.createRoom(ayush.data.displayName,shivam.data.displayName);
	console.log(await Users.findOne({email:ayush.data.email}).exec());
	console.log(await Users.findOne({email:rahul.data.email}).exec());
};

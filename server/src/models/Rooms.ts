/** @format */

import {Document, model, Schema, Types} from 'mongoose';
import * as uuid from 'uuid';
import {MessageDocument, MessageSchema} from './Message';
export class RoomDocument extends Document {
	roomId: string;
	userNamesArr: string[];
	messages: MessageDocument[];
	creationDate: Date;
	updatedDate: Date;
	lastMessage: string;
	userIds: Types.ObjectId[];
	_id: Types.ObjectId;
}
export const roomSchema = new Schema<RoomDocument>({
	roomId: {
		type: Schema.Types.String,
		default: uuid.v4(),
	},
	userNamesArr: {
		type: [Schema.Types.String],
	},
	messages: {
		type: [MessageSchema],
		default: [],
		select: false,
	},
	creationDate: {
		type: Schema.Types.Date,
		default: () => new Date(),
	},
	updatedDate: {
		type: Schema.Types.Date,
		default: new Date(),
	},
	lastMessage: {
		type: Schema.Types.String,
		default: '',
	},
	userIds: {
		type: [Schema.Types.ObjectId],
	},
});
const Rooms = model('Room', roomSchema);
export default Rooms;

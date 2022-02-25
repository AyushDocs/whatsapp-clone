/** @format */
import {Document, model, Schema, Types} from 'mongoose';
export class MessageDocument extends Document {
	content: string;
	sentBy: Types.ObjectId;
	creationDate: Date;
	_id: Types.ObjectId;
}
export const MessageSchema = new Schema<MessageDocument>({
	content: {
		type: String,
		required: false,
	},
	sentBy: {
		type: Schema.Types.ObjectId,
		required: true,
	},
	creationDate: {
		type: Schema.Types.Date,
		required: true,
		default: () => new Date(),
	},
});

const Message = model('Message', MessageSchema);

export default Message;

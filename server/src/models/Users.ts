/** @format */
import {Document, model, Schema, Types} from 'mongoose';
import validations from 'validator';
export class UserDocument extends Document {
	displayName: string;
	email: string;
	photoUrl: string;
	rooms: string[];
	_id: Types.ObjectId;
}
const UsersSchema = new Schema<UserDocument>({
	displayName: {
		type: Schema.Types.String,
		required: true,
	},
	email: {
		type: Schema.Types.String,
		required: true,
		validate: [validations.isEmail, 'Invalid email'],
		unique: true,
	},
	photoUrl: {
		type: Schema.Types.String,
		required: true,
		validate: [validations.isURL, 'Invalid url'],
	},
	rooms: {
		type: [Schema.Types.String],
		select: false,
		default: [],
	},
});

const Users = model('Users', UsersSchema);

export default Users;

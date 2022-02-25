"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDocument = void 0;
const mongoose_1 = require("mongoose");
const validator_1 = __importDefault(require("validator"));
class UserDocument extends mongoose_1.Document {
}
exports.UserDocument = UserDocument;
const UsersSchema = new mongoose_1.Schema({
    displayName: {
        type: mongoose_1.Schema.Types.String,
        required: true,
    },
    email: {
        type: mongoose_1.Schema.Types.String,
        required: true,
        validate: [validator_1.default.isEmail, 'Invalid email'],
        unique: true,
    },
    photoUrl: {
        type: mongoose_1.Schema.Types.String,
        required: true,
        validate: [validator_1.default.isURL, 'Invalid url'],
    },
    rooms: {
        type: [mongoose_1.Schema.Types.String],
        select: false,
        default: [],
    },
});
const Users = (0, mongoose_1.model)('Users', UsersSchema);
exports.default = Users;
//# sourceMappingURL=Users.js.map
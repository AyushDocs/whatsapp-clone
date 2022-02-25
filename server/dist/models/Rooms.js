"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.roomSchema = exports.RoomDocument = void 0;
const mongoose_1 = require("mongoose");
const uuid = __importStar(require("uuid"));
const Message_1 = require("./Message");
class RoomDocument extends mongoose_1.Document {
}
exports.RoomDocument = RoomDocument;
exports.roomSchema = new mongoose_1.Schema({
    roomId: {
        type: mongoose_1.Schema.Types.String,
        default: uuid.v4(),
    },
    userNamesArr: {
        type: [mongoose_1.Schema.Types.String],
    },
    messages: {
        type: [Message_1.MessageSchema],
        default: [],
        select: false,
    },
    creationDate: {
        type: mongoose_1.Schema.Types.Date,
        default: () => new Date(),
    },
    updatedDate: {
        type: mongoose_1.Schema.Types.Date,
        default: new Date(),
    },
    lastMessage: {
        type: mongoose_1.Schema.Types.String,
        default: '',
    },
    userIds: {
        type: [mongoose_1.Schema.Types.ObjectId],
    },
});
const Rooms = (0, mongoose_1.model)('Room', exports.roomSchema);
exports.default = Rooms;
//# sourceMappingURL=Rooms.js.map
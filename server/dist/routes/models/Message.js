"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const uuid_1 = require("uuid");
const MessageSchema = new mongoose_1.Schema({
    sentTo: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        default: (0, uuid_1.v4)(),
    },
    content: {
        type: String,
        required: false,
        default: [],
    },
    sentBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
    },
    creationDate: {
        type: mongoose_1.Schema.Types.Date,
        required: true,
        default: Date.now()
    },
    roomId: {
        type: mongoose_1.Schema.Types.String,
        required: true,
    }
});
const Message = (0, mongoose_1.model)('Message', MessageSchema);
exports.default = Message;
//# sourceMappingURL=Message.js.map
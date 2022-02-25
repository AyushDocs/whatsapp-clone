"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageSchema = exports.MessageDocument = void 0;
const mongoose_1 = require("mongoose");
class MessageDocument extends mongoose_1.Document {
}
exports.MessageDocument = MessageDocument;
exports.MessageSchema = new mongoose_1.Schema({
    content: {
        type: String,
        required: false,
    },
    sentBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
    },
    creationDate: {
        type: mongoose_1.Schema.Types.Date,
        required: true,
        default: () => new Date(),
    },
});
const Message = (0, mongoose_1.model)('Message', exports.MessageSchema);
exports.default = Message;
//# sourceMappingURL=Message.js.map
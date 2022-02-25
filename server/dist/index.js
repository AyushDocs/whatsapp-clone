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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const mongoose_1 = __importDefault(require("mongoose"));
const socket_io_1 = require("socket.io");
const chat_1 = __importDefault(require("./chat"));
const errorHandler_1 = __importDefault(require("./middlewares/errorHandler"));
const logger_1 = __importDefault(require("./middlewares/logger"));
const Rooms_1 = __importDefault(require("./models/Rooms"));
const Users_1 = __importDefault(require("./models/Users"));
const chat = __importStar(require("./controller/chatController"));
const chatRoutes_1 = __importDefault(require("./routes/chatRoutes"));
const app = (0, express_1.default)();
dotenv_1.default.config();
app.use(logger_1.default);
app.use(errorHandler_1.default);
app.use((0, cors_1.default)({ origin: 'http://localhost:3000' }));
app.use(express_1.default.json());
app.use('/api/', chatRoutes_1.default);
const PORT = process.env.PORT || 3001;
const httpServer = http_1.default.createServer(app);
const options = {
    cors: {
        origin: 'http://localhost:3000',
    },
};
const io = new socket_io_1.Server(httpServer, options);
(0, chat_1.default)(io);
(async () => {
    try {
        if (!process.env.DB_URL)
            return;
        mongoose_1.default.connect(process.env.DB_URL, async () => {
            console.log('connected to db successfully');
            await initData();
            httpServer.listen(PORT, () => console.log(`server started on port ${PORT}`));
        });
    }
    catch (error) {
        console.error(error.message);
    }
})();
const initData = async () => {
    await Users_1.default.deleteMany().exec();
    await Rooms_1.default.deleteMany().exec();
    const ayush = await chat.saveUser('ayush@gmail.com', 'Ayush Dubey', 'https://avatars3.githubusercontent.com/u/52709853?s=460&u=f9f8b8d8f9f8b8d8f9f8b8d8f9f8b8d8f9f8b8d8&v=4');
    const rahul = await chat.saveUser('rahul@gmail.com', 'Rahul Shrivastri', 'https://avatars3.githubusercontent.com/u/52709853?s=460&u=f9f8b8d8f9f8b8d8f9f8b8d8f9f8b8d8f9f8b8d7&v=4');
    const shivam = await chat.saveUser('shivam@gmail.com', 'Shivam Tripathi', 'https://avatars3.githubusercontent.com/u/52709853?s=460&u=f9f8b8d8f9f8b8d8f9f8b8d8f9f8b8d8f9f8b8d6&v=4');
    await chat.createRoom(ayush.data.displayName, rahul.data.displayName);
    await chat.createRoom(ayush.data.displayName, shivam.data.displayName);
    console.log(await Users_1.default.findOne({ email: ayush.data.email }).exec());
    console.log(await Users_1.default.findOne({ email: rahul.data.email }).exec());
};
//# sourceMappingURL=index.js.map
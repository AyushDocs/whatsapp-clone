"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (_, res, next) => {
    try {
        next();
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send({
            status: 'error',
            message: err.message,
        });
    }
};
//# sourceMappingURL=errorHandler.js.map
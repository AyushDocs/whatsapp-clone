"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (req, _, next) => {
    console.log(req.url);
    next();
};
//# sourceMappingURL=logger.js.map
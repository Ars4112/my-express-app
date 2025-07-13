"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const users_1 = require("./router/users");
const auth_1 = require("./router/auth");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const PORT = 3001;
app.use((req, res, next) => {
    console.log('CORS Headers:', {
        origin: req.headers.origin,
        method: req.method
    });
    next();
});
const corsOptions = {
    origin: "http://localhost:8081",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    optionsSuccessStatus: 200,
};
app.options("*", (0, cors_1.default)(corsOptions));
app.use((0, cors_1.default)(corsOptions));
app.use(body_parser_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use("/users", users_1.users);
app.use("/auth", auth_1.auth);
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

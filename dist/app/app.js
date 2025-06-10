"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const users_1 = require("../router/users");
const auth_1 = require("../router/auth");
const app = (0, express_1.default)();
const PORT = 3000;
app.use(body_parser_1.default.json());
app.use("/users", users_1.users);
app.use("/auth", auth_1.auth);
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

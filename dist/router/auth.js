"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const authValidator_1 = require("../validators/authValidator");
const authController_1 = require("../controllers/authController");
const express_1 = require("express");
exports.auth = (0, express_1.Router)();
exports.auth.post("/register", authValidator_1.registerValidator, authController_1.authController.register);
exports.auth.post("/login", authValidator_1.loginValidator, authController_1.authController.login);

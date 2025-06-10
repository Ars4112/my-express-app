"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginValidator = exports.registerValidator = void 0;
const express_validator_1 = require("express-validator");
exports.registerValidator = [
    (0, express_validator_1.body)('email')
        .isEmail()
        .withMessage('Provide valid email')
        .normalizeEmail(),
    (0, express_validator_1.body)('password')
        .isLength({ min: 6 })
        .withMessage('Minimum 6 characters')
        .matches(/\d/)
        .withMessage('Must contain a number'),
];
exports.loginValidator = [
// Аналогичные правила для логина
];

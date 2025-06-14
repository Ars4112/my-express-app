"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginValidator = exports.registerValidator = void 0;
const express_validator_1 = require("express-validator");
exports.registerValidator = [
    (0, express_validator_1.body)("first_name")
        .trim()
        .isLength({ min: 3, max: 20 })
        .withMessage("First name length should be between 3 and 20")
        .matches(/^[a-zA-Zа-яА-Я-]*$/)
        .withMessage("First name can only contain Latin or Cyrillic letters and hyphens (-). No numbers, spaces, or special characters are allowed"),
    (0, express_validator_1.body)("last_name")
        .trim()
        .isLength({ min: 3, max: 20 })
        .withMessage("Last name length should be between 3 and 20")
        .matches(/^[a-zA-Zа-яА-Я-]*$/)
        .withMessage("Last name can only contain Latin or Cyrillic letters and hyphens (-). No numbers, spaces, or special characters are allowed"),
    (0, express_validator_1.body)("email")
        .trim()
        .isLength({ min: 10, max: 100 })
        .withMessage("Email length should be between 10 and 100")
        .isEmail()
        .withMessage("Provide valid email")
        .normalizeEmail(),
    (0, express_validator_1.body)("password")
        .trim()
        .isLength({ min: 6, max: 20 })
        .withMessage("Password length should be between 6 and 20")
        .matches(/^[a-zA-Z0-9_-]*$/)
        .withMessage("Password can contain only latin letters, numbers, dashes and underscores"),
];
exports.loginValidator = [
    (0, express_validator_1.body)("email")
        .trim()
        .isLength({ min: 10, max: 100 })
        .withMessage("Email length should be between 10 and 100")
        .isEmail()
        .withMessage("Provide valid email")
        .normalizeEmail(),
    (0, express_validator_1.body)("password")
        .trim()
        .isLength({ min: 6, max: 20 })
        .withMessage("Password length should be between 6 and 20")
        .matches(/^[a-zA-Z0-9_-]*$/)
        .withMessage("Password can contain only latin letters, numbers, dashes and underscores"),
];

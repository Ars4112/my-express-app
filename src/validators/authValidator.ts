import { body } from 'express-validator';

export const registerValidator = [
    body('email')
        .isEmail()
        .withMessage('Provide valid email')
        .normalizeEmail(),
        
    body('password')
        .isLength({ min: 6 })
        .withMessage('Minimum 6 characters')
        .matches(/\d/)
        .withMessage('Must contain a number'),
];

export const loginValidator = [
    // Аналогичные правила для логина
];
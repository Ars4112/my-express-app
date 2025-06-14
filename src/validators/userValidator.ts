import { body } from "express-validator";

export const userUpdateValidator = [
	body("first_name")
		.trim()
		.isLength({ min: 3, max: 20 })
		.withMessage("First name length should be between 3 and 20")
		.matches(/^[a-zA-Zа-яА-Я-]*$/)
		.withMessage(
			"First name can only contain Latin or Cyrillic letters and hyphens (-). No numbers, spaces, or special characters are allowed"
		),
	body("last_name")
		.trim()
		.isLength({ min: 3, max: 20 })
		.withMessage("Last name length should be between 3 and 20")
		.matches(/^[a-zA-Zа-яА-Я-]*$/)
		.withMessage(
			"Last name can only contain Latin or Cyrillic letters and hyphens (-). No numbers, spaces, or special characters are allowed"
		),
	body("email")
		.trim()
		.isLength({ min: 10, max: 100 })
		.withMessage("Email length should be between 10 and 100")
		.isEmail()
		.withMessage("Provide valid email")
		.normalizeEmail(),
];

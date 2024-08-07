import express from "express";
import { Register,Login,Logout } from "../controllers/auth.js";
import Validate from "../middlewares/validate.js";
import { check } from "express-validator";

const router = express.Router();

router.post(
    "/register",
    check("email")
        .isEmail()
        .withMessage("Enter a valid email address")
        .normalizeEmail(),
    check("fullName")
        .not()
        .isEmpty()
        .withMessage("Your full name is required")
        .trim()
        .escape(),
    check("password")
        .notEmpty()
        .isLength({ min: 8 })
        .withMessage("Must be at least 8 chars long"),
    Validate,
    Register
);
router.post(
    "/login",
    check("email")
        .isEmail()
        .withMessage("Enter a valid email address")
        .normalizeEmail(),
    check("password").not().isEmpty(),
    Validate,
    Login
);
router.get('/logout', Logout);

export default router;

import express from "express";
import {
    register,
    verifyEmail,
    authenticate,
    revokeToken,
    forgotPassword,
    validateResetToken,
    resetPassword,
    refreshToken,
    update,
    _delete,
    getAll,
    getById
} from "../../../controllers/userControllers/user.Controller.js"
import {
    registerValidation,
    authenticateValidation,
    forgotPasswordValidation,
    resetPasswordValidation,
    updateValidation
} from "../../../validations/userValidation/user.Validation.js"
import authorize from "../../../middlewares/authorize.js"
const router = express.Router();


router.post('/register', registerValidation, register);
router.post('/verify-email', verifyEmail);
router.post('/authenticate', authenticateValidation, authenticate);
router.post('/revoke-token', authorize(), revokeToken);
router.post('/forgot-password', forgotPasswordValidation, forgotPassword);
router.post('/validate-reset-token', validateResetToken);
router.post('/reset-password', resetPasswordValidation, resetPassword);
router.post('/refresh-token', refreshToken);
router.put('/:id', authorize(), updateValidation, update);
router.delete('/:id', authorize(), _delete);
router.get('/', authorize("Admin"), getAll);
router.get('/:id', authorize(), getById);

export default router
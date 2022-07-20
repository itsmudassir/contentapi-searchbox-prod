import jwt from "express-jwt";
import refreshTokensModel from "../models/userModel/refreshToken.Model.js";
import userModel from "../models/userModel/user.Model.js";
export default authorize;

function authorize(roles = []) {
    try {
        // roles param can be a single role string (e.g. Role.User or 'User') 
        // or an array of roles (e.g. [Role.Admin, Role.User] or ['Admin', 'User'])

        if (typeof roles === "string") {
            roles = [roles];
        }
        const secret = process.env.JWT_SECRET_KEY;
        return [
            // authenticate JWT token and attach user to request object (req.user)
            jwt({ secret, algorithms: ['HS256'] }),
            // authorize based on user role
            async (req, res, next) => {
                const user = await userModel.findById(req.user.id);
                const refreshTokens = await refreshTokensModel.find({ userId: user.id });
                if (!user || (roles.length && !roles.includes(user.role))) {
                    // account no longer exists or role not authorized
                    return res.status(401).json({ message: 'Unauthorized 1' });
                }
                // authentication and authorization successful
                req.user.role = user.role;
                req.user.ownsToken = token => !!refreshTokens.find(x => x.token === token);
                next();

            }
        ]
    } catch (err) {
        console.log(err)
    }
}


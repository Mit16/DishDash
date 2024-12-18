import jwt from "jsonwebtoken";
import extractToken from "../utils/tokenHandler.js";

export const authMiddleware = (roles = []) => {
  return (req, res, next) => {
    const token = extractToken(req.headers);

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized: No token provided" });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;

      // Check role-based access
      if (roles.length && !roles.includes(decoded.role)) {
        return res
          .status(403)
          .json({ success: false, message: "Forbidden: Access denied" });
      }

      next();
    } catch (err) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized: Invalid token" });
    }
  };
};

export default authMiddleware;

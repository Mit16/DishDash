import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization || req.headers.Authorization;

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized: No token provided" });
  }

  try {
    // Expect "Bearer <token>" format
    const parts = token.split(" ");
    if (parts.length === 2 && parts[0] === "Bearer") {
      const decoded = jwt.verify(parts[1], process.env.JWT_SECRET);

      // Attach user details to request object
      req.user = { _id: decoded.id };

      next(); // Proceed to the next middleware or route handler
    } else {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Invalid token format",
      });
    }
  } catch (error) {
    console.error("Error in token verification:", error);
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized: Invalid token" });
  }
};

export default authMiddleware;

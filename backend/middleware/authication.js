import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  try {
    // Look for the token in both 'Token' and 'Authorization' headers
    const token =
      req.headers.token ||
      req.headers.Token ||
      (req.headers.authorization && req.headers.authorization.split(" ")[1]);

    if (!token) {
      return res.status(401).json({ success: false, message: "Not Authorized, Login Again" });
    }

    // Verify the token
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = token_decode.id;
    next();
  } catch (error) {
    console.error("Authorization Error:", error.message);
    res.status(401).json({ success: false, message: "Invalid Token" });
  }
};

export default authMiddleware;

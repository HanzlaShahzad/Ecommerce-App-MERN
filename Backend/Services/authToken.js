import JWT from "jsonwebtoken";

export function AuthToken(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "No token provided" });
    }

    // ✅ FIRST get token
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Token missing" });
    }

    // ✅ VERIFY token
    const decoded = JWT.verify(token, "omg5papag");

    console.log("DECODED:", decoded); // debug

    req.user = decoded;

    next();
  } catch (error) {
    console.log("Auth Error:", error.message);
    return res.status(401).json({ message: "Invalid token" });
  }
}

export function isAdmin(req, res, next) {
  if (!req.user) {
    return res.status(401).json({ message: "User not authenticated" });
  }

  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access Denied (Admin only)" });
  }

  next();
}
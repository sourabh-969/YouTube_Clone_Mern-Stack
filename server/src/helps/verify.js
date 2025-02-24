const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  //console.log("verifyToken middleware executed");
  const token = req.cookies.accessToken;
  console.log("Token from cookies:", token);
  if (!token) {
    //console.log("No token found in cookies");
    return res.status(401).json({ error: "Authentication required. Please log in." });
  }

  jwt.verify(token, process.env.SECRET_JWT, (error, decoded) => {
    if (error) {
      //console.error("Token Verification Error:", error);
      return res.status(403).json({ error: "Invalid or expired token. Please log in again." });
    }

    // Attach the decoded channel info. to the req.object
    //console.log("Decoded Token:", decoded);
    req.channel = decoded;
    next();
  });
};

module.exports = verifyToken;
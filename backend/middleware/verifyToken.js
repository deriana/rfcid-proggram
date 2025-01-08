const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(403).send("Access denied. No token provided.");
  }

  try {
    const decoded = jwt.verify(token.split(" ")[1], process.env.SECRET_KEY);
    req.user = decoded; 
    next(); 
  } catch (error) {
    // Jika token invalid, kirimkan status error
    return res.status(400).send("Invalid token.");
  }
};

module.exports = verifyToken;

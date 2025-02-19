const jwt = require("jsonwebtoken");
const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(404).json("You are not authenticated");
  }

  jwt.verify(token, process.env.SECRET, async (err, data) => {
    if (err) {
      return res.status(403).json("Invalid token");
    }

    req.userId = data._id;
    next();
  });
};

module.exports = verifyToken;

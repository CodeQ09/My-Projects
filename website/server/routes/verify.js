const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.body.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT, (err, user) => {
      if (err) {
        return res
          .status(403)
          .send({ auth: false, message: "Failed to authenticate token." });
        req.user = user;
        next();
      }
    });
  } else {
    return res.status(401).json("You are not authenticated");
  }
};

const verifyTokenAndAuth = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not allowed to do that");
    }
  });
};

const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not allowed to do that");
    }
  });
};

module.exports = { verifyToken, verifyTokenAndAuth, verifyTokenAndAdmin };

const jwt = require("jsonwebtoken");

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  //check json web if exists and then verify
  if (token) {
    jwt.verify(token, "super secret", (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect("/auth/login");
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    res.redirect("/auth/login");
  }
};

//auth middleware



module.exports = requireAuth;

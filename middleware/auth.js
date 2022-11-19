// Middleware is function that will have all the infomration for requestion an object and responding to object and move to the next
// middlware func. in the app. req-resp cycle.

const jwt = require("jsonwebtoken");

const config = process.env;

const verifyToken = (req, res, next) => {
          const token = req.body.token || req.query.token || req.headers["x-access-token"];
          // console.log(token);

          if(!token) {
                    // console.log(token);
                    return res.status(403).send("A token is required for authentication");
          }

          try{
                    const decoded = jwt.verify(token, config.TOKEN_KEY);
                    req.user = decoded;
          }
          catch (err) {
                    return res.status(401).send("Invalid token");
          }
          return next();
};

module.exports = verifyToken;

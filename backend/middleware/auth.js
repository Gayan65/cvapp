import jwt from "jsonwebtoken";
import "dotenv/config";

export const auth = function (req, res, next) {
  if (req.headers.authorization) {
    const token = req.headers.authorization;
    if (token == null) res.sendStatus(401);
    jwt.verify(token, process.env.JWT_KEY, (err, payLoad) => {
      if (err) res.sendStatus(403);
      req.user = payLoad;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

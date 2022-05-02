"use strict";

const jwt = require("jsonwebtoken");

// const authorization = async (req, res, next) => {
//     const {authHeader} = req.headers;

//     const token = authHeader && authHeader.split(' ')[1];
//     if (token == null) return res.sendStatus(401);
//     console.log(token);

//         user = jwt.verify(token, secret, (err, user) => {
//             console.log(err);
//             if (err) return res.sendstatus(403)
//             req.user = user;
//             next();
//         });
// };

function createVerifyToken(secret) {
  console.log(secret);
  function verifyToken(req, reply, next) {
    const { authorization } = req.headers;
    let token;
    try {
      token = authorization && authorization.split(" ")[1];
      console.log(token);
      if (!token) return reply.code(401).send();
    } catch (e) {
      throw new Error("wrong auth header");
    }

    jwt.verify(token, secret, (err, user) => {
      // console.log(err)
      if (err) return reply.code(403).send();
      req.user = user;
      console.log("user", user);
    });
    next();
  }
  return { verifyToken };
}

function isAdmin(user) {
  return user.role === "ADMIN";
}

function isAuthor(user, authorId) {
  return user.id === authorId;
}

module.exports = {
  createVerifyToken,
  isAdmin,
  isAuthor,
};

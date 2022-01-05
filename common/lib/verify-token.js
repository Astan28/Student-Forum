'use strict'

const jwt = require('jsonwebtoken');



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

function createVerifyToken (secret) {

  console.log(secret)
    function verifyToken(req, reply, next) {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        if (token == null) return reply.code(401).send();
      
        jwt.verify(token, secret, (err, user) => {
          // console.log(err)
          if (err) return reply.code(403).send();
          req.user = user
          console.log('user',  user)
          next()
        })
      }
      return {verifyToken}
}


 function checkRole  (req, reply, next) {
    const {user} = req;
    console.log(req.error)
    
    if (user.role === 'USER' && req.error === 'id is not correct')  return reply.code(403).send();
    next();
}

function checkId  (req, reply, next) {
  const {user} = req;
  console.log('zalogowany uzytkownik: ',  user)
  if (!user.id === req.params.id) req.error = 'id is not correct';
  next(); 
}

module.exports = {
    createVerifyToken,
    checkRole,
    checkId
}
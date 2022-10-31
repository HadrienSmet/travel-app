const jwt = require('jsonwebtoken');
require('dotenv').config();

//Try catch allowing us to certified the user's authentification
//Returns the id authentified by JWT Token
//If succes the API goes to the next middleware
module.exports = (req, res, next) => {
   try {
    console.log("mddlware.auth l:9 req.headers: " +  JSON.stringify(req.headers));
    console.log("mddlware.auth l:10 authorization from the headers: " + req.headers.authorization);
       const token = req.headers.authorization.split(' ')[1];
       const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
       const userId = decodedToken.userId;
       req.auth = {
           userId: userId
       };
       console.log("mddlware.auth l:17 req.auth: " +   JSON.stringify(req.auth) );
	next();
   } catch(error) {
       res.status(401).json({ error });
   }
};
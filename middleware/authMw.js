const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader= req.header('Authorization');
 
  if (!authHeader) {
      //Unauthorized response 
      return   res.status(401).json({
                status_code: 401,
                 data: null,
                message: "You should register first",
              });;
    }
  
    try {
    const token = authHeader && authHeader.split(' ')[1] // split remove (pearer from token ) , [1]= علشان يبدا من بعد المسافه بتاعت pearer
   
    const decoded = jwt.verify(token, process.env.secretKey);
    req._id = decoded._id;
    req.number= decoded.number
    next();
  } catch (err) {
    return res.status(401).json({ message: "you aren't authorized to access this resources"}); // expire , token not valid
  }
};
require('dotenv').config()

//for token
var jwt = require("jsonwebtoken");

//import helper class
const globalResponse = require('../helper/globalResponse');

authenticated = function(req,res,next){
	if(!req.headers.authorization){
		return res.status(403).send(globalResponse("CODE401",false,"you request don't have Autorization header",'access',null));
	}
	var token = req.headers.authorization;
	
	if(token!=null){
		jwt.verify(token,process.env.JWT_SECRETKEY, (err,decoded)=>{
			
			if(err){
			  //console.log(err);
			  return res.status(401).send(globalResponse("CODE401",false,"token invalid",'access',null));
			}

			next();

		  });
	}else{
		return res.status(401).send(globalResponse("CODE401",false,"token null",'access',null));
	}

	
	
};

module.exports = authenticated;
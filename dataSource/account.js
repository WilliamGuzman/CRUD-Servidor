require('dotenv').config()

var jwt = require("jsonwebtoken");

//import helper class
const globalResponse = require('../helper/globalResponse');

//import models
const product = require("../database/models/product");

const productDataSource = {

    //list all
    async  auth(UserName,Password){
        try{
            //bad practique, not time
            if(!(UserName===""+process.env.User && Password===""+process.env.Password)){
                return globalResponse("CODE401",false,"Credentials invalid");
            }

            var token =  jwt.sign(
                {
                    UserName:UserName
                },
              process.env.JWT_SECRETKEY,
                 { expiresIn: '24h' }
              );

            return globalResponse("CODE2000",true,"credentials valid",'token',token);
            

        }catch(error){
            console.log(error);
            throw error;
        }
    }
}

module.exports = productDataSource;
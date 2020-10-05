//config router
var express = require('express');
var router = express.Router();

//middleware's
var authorization = require("./middlewares/authorizationJWT");

//data sources
var productDataSource = require('./dataSource/product');
var accountDataSource = require('./dataSource/account');

//import helper class
const globalResponse = require('./helper/globalResponse');

// Home page route.
router.get('/', function (req, res) {
  res.json({ ApiName: 'CRUD Practice', EndsPoint: '/oauth,/product' })
});

//#Security
router.post('/oauth',function(req,res){

  //anotations body parameters
  if(req.body.UserName==null || req.body.Password==null){
    return res.status(400).send(globalResponse("CODE400",false,"body paremeters invalid","access",null))
  }

  //generate token
  accountDataSource.auth(req.body.UserName,req.body.Password).then((result)=>{
    return res.status(200).send(result);
  }).catch((error)=>{
    console.log(error);
    return res.status(500).send(error);
  });
});


// Product all
router.get('/product',authorization,(req,res)=>{
  productDataSource.allProduct().then((result)=>{
    return res.status(200).send(result);
  }).catch((error)=>{
    console.log(error);
    return res.status(500).send(error);
  });
});

//product create
router.post('/product',authorization,function(req,res){
  productDataSource.createProduct(req.body.Nombre,req.body.Cantidad,req.body.Precio,req.body.Descripcion).then((result)=>{
    return res.status(200).send(result);
  }).catch((error)=>{
    console.log(error);
    return res.status(500).send(error);
  });
});

//product edit
router.put('/product/:id',authorization,function(req,res){
  productDataSource.editProduct(req.params.id,req.body.Nombre,req.body.Cantidad,req.body.Precio,req.body.Descripcion).then((result)=>{
    return res.status(200).send(result);
  }).catch((error)=>{
    console.log(error);
    return res.status(500).send(error);
  });
});

//product edit
router.delete('/product/:id',authorization,function(req,res){
  productDataSource.deleteProduct(req.params.id).then((result)=>{
    return res.status(200).send(result);
  }).catch((error)=>{
    console.log(error);
    return res.status(500).send(error);
  });
});


module.exports = router;
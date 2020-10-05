//import helper class
const globalResponse = require('../helper/globalResponse');

//import models
const product = require("../database/models/product");

const productDataSource = {

    //list all
    async allProduct(){
        try{
            // get all list
            var bdProduct = await product.fetchAll();

            return bdProduct.serialize()!=null?globalResponse("CODE1000",true,"Product all fetch",'product',bdProduct.serialize()):globalResponse("CODE001X",false,"failed action",'product',null);
        }catch(error){
            console.log(error);
            throw error;
        }
    },
    //created
    async createProduct(Nombre,Cantidad,Precio,Descripcion){
        try{
            //new instance
            let newProduct = new product({
                Nombre:Nombre,
                Cantidad:Cantidad,
                Precio:Precio,
                Descripcion:Descripcion
            });
            //save changes
            var bdProduct = await newProduct.save(null,{method:'insert'});
            
            return bdProduct.serialize()!=null?globalResponse("CODE1001",true,"Product created correctly",'product',bdProduct.serialize()):globalResponse("CODE001X",false,"failed action",'product',null);
        }catch(error){
            console.log(error);
            throw error;
        }
    },
    //Edit
    async editProduct(id,Nombre,Cantidad,Precio,Descripcion){
        try{
            //search product
            var bdProduct = await product.where({id:id}).fetch();
            if(bdProduct==null) return globalResponse("CODE404",false,"id parameter it does not correspond to product");

           //map new data 
           bdProduct.set('Nombre',Nombre);
           bdProduct.set('Cantidad',Cantidad);
           bdProduct.set('Precio',Precio);
           bdProduct.set('Descripcion',Descripcion);

           //save changes/update
           var dataSaveChange = await bdProduct.save();

            return bdProduct.serialize()!=null?globalResponse("CODE1002",true,"Product created correctly",'product',bdProduct.serialize()):globalResponse("CODE001X",false,"failed action",'product',null);
        }catch(error){
            console.log(error);
            throw error;
        }
    },
    //Delete
    async deleteProduct(id){
        try{
            //search product
            var bdProduct = await product.where({id:id}).fetch();
            if(bdProduct==null) return globalResponse("CODE404",false,"id parameter it does not correspond to product");

            //delete
            await bdProduct.destroy();

            return globalResponse("CODE1004",true,"Product  deleted success");
        }catch(error){
            console.log(error);
            throw error;
        }
    }
}

module.exports = productDataSource;
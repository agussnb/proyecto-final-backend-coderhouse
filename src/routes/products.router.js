import express from 'express'
const router = express.Router()
//Impo de ProductManager
//import ProductManager from '../dao/FileSystem/ProductManager.js'
import ProductManager from '../dao/DB/ProductManager.js'
import CartManager from '../dao/DB/CartManager.js'
const productManager = new ProductManager
const cartManager = new CartManager 

import { getLogger } from '../config/logger.js';

const logger = getLogger();


//RUTAS /api/products

// Listar

router.get('/', async(req,res)=>{
    const products = await productManager.getProducts()

    if (!Array.isArray(products)) {
        // Si products no es un array, envía un error en la respuesta
        return res.status(500).send('Error en el servidor');
    }
    res.render('index',{products})
    logger.info(products)
})

// Buscar por ID

router.get('/:pid', async(req, res)=>{
    const productId = req.params.pid
    try{
        const user = req.session.user;
        const product = await productManager.getProductById(productId)
        if(!product){
            return res.status(404).send('Producto no encontrado')
        }
        res.render('product',{product, user})
      
    }catch(error){
        res.status(500).send('Error en el servidor');
    }
})

//  Crear nuevo producto

router.post('/',(req,res)=>{
    let product = req.body
   // const { title, description, price, thumbnail, code, stock } = req.body;

   if(!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock){
    return res.status(400).send({status:"Error",msg:"Valores incompletos! Revisar datos de entrada"})
   }
   productManager.addProduct(product)
   res.send({status:"Succes",msg:"Producto creado"})
})

//  Actualizar producto

router.put('/:pid',async(req,res)=>{
    let productId = req.params.pid
    let productUpdate = req.body;
    if(!productUpdate.title || !productUpdate.description || !productUpdate.price || !productUpdate.thumbnail || !productUpdate.code || !productUpdate.stock){
        return res.status(400).send({status:"Error",msg:"Valores incompletos! Revisar datos de entrada"})
       }
    try{
        const product = await productManager.getProductById(productId);
        if(!product){
            return res.status(404).send('Producto no encontrado')
        }
    }catch(error){
        res.status(500).send('Error en el servidor')
    }
    await productManager.updateProduct(productId,productUpdate)

    res.send({status:"Success",msg:"Producto actualizado"})
})

//  Borrar producto

router.delete('/:pid',async(req,res)=>{
    let productId = parseInt(req.params.pid)
    try{
        const product = await productManager.getProductById(productId)
        if(!product){
            return res.status(404).send('Producto no encontrado')
        }
    }catch(error){
        res.status(500).send('Error en el servidor')
    }
    await productManager.deleteProduct(productId)

    res.send({status:"Success",msg:"Producto eliminado"})
})

export default router;
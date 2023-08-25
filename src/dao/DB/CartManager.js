import { cartsModel } from "./models/carts.model.js";
import { productsModel } from "./models/products.model.js";
import { getLogger } from '../../config/logger.js';
import mongoose from "mongoose";
const logger = getLogger();
import UserManager from "./UserManager.js";
const userManager = new UserManager()


class CartManager {
  constructor(){
   
  }

  async getCartById(cartId) {
    try {
        const cart = await cartsModel.findById(cartId).lean().exec();
        return cart;
    } catch (error) {
        logger.error(error);
        throw new Error('Error al obtener el carrito');
    }
}

  
  async addCart(userId, products) {
    try {
      const newCart = await cartsModel.create({
        userId: userId,
        products: products,
      });
      logger.info('Carrito creado correctamente');
      return newCart;
    } catch (error) {
      logger.error('Error al crear el carrito:'+error);
      throw error;
    }
  }
  
  

  
  async addProductToCartById(cartId, productId, quantity = 1, userId) {
    try {
      if (!userId) {
        throw new Error('ID de usuario no proporcionado');
      }
  
      const cart = await cartsModel.findOne({ _id: cartId, userId: userId });
  
      if (!cart) {
        throw new Error(`No se encontró el carrito para el usuario con id: ${userId}`);
      }
  
      const product = await productsModel.findById(productId).lean();
      if (!product) {
        throw new Error(`No se encontró el producto con id: ${productId}`);
      }
  
      const { price, title, thumbnail, _id, stock } = product;
  
      const existingProduct = cart.products.find(p => p.product.toString() === productId);
  
      if (existingProduct) {
        // Verificar si la cantidad a agregar supera el stock disponible
        if (existingProduct.quantity + quantity > stock) {
          throw new Error('No se puede superar el stock del producto al agregar al carrito.');
        }
  
        existingProduct.quantity += quantity;
      } else {
        // Verificar si la cantidad a agregar supera el stock disponible
        if (quantity > stock) {
          throw new Error('No se puede superar el stock del producto al agregar al carrito.');
        }
  
        cart.products.push({
          product: productId,
          quantity: quantity,
          price: price,
          title: title,
          thumbnail: thumbnail,
          _id: _id
        });
      }
  
      await cart.save();
      return cart;
    } catch (error) {
      logger.error('Error al agregar producto al carrito:', error);
      throw error;
    }
  }
  
  
  
  async getProductsFromCarts() {
    try {
      const cartProducts = await cartsModel.find().lean()
      return cartProducts.map(cart => {
        return {
          cart: cart,
          products: cart.products.map(product => {
            return {
              id: product._id,
              title: product.title.title,
              price: product.title.price,
              quantity: product.quantity
            };
          })
        };
      });
    } catch (error) {
      logger.error(error);
    }
  }
  
  async deleteCart(cartId){
    const cart = await cartsModel.findOneAndDelete({ id: cartId });
    if (!cart) {
      throw new Error(`No se encontró el carrito con id: ${cartId}`);
    }
    return `Carrito con id ${cartId} eliminado.`;
  }

  async removeProductFromCart(cartId, productId) {
    const cart = await cartsModel.findById(cartId);
    if (!cart) {
      throw new Error(`No se encontró el carrito con id: ${cartId}`);
    }
  
    const productIndex = cart.products.findIndex(p => p._id.toString() === productId.toString());
    if (productIndex === -1) {
      throw new Error(`No se encontró el producto con id ${productId} en el carrito`);
    }
  
    const productToDelete = cart.products[productIndex];
    cart.products.splice(productIndex, 1);
    await cart.save();
    
    const updatedCart = await cartsModel.findByIdAndUpdate(cartId, { $pull: { products: { _id: productToDelete._id } } }, { new: true });
    if (!updatedCart) {
      throw new Error(`No se pudo eliminar el producto con id ${productId} del carrito con id ${cartId}`);
    }
    
    return updatedCart;
}

async removeAllProductsFromCart(cartId) {
  const cart = await cartsModel.findById(cartId);
  if (!cart) {
    throw new Error(`No se encontró el carrito con id: ${cartId}`);
  }

  cart.products = [];
  await cart.save();
  await userManager.eraseProductsFromUserCart(cart.userId)
  return cart;

}


  
}


export default CartManager;

import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataFilePath = path.join(__dirname, '..', '..', 'data.json');

class CartManager {
  constructor(){
    this.carts = [];
    if (fs.existsSync('src/carritos.json')) {
      const carritos = JSON.parse(fs.readFileSync('src/carritos.json'));
      this.carts = carritos.filter(c => c.id !== 0);
    }
    if (this.carts.length > 0) {
      this.cartId = this.carts[this.carts.length - 1].id + 1;
    } else {
      this.cartId = 1;
    }
  }

  addCart(){
    const id = this.cartId++;
    const newCart = {
      id: id,
      products: []
    };
    this.carts.push(newCart);
    fs.writeFileSync('src/carritos.json', JSON.stringify(this.carts));
    return newCart;
  }
  
  addProductToCartById(cartId, productId, quantity = 1){
    const cartIndex = this.carts.findIndex(cart => cart.id === cartId);
    if (cartIndex < 0) {
      throw new Error(`No se encontró el carrito con id: ${cartId}`);
    }
    const cart = this.carts[cartIndex];

    // Leer el archivo data.json y buscar el producto por ID
    const products = JSON.parse(fs.readFileSync(dataFilePath));
    const product = products.find(p => p.id === productId);
    if (!product) {
      throw new Error(`No se encontró el producto con id: ${productId}`);
    }
    const price = product.price
    const productIndex = cart.products.findIndex(p => p.product === productId);
    if (productIndex !== -1) {
      cart.products[productIndex].quantity += quantity;
    } else {
      cart.products.push({
        product: productId,
        quantity: quantity,
        price:price,
      });
    }

    fs.writeFileSync('src/carritos.json', JSON.stringify(this.carts));
    return cart;
  }

  async getProductsFromCarts() {
    try {
      const data = await fs.promises.readFile(dataFilePath, 'utf-8');
      const products = JSON.parse(data);
  
      const cartData = await fs.promises.readFile('src/carritos.json','utf-8');
      const carts = JSON.parse(cartData);
  
      const cartProducts = [];
  
      carts.forEach(cart => {
        const productsInCart = [];
        cart.products.forEach(product => {
          const productData = products.find(p => p.id === product.product);
          if (productData) {
            productsInCart.push({
              id: product.product,
              quantity: product.quantity
            });
          }
        });
  
        cartProducts.push({
          cart: cart,
          products: productsInCart
        });
      });
  
      return cartProducts;
  
    } catch (error) {
      console.error(error);
    }
  }
  

  deleteCart(cartId){
    const cartIndex = this.carts.findIndex(cart => cart.id === cartId);
    if (cartIndex < 0) {
      throw new Error(`No se encontró el carrito con id: ${cartId}`);
    }
    this.carts.splice(cartIndex, 1);
    fs.writeFileSync('src/carritos.json', JSON.stringify(this.carts));
    return `Carrito con id ${cartId} eliminado.`;
  }
}

export default CartManager

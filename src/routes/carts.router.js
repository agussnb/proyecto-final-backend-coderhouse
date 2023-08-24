import {Router} from 'express'
const router = Router()
//import CartManager from '../dao/FileSystem/CartManager.js';
import CartManager from '../dao/DB/CartManager.js'
import { fileURLToPath } from 'url';
import UserDTO from '../dao/DTOs/users.dto.js';
import ProductManager from '../dao/DB/ProductManager.js';
import UserManager from '../dao/DB/UserManager.js';

import { getLogger } from '../config/logger.js';

const logger = getLogger();

const __filename = fileURLToPath(import.meta.url);

//const dataFilePath = path.join(__dirname, '..', 'data.json');
const cartManager = new CartManager()
const productManager = new ProductManager()
const userManager = new UserManager()

let buyedProducts = []

//Ruta GET para visualizar un carrito por su ID
router.get('/:cid', async (req, res) => {
  const cartId = req.params.cid;

  try {
    const cartProducts = await cartManager.getProductsFromCarts();
    const cartProduct = cartProducts.find(cp => cp.cart._id.toString() === cartId);
    if (!cartProduct) {
      return res.status(404).json({ error: 'Carrito no encontrado' });
    }
    const simplifiedCartProduct = cartProduct.cart.products.map(p => {
      return {
        ProductId: p._id,
        ProductQuantity: p.quantity,
        ProductPrice: p.price,
        ProductTitle: p.title,
        ProductImage: p.thumbnail
      }
    });
    res.render('carts',{
      cartId:cartId,
      products:simplifiedCartProduct
    })

  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: 'Error al buscar los productos del carrito' });
  }
});


//Verificar si el usuario tiene carrito
router.get('/:cid/users/:uid', async (req, res) => {
  try {
      const uid = req.params.uid;
      const cid = req.params.cid;

      // Obtener el carrito por su ID
      const cart = await cartManager.getCartById(cid);
      // Verificar si el carrito pertenece al usuario
      if (!cart || cart.userId.toString() !== uid) {
          return res.status(404).json({ error: 'Carrito no encontrado para el usuario' });
      }

      res.status(200).json({ msg:`Carrito del usuario ${uid} encontrado`, cart})
  } catch (error) {
      res.status(500).json({ error: `Error al obtener el carrito del usuario ${uid}`});
  }
});


//Ruta POST para agregar un carrito
router.post('/',  async(req, res) => {
  const { userId, products } = req.body;
  try {
    const newCart = await cartManager.addCart(userId, products); // Esperar a que la promesa se resuelva
    logger.info(newCart);

    const user = await userManager.getUserDataById(newCart.userId);
    if (!user) {
      return res.status(404).send({ status: "Error", msg: "Usuario no encontrado" });
    }

    user.cartId = newCart._id

    await user.save()

    res.status(200).json(newCart);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
  
});

//Ruta POST para agregar un producto al carrito por ID del producto
router.post('/:cid/product/:pid', async (req, res) => {
  const cid = req.params.cid;
  const pid = req.params.pid;
  const quantity = parseInt(req.body.quantity);

  if (!quantity) {
    return res.status(400).send({ status: 'Error', msg: 'Ingrese cantidad' });
  }
  try {
    const cart = await cartManager.getCartById(cid);
    if (!cart) {
      return res.status(404).send({ status: "Error", msg: "Carrito no encontrado" });
    }

    const product = await productManager.getProductById(pid);

    if (!product) {
      throw new Error('Producto no encontrado');
    }

    cartManager.addProductToCartById(cid, pid, quantity, cart.userId);

    const user = await userManager.getUserDataById(cart.userId);
    if (!user) {
      return res.status(404).send({ status: "Error", msg: "Usuario no encontrado" });
    }

    user.cart.products.push({
      productTitle: product.title,
      productId: pid,
      productPrice: product.price,
      quantity: quantity
    });

    await user.save();

    res.status(201).json(cart);

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


router.delete('/:cid', (req, res) => {
  const cartId = parseInt(req.params.cid);
  try {
    const deletedCart = cartManager.deleteCart(cartId);
    res.json({ message: `Carrito con ID ${cartId} borrado exitosamente`, cart: deletedCart });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

router.delete('/:id/product/:id_producto', async (req, res) => {
  try {
    const { id, id_producto } = req.params;
    const cart = await cartManager.removeProductFromCart(id, id_producto);
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.delete('/:cid/products', async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await cartManager.removeAllProductsFromCart(cid);
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});




export default router;
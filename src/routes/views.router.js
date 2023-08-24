import express from "express";
import ProductManager from "../dao/DB/ProductManager.js";

const router = express.Router();
const productManager = new ProductManager();

// Ruta para ordernar productos por categoría
router.get('/sort-by-category', async (req, res) => {
    try {
        const sortedProducts = await productManager.sortProductsByCategory();
        res.json(sortedProducts);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error obteniendo y ordenando los productos por categoría' });
    }
});

// Ruta para filtrar por categoría desde la URL por params
router.get('/:category', async (req, res) => {
    try {
        const categoryParam = req.params.category; 

        const validCategories = {
            Pistol: 'Pistol',
            Rifle: 'Rifle',
            Shotgun: 'Shotgun',
            HuntingRifle: 'Hunting Rifle',
            SubmachineGun: 'Submachine gun'
        };

        // Verifica si la categoría proporcionada en los parámetros es válida
        if (!validCategories.hasOwnProperty(categoryParam)) {
            return res.status(400).send('Categoría no válida');
        }

        const sortedProducts = await productManager.sortProductsByCategory();

        const productsByCategory = sortedProducts.find(category => category._id === validCategories[categoryParam]);

        const user = req.session.user;
        res.render('index', { products: productsByCategory.products, user });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener y mostrar los productos');
    }
});

// Ruta para obtener todos los productos
router.get('/',async(req,res)=>{
    try {
        // Uso el método getProducts de la clase ProductManager
        const products = await productManager.getProducts();
        // Obtengo al usuario
        const user = req.session.user;
        // Renderizo en index los productos y el usuario
        res.render('index', { products, user });
    } catch (error) {
        console.log(error);
        res.status(500).send('Error obteniendo los productos');
    }
});

// Rutas de cookies aquí (si las tienes)

export default router;

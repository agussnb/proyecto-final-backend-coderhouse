import Stripe from 'stripe';

import CartManager from '../dao/DB/CartManager.js';

const stripeSecretKey = process.env.STRIPE_APP_SECRET_KEY

const stripe = new Stripe(stripeSecretKey);

export const createSession = async (req, res) => {
    try {
        const cartManager = new CartManager();
        const cartId = req.query.cartId;
        
        // Obtén el carrito del usuario
        const cartProducts = await cartManager.getProductsFromCarts();
        const cartProduct = cartProducts.find(cp => cp.cart._id.toString() === cartId);
        
        if (!cartProduct) {
            return res.status(404).json({ error: 'Carrito no encontrado' });
        }
        
        const simplifiedCartProduct = cartProduct.cart.products.map(p => {
            return {
                ProductQuantity: p.quantity,
                ProductPrice: p.price,
                ProductTitle: p.title,
            };
        });

        // Estructura los datos para las líneas de items de Stripe
        const lineItems = simplifiedCartProduct.map(product => ({
            price_data: {
                product_data: {
                    name: product.ProductTitle,
                },
                currency: "usd",
                unit_amount: product.ProductPrice * 100,
            },
            quantity: product.ProductQuantity,
        }));

        const session = await stripe.checkout.sessions.create({
            line_items: lineItems,
            mode: "payment",
            success_url: "http://localhost:8080/api/payments/success?session_id={CHECKOUT_SESSION_ID}",
            cancel_url: "http://localhost:8080/api/payments/cancel",
        });
        return res.json({ url: session.url });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};





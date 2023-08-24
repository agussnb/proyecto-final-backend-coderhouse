import { Router } from "express";
import { createSession } from "../controllers/payment.controller.js";
import Stripe from 'stripe'

const stripeSecretKey = process.env.STRIPE_APP_SECRET_KEY

const stripe = new Stripe(stripeSecretKey);
const router = Router();

router.post("/create-checkout-session", createSession);

router.get('/success', async (req, res) => {
    try {
        const session_id = req.query.session_id;
        
        const session = await stripe.checkout.sessions.retrieve(session_id);
        console.log(session)

        const charges = await stripe.charges.list({ payment_intent: session.payment_intent });

        const charge = charges.data[0];

        console.log(charge);

        // Redirigir al usuario a la URL del recibo del cargo
        res.redirect(charge.receipt_url);
    } catch (error) {
        res.status(500).send('Error al obtener la información de la sesión');
    }
});




export default router;
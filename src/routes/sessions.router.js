import { Router } from 'express';
import passport from 'passport'
import { getLogger } from '../config/logger.js';
import fetch from 'node-fetch';
const logger = getLogger();



const router = Router();

router.get('/github', passport.authenticate('github',{scope:['user:email']}), async(req, res)=>{})

router.get("/githubcallback", passport.authenticate('github', {failureRedirect: '/github/error'}), async (req, res) => {
    const user = req.user;
    req.session.user= {
        name : `${user.first_name} ${user.last_name}`,
        email: user.email,
        age: user.age,
        cartId: user.cartId
    };
    req.session.admin = true;
    res.redirect("/github");
});

router.post("/register", passport.authenticate('register', { failureRedirect: '/api/sessions/fail-register' }),
    async (req, res) => {
        const user = req.user;

        // Realizar el fetch para crear un carrito
        const cartCreationResponse = await fetch('http://localhost:8080/api/carts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId: user._id, products: [] })
        });

        if (cartCreationResponse.status === 200) {
            logger.info("Registrando nuevo usuario y creando carrito.");
            res.status(201).send({ status: "success", message: "Usuario creado con éxito y carrito creado." });
        } else {
            logger.error("Error al crear el carrito para el usuario.");
            res.status(500).send({ status: "error", message: "Error al crear el carrito para el usuario." });
        }
    });


router.post("/login", passport.authenticate('login', { failureRedirect: '/api/sessions/fail-login' }), async (req, res) => {
    logger.debug("User found to login:");
    const user = req.user;
    logger.info(user);
   
    if (!user) return res.status(401).send({ status: "error", error: "El usuario y la contraseña no coinciden!" });
    req.session.user = {
        name: `${user.first_name} ${user.last_name}`,
        email: user.email,
        age: user.age,
        cartId: user.cartId
    }
    res.send({ status: "success", payload: req.session.user, message: "¡Primer logueo realizado! :)" });
});

router.get("/fail-register", (req, res) => {
    res.status(401).send({ error: "Failed to process register!" });
});

router.get("/fail-login", (req, res) => {
    res.status(401).send({ error: "Failed to process login!" });
});

    // destruir la session
router.get('/logout', (req, res)=>{
        req.session.destroy(error => {
            if(error){
                res.json({error: "Error de logout", msg: 'Error al cerrar session'})
            }
            res.clearCookie('connect.sid').send("Sesion cerrada correctamente!!")
        })
    })  



export default router;
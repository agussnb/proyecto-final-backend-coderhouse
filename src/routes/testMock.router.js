import { Router } from 'express';
import { getProducts } from '../controllers/products.controller.js';
import config from '../config/config.js';

const router = Router();

router.get('/mockingproducts', (req, res, next) => {
  if (config.runTests) {
    next();
  } else {
    res.status(403).send({ error: "Acceso denegado. Solo se puede acceder en modo test" });
  }
}, getProducts);

export default router;

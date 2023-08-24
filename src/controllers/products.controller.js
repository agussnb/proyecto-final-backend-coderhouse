import {generateProducts} from '../utils.js'
import { getLogger } from '../config/logger.js';
const logger = getLogger();


export const getProducts = async (req, res) =>{
    try {
        let products = []
        for (let i = 0; i< 100; i++){
            products.push(generateProducts());
        }
        res.send({status: "Success", payload: products})
    } catch (error) {
        logger.error(error);
        res.status(500).send({error: error, message:"No se pudo obtener los productos"})
    }
}
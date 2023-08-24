import {fileURLToPath} from 'url';
import {dirname} from 'path';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import { faker } from '@faker-js/faker';
import { getLogger } from './config/logger.js';
const logger = getLogger();


const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)


//Generacion del HASH

export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

//Validacion de la password con las password hasheada de la db

export const isValidPassword = (user, password)=>{
    logger.debug(`datos a validar: user-password${user.password}, password:${password}`)
    return bcrypt.compareSync(password, user.password)
}

//JSON Web Tokens JWT functinos:
const PRIVATE_KEY = "CoderhouseBackendCourseSecretKeyJWT";


export const generateJWToken = (user)=>{
    return jwt.sign({user}, PRIVATE_KEY, {expiresIn: '24h'});
}

/**
 * Metodo que autentica el token JWT para nuestros requests.
 * OJO: Esto actúa como un middleware, observar el next.
 * @param {*} req Objeto de request
 * @param {*} res Objeto de response
 * @param {*} next Pasar al siguiente evento.
 */
export const authToken = (req, res, next) => {
    //  El JWT se guarda en los headers de auth
    const authHeader = req.headers.authorization;
    logger.info("Token present in header auth:");
    logger.info(authHeader);

    if(!authHeader){
        return res.status(401).send({error: "User not authenticated or missing token."});
    }

    const token = authHeader.split(' ')[1]; //Se hace el split para retirar la palabra Bearer.
    //Validar token
    jwt.verify(token, PRIVATE_KEY, (error, credentials)=>{
        if (error) return res.status(403).send({error: "Token invalid, Unauthorized!"});
        //Token OK
        req.user = credentials.user;
        logger.info(req.user);
        next();
    })
}

faker.locale = 'es'

export const generateProducts = ()=>{
    return {
        title: faker.commerce.productName(),
        price: faker.commerce.price(),
        stock: faker.random.numeric(1),
        id: faker.database.mongodbObjectId(),
        image: faker.image.image()
    }
};



export default __dirname;
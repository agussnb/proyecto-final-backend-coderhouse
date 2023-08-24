import nodemailer from 'nodemailer';
import config from '../config/config.js';
import __dirname from '../utils.js'
import { getLogger } from '../config/logger.js';
const logger = getLogger();


const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: 'agustinbarrero5k@gmail.com',
        pass: 'wispciwlsznlpzhi'
    }
});

transporter.verify(function (error, success) {
    if (error) {
        logger.error(error);
    } else {
        logger.info('Server is ready to take our messages');
    }
});

const mailOptions = {
    // Cuerpo del mensaje
    from: "Coder Test " + 'agustinbarrero5k@gmail.com',
    to: 'agustinbarrero5k@gmail.com',
    subject: "Correo de prueba Coderhouse Programacion Backend clase 30.",
    html: `<div><h1>Que onda!</h1>
                <p>Estoy probando una libreria de mensajeria, funciona mandandome un mail a mi mismo pero queria probar si funcionaba igual con otros mails</p>
                <p>Asi que si esto te llego, gucci, xd<p/></div>`,
    attachments: []
}

const mailOptionsWithAttachments = {
    // Cuerpo del mensaje
    from: "Coder Test " +  'agustinbarrero5k@gmail.com',
    to:  'agustinbarrero5k@gmail.com',
    subject: "Correo de prueba Coderhouse Programacion Backend clase 30.",
    html: `<div>
                <h1>Esto es un Test de envio de correos con Nodemailer!</h1>
                <p>Ahora usando imagenes: </p>
                <img src="cid:meme"/>
            </div>`,
    attachments: [
        {
            filename: 'Meme de Programacion',
            path: __dirname + "/public/images/meme.png",
            cid: "meme"
        }
    ]
}

export const sendEmail = (req, res) => {
    // Logica
    try {
        let result = transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
               logger.error(error);
                res.status(400).send({ message: "Error", payload: error })
            }
            logger.debug('Message sent: ', info.messageId);
            res.send({ message: "Success", payload: info })
        })
    } catch (error) {
        logger.error(error);
        res.status(500).send({ error: error, message: "No se pudo enviar el email desde:" + config.gmailAccount });
    }

};

export const sendEmailWithAttachments = (req, res) => {
    // Logica
    try {
        let result = transporter.sendMail(mailOptionsWithAttachments, (error, info) => {
            if (error) {
               logger.error(error);
                res.status(400).send({ message: "Error", payload: error })
            }
            logger.debug('Message sent: ', info.messageId);
            res.send({ message: "Success", payload: info })
        })
    } catch (error) {
        logger.error(error);
        res.status(500).send({ error: error, message: "No se pudo enviar el email desde:" + config.gmailAccount });
    }
}
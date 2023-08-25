import express from 'express';
import __dirname from './utils.js';
import handlebars from 'express-handlebars';

import {Server} from 'socket.io'
import session from 'express-session'
import passport from 'passport'
import initializePassport from './config/passport.config.js';
import mongoose from 'mongoose'
import MongoStore from 'connect-mongo'

import { getLogger } from './config/logger.js';

import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUIExpress from 'swagger-ui-express'

const logger = getLogger();

//Importaciones de routers
import viewsRouter from './routes/views.router.js'
import productsRouter from './routes/products.router.js'
import cartsRouter from './routes/carts.router.js'
import usersViewRouter from './routes/users.views.router.js'
import sessionsRouter from './routes/sessions.router.js'
import githubLoginViewRouter from './routes/github-login.views.router.js'
import emailRouter from './routes/email.router.js';
import testMockingRouter from './routes/testMock.router.js'
import testLoggerRouter from './routes/loggerTest.router.js'
import paymentRouter from './routes/payments.router.js'


/*---------------------------------------------------------------------------*/

const app = express();

//JSON settings:
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const PORT = process.env.PORT || 8080;
const httpServer = app.listen(PORT,()=>{
    logger.info('Server running on port: '+PORT)
})

const MONGO_URL = process.env.MONGO_URL
app.use(session({
    store:MongoStore.create({
        mongoUrl:MONGO_URL,
        mongoOptions: {useNewUrlParser: true, useUnifiedTopology: true},
        ttl: 20000000
    }),
    cookie:{
        maxAge:360000000
    },
    secret:"CoderS3cret",
    resave: false,
    saveUninitialized: true
}))

//Middlewares Passport
initializePassport();
app.use(passport.initialize());
app.use(passport.session());


const socketServer = new Server(httpServer)
//Inicializacion del motor de handlebars
app.engine('handlebars', handlebars.engine());
app.set('views',__dirname+'/views');
app.set('view engine', 'handlebars');

app.use(express.static(__dirname+'/public'));

//Declaracion de rutas
app.use("/github", githubLoginViewRouter);
app.use("/api/payments", paymentRouter);
app.use('/api/users',usersViewRouter);
app.use('/api/products', productsRouter);

app.use('/api/carts', cartsRouter);



app.use('/api/sessions',sessionsRouter);


app.use("/api/email", emailRouter);

app.use('/api/testing', testMockingRouter);

app.use('/api/testLogger' , testLoggerRouter)


app.use('/',viewsRouter);

//Coneccion a la base de datos de mongodb


const DB = process.env.MONGO_URL
const connectMongoDB = async()=>{
    try {
        await mongoose.connect(DB)
        logger.info('Conectado a la base de datos utilizando Mongoose correctamente')
    } catch (error) {
        console.log('No se pudo conectar a la base de datos utilizando Mongoose')
    }
}
connectMongoDB();


socketServer.on('connection',socket=>{
   logger.info('Nuevo cliente conectado')
})

const swaggerOptions = {
    definition:{
        openapi: '3.1.0',
        info:{
            title: 'Documentacion Api Proyecto Final',
            description: 'Documentacion de mi proyecto final usando Swagger'
        }
    },
    apis: [`./src/docs/**/*.yaml`]
}

const specs = swaggerJSDoc(swaggerOptions)

app.use('/api/docs', swaggerUIExpress.serve, swaggerUIExpress.setup(specs));


export default socketServer;
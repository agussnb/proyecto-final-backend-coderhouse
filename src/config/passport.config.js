import passport from 'passport'
import passportLocal from 'passport-local'
import userModel from '../dao/DB/models/user.model.js'
import { createHash , isValidPassword } from '../utils.js'
import GitHubStrategy from 'passport-github2'
import { getLogger } from '../config/logger.js'

const logger = getLogger();

//Declaracion de las estrategias

const localStrategy = passportLocal.Strategy

const initializePassport = ()=>{

    passport.use('github', new GitHubStrategy(
        {
            clientID: 'Iv1.94b0e8e94bd92691', 
            clientSecret: '1cde45bccfc586209b585fae580fc54af82010d3',
            callbackUrl: 'http://localhost:8080/api/sessions/githubcallback'
        }, 
        async (accessToken, refreshToken, profile, done) => {
            logger.info("Profile obtenido del usuario: ");
            logger.info(profile);
            try {
                const user = await userModel.findOne({email: profile._json.email});
                logger.info("Usuario encontrado para login:");
                logger.info(user);
                if (!user) {
                    logger.warning("User doesn't exists with username: " + profile._json.email);
                    let newUser = {
                        first_name: profile._json.name,
                        last_name: '',
                        age: 18,
                        email: profile._json.email,
                        password: '',
                        loggedBy: "GitHub"
                    };
                    const result = await userModel.create(newUser);
                    return done(null, result);
                } else {
                    //Si entramos por acá significa que el usuario ya existía.
                    return done(null, user);
                }
            } catch (error) {
                return done(error);
            }
        })
    );

    passport.use('register', new localStrategy(
        { passReqToCallback: true, usernameField: 'email' },
        async(req, username, password, done) =>{
            const { first_name, last_name, email, age } = req.body;
            try {

                const exists = await userModel.findOne({ email });
                if (exists) {
                    logger.info("El usuario ya existe.");
                    return done(null, false);
                }
                const user = {
                    first_name,
                    last_name,
                    email,
                    age,
                    password: createHash(password),
                };
                
                const result = await userModel.create(user);
               
                //Todo sale OK
                return done(null, result);
            } catch (error) {
                return done("Error registrando el usuario: " + error);
            }
        }
    ))
        // Estrategia login
    passport.use('login', new localStrategy(
        { passReqToCallback: true, usernameField: 'email' }, async (req, username, password, done) => {
            try {
                const user = await userModel.findOne({ email: username });
               logger.info("Usuario encontrado para login:");
               logger.info(user);
                if (!user) {
                   logger.warning("User doesn't exists with username: " + username);
                    return done(null, false);
                }
                if (!isValidPassword(user, password)) {
                   logger.warning("Invalid credentials for user: " + username);
                    return done(null, false);
                }
                return done(null, user);
            } catch (error) {
                return done(error);
            }
        })
    );

    //Funciones de Serializacion y Desserializacion
    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            let user = await userModel.findById(id);
            done(null, user);
        } catch (error) {
            logger.error("Error deserializando el usuario: " + error);
        }
    })
}

export default initializePassport;
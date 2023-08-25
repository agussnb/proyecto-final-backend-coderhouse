import dotenv from 'dotenv';
import { Command } from 'commander';

const program = new Command(); //Crea la instancia de comandos de commander.

program
    .option('-d', 'Variable para debug', false)
    .option('--test', 'Variable para correr los test', false)
    .option('-p <port>', 'Puerto del servidor', 8080)
    .option('--mode <mode>', 'Modo de trabajo', 'develop')
program.parse();

//console.log("Options: ", program.opts());
console.log("Mode Option: ", program.opts().mode);
console.log("Test Mode on?: ", program.opts().test);

const environment = program.opts().mode;

dotenv.config({
    path: environment === "production" ? "./src/config/.env.production" : "./src/config/.env.development"
});

export default {
    port: process.env.PORT,
    mongoUrl: process.env.MONGO_URL,
    stripeSecretKey: process.env.STRIPE_APP_SECRET_KEY,
    adminName: process.env.ADMIN_NAME,
    adminPassword: process.env.ADMIN_PASSWORD,
    gmailAccount: process.env.GMAIL_ACCOUNT,
    gmailAppPassword: process.env.GMAIL_APP_PASSWD,
    runTests: program.opts().test
};

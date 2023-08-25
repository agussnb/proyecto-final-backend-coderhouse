import {Router} from 'express';
import UserManager from '../dao/DB/UserManager.js';

const userManager = new UserManager()

const router = Router();

router.get('/login', (req, res)=>{
    res.render("login");
})

router.get('/register', (req, res)=>{
    res.render("register");
})

router.get('/', async (req, res) => {
    try {
      const users = await userManager.getAllUsers();
  
      res.render('users', { users }); // Renderiza la vista 'users' y pasa la lista de usuarios como variable
    } catch (error) {
      console.error(error);
      res.status(500).send('Error al obtener la lista de usuarios');
    }
  });

router.get('/user', (req, res)=>{
    res.render("profile", {
        user: req.session.user
    });
})

router.get('/admin', auth,(req,res)=>{
    res.render('admin')
})

   // Auth middleware
   function auth(req, res,next){
    if(req.session.admin){
        return next();
    }else{
        return res.status(403).send('Acceso denegado, para ingresar, debes ser administrador.')
    }
}

export default router;
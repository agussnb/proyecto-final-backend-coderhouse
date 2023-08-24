import {Router} from 'express';
const router = Router();

router.get('/login', (req, res)=>{
    res.render("login");
})

router.get('/register', (req, res)=>{
    res.render("register");
})

router.get('/', (req, res)=>{
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
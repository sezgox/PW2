const router = require('express').Router();

router.get('/users/signin',(req,res)=>{
    res.send('Login');
})

router.get('/users/signup',(req,res)=>{
    res.send('Registro');
})

module.exports = router;
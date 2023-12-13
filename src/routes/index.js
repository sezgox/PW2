const router = require('express').Router();

router.get('/',(req,res)=>{
    res.render('index'); //.send envia mensaje .render envia archivo
})

router.get('/about', (req,res) => {
    res.render('about');
})

module.exports = router;
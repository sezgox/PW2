const router = require('express').Router();
const User = require('..\\models\\User')
const passport = require('passport');
const { isAuthenticated } = require ('..\\helpers\\auth');

router.get('/users/signin',(req,res)=>{
    res.render('users\\signin');
});

router.post('/users/signin', passport.authenticate('local', {
    successRedirect:'/notes',
    failureRedirect: '/users/signin'
}));

router.get('/users/signup',(req,res)=>{
    res.render('users\\signup');
});

router.post('/users/signup', async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;
    const errors = [];
    if(name.length <= 0){
        errors.push({text: 'Please insert a name'});
    }
    if(password != confirmPassword){
        errors.push({text: 'Passwords do not match'});
    }
    if(password.length < 4){
        errors.push({text: 'Password  must be at least 4 characters'});
    }
    if(errors.length > 0){
        res.render('users\\signup', {errors, name, email, password, confirmPassword});
    } else {
        const emailUser = await User.findOne({email: email});
        if (emailUser){
            console.log('email in use');
            res.redirect('/users/signup');
        }else{
            const newUser = new User({name, email, password});
            newUser.password = await newUser.encryptPassword(password);
            await newUser.save();
            res.redirect('/users/signin');
        }
    }
});

router.get('/users/logout', (req,res) => {
    req.logout((err) => {
        if (err){
            console.log(err);
        }
        res.redirect('/')
    });
    });

module.exports = router;
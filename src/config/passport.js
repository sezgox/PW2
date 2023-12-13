const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('..\\models\\User');

passport.use(new LocalStrategy({
    usernameField: 'email'
}, async (email, password, done) => {
    const user =  await User.findOne({email: email});
    if(!user){
        return done(null, false);
    }else{
        const match = await user.matchPassword(password);
        if(match){
            return done(null, user);
        }else{
            return done(null, false);
        }
    }
}
));

//almacena en una sesion
passport.serializeUser((user,done) => {
    done(null, user.id);
});

//recoge los datos del usuario a partir del id
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});
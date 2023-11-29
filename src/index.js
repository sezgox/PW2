const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const session = require('express-session');

//Inititializations
const app = express();
require('./database');

//Settings
app.set('port', process.env.PORT || 3000);
app.set('views',path.join(__dirname, 'views')); //configurando ruta de la carpeta views para que node lo sepa
app.engine('.hbs', exphbs.engine({
    defaultLayout: 'main', //default page
    layoutsDir: path.join(app.get('views'), 'layaouts') , //paginas html(.hbs en este caso) reutilizables
    partialsDir: path.join(app.get('views'), 'partials'), //trozos de codigo html reutilizables
    extname: '.hbs',
}));
app.set('view engine', '.hbs');

//Middlewares
app.use(express.urlencoded({extended: false})); //poder recibir datos de los formularios
app.use(methodOverride('_method'));
app.use(session({
    secret: 'mySecretApp',
    resave: true,
    saveUninitialized: true
}));

//Global Variables

//Routes
app.use(require('./routes/index'));
app.use(require('./routes/notes'));
app.use(require('./routes/users'));

//Static Files
app.use(express.static(path.join(__dirname,'public')));

//Server is listening
app.listen(app.get('port'), () => {
    console.log('Server on port ', app.get('port'));
})
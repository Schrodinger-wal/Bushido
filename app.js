const express = require ('express');
const app = express()
const cors = require('cors');
const path = require('path');

// constantes para los middleware, (todos tienen que tenes el export router, osea el enrutador, osea, enrutados)

const userRoutes = require ('./routes/user.routes');
const productRoutes = require ('./routes/product.routes');
const orderRoutes = require ('./routes/order.routes');
const uploadRoutes = require ('./routes/upload.routes');
const categoryRoutes = require ('./routes/category.routes') 
/* 


const viewsRoutes = require ('./routes/views.routes');
 */

//cargar configuracion de plantillas express
app.set('view engine', 'ejs');

app.use(cors());


app.use(express.static("public"));
console.log("Middleware de archivos estáticos configurado correctamente.");



// middleware
app.use(express.json());
console.log("Middleware de análisis JSON configurado correctamente.");

app.use(express.urlencoded({extended: true}))


app.use('/api',[
    userRoutes,
    productRoutes,
    orderRoutes,
    uploadRoutes,
    categoryRoutes,
    
    /*
    viewsRoutes */
]);
console.log("Rutas API configuradas correctamente.");

module.exports = app;

// routes
app.get('/', (req, res) => {
    res.send('welcome')
})


app.get('/products', (req, res) => {
    res.send('products')
})







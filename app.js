const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const app = express();
const cors = require('cors');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: "Shop API",
            description: "Backend Api",
            contact: {
                name: 'Amazing Developer'
            },
            servers: "http://localhost:3636"
        }
    },
    apis: ["app.js", ".routes/*.js"]
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use('/api/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));


/* CORS */
app.use(cors({
    origin: '*',
    methods: ['GET', 'PUT', 'DELETE', 'PATCH', 'POST'],
    allowedHeaders: 'Content-Type, Authorization, Origin, X-Requested-With, Accept'
}));
app.use(logger('combined'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// Import Routes
const usersRouter = require('./routes/users');
const productsRouter = require('./routes/products');
const produitsRouter = require('./routes/produits');
const categorieRouter = require('./routes/categorie');
const authRouter = require('./routes/auth');
const orderRouter = require('./routes/order');
const adminproduit = require('./Admin/produits');
const adminRouter = require('./Admin/auth_admin');
const referencesRouter = require('./routes/reference');


// Define Routes
/**
 * @swaggers
 * /api/produits:
 *   get:
 *    description: Get All Products
 *
 */

app.use('/api/users', usersRouter);
app.use('/api/products', productsRouter);
app.use('/api/produits', produitsRouter);
app.use('/api/categorie',categorieRouter);
app.use('/api/auth', authRouter);
app.use('/api/orders', orderRouter);
app.use('/api/admin/chiheb/auth', adminRouter);
app.use('/api/admin/chiheb', adminproduit);
app.use('/api/reference', referencesRouter);

module.exports = app;

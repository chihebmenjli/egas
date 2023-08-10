const express = require('express');
const router = express.Router();
const {database} = require('../config/helpers');

router.get('/', function (req, res) {     
   let page = (req.query.page !== undefined && req.query.page !== 0) ? req.query.page : 1;
    const limit = (req.query.limit !== undefined && req.query.limit !== 0) ? req.query.limit : 50;   // set limit of items per page
    let startValue;
    let endValue;
    if (page > 0) {
        startValue = (page * limit) - limit;     // 0, 10, 20, 30
        endValue = page * limit;                  // 10, 20, 30, 40
    } else {
        startValue = 0;
        endValue = 50;
    }
    
 
 
 
    database.table('produit as p')
      
        .withFields([
            'p.ID_PRODUIT' ,
            'p.NOM_PRODUIT' ,
            'p.DEF_PRODUIT' ,
            'p.REM_PRODUIT' ,
            'p.DESCRIPTION' ,
            'p.CATEGORIE' ,
            'p.FAMILLE' ,
            'p.PRIX' ,
            'p.quantity' ,
            'p.TAXE' ,
            'p.IMAGE' ,
            'p.ALT' ,
            'p.VISIBLE'
        ])
        .slice(startValue, endValue)
        .sort(undefined)
        .getAll()
        .then(prods => {
            if (prods.length > 0) {
                res.status(200).json({
                    count: prods.length,
                    products: prods 
                });
            } else {
                res.json({message: "No products found"});
            }
        })
        .catch(err => console.log(err));
});

/* GET ONE PRODUCT*/
router.get('/:prodId', (req, res) => {
    let productId = req.params.prodId;
    database.table('produit as p ')
    
   .join ([
       
       { table : "categorie as c ",
        on : "c.ID_CATEGORIE = p.CATEGORIE" ,
       },
           { table : "famille as f ",
               on : "f.ID_FAMILLE = p.FAMILLE" ,
           }
        ]
       
             )

    
    .withFields(['c.NOM_CATEGORIE as categorie' , 'f.NOM_FAMILLE as famille' ,
         
            'p.ID_PRODUIT' ,
            'p.NOM_PRODUIT' ,
            'p.DEF_PRODUIT' ,
            'p.REM_PRODUIT' ,
            'p.DESCRIPTION' ,
            'p.CATEGORIE' ,
            'p.FAMILLE' ,
            'p.PRIX' ,
            'p.QUANTITY' ,
            'p.TAXE' ,
            'p.IMAGE' ,
            'p.IMG',
            'p.ALT' ,
            'p.VISIBLE',
            'p.DOCUMENT',
            'p.IMG_DOCUMENT',
            'p.VIDEO' ,



    ])
        .filter({'p.ID_PRODUIT': productId})
        .get()
        .then(prod => {
            console.log(prod);
            if (prod) {
                res.status(200).json(prod);
            } else {
                res.json({message: `No product found with id ${productId}`});
            }
        }).catch(err => res.json(err));
});

/* GET ALL PRODUCTS FROM ONE CATEGORY */

router.get('/category/:catName', (req, res) => { // Sending Page Query Parameter is mandatory http://localhost:3636/api/products/category/categoryName?page=1
    let page = (req.query.page !== undefined && req.query.page !== 0) ? req.query.page : 1;   // check if page query param is defined or not
    const limit = (req.query.limit !== undefined && req.query.limit !== 0) ? req.query.limit : 100;   // set limit of items per page
    let startValue;
    let endValue;
    if (page > 0) {
        startValue = (page * limit) - limit;      // 0, 10, 20, 30
        endValue = page * limit;                  // 10, 20, 30, 40
    } else {
        startValue = 0;
        endValue = 10;
    }

    // Get category title value from param
    const cat_title = req.params.catName;

    database.table('produit as p')
        .join([
            {
                table: "categorie as c",
                on: `c.ID_CATEGORIE = p.CATEGORIE WHERE c.NOM_CATEGORIE LIKE '%${cat_title}%'`
            }
        ])
        .withFields(['c.NOM_CATEGORIE as category',
        'p.ID_PRODUIT' ,
        'p.NOM_PRODUIT' ,
        'p.DEF_PRODUIT' ,
        'p.REM_PRODUIT' ,
        'p.DESCRIPTION' ,
        'p.CATEGORIE' ,
        'p.FAMILLE' ,
        'p.PRIX' ,
        'p.quantity' ,
        'p.TAXE' ,
        'p.IMAGE' ,
        'p.ALT' ,
        'p.VISIBLE',
        ])
        .slice(startValue, endValue)
   
        .getAll()
        .then(prods => {
            if (prods.length > 0) {
                res.status(200).json({
                    count: prods.length,
                    products: prods
                });
            } else {
                res.json({message: `No products found matching the category ${cat_title}`});
            }
        }).catch(err => res.json(err));

});



/* GET ALL PRODUCTS FROM ONE CATEGORY  number */

router.get('/categorie/:cat', (req, res) => { // Sending Page Query Parameter is mandatory http://localhost:3636/api/products/category/categoryName?page=1
    let page = (req.query.page !== undefined && req.query.page !== 0) ? req.query.page : 1;   // check if page query param is defined or not
    const limit = (req.query.limit !== undefined && req.query.limit !== 0) ? req.query.limit : 100;   // set limit of items per page
    let startValue;
    let endValue;
    if (page > 0) {
        startValue = (page * limit) - limit;      // 0, 10, 20, 30
        endValue = page * limit;                  // 10, 20, 30, 40
    } else {
        startValue = 0;
        endValue = 10;
    }

    // Get category title value from param
    const cat_id = req.params.cat;

    database.table('produit as p')
        .join([
            {
                table: "categorie as c",
                on: `c.ID_CATEGORIE = p.CATEGORIE WHERE c.ID_CATEGORIE ='${cat_id}'`
            }
        ])
        .withFields(['c.NOM_CATEGORIE as category',
        'p.ID_PRODUIT' ,
        'p.NOM_PRODUIT' ,
        'p.DEF_PRODUIT' ,
        'p.REM_PRODUIT' ,
        'p.DESCRIPTION' ,
        'p.CATEGORIE' ,
        'p.FAMILLE' ,
        'p.PRIX' ,
        'p.quantity' ,
        'p.TAXE' ,
        'p.IMAGE' ,
        'p.ALT' ,
        'p.VISIBLE',
        ])
        .slice(startValue, endValue)
   
        .getAll()
        .then(prods => {
            if (prods.length > 0) {
                res.status(200).json({
                    count: prods.length,
                    products: prods
                });
            } else {
                res.json({message: `No products  category ${cat_id}`});
            }
        }).catch(err => res.json(err));

});


/* GET ALL PRODUCTS FROM ONE FAMILLE  number */

router.get('/famille/:fam', (req, res) => { // Sending Page Query Parameter is mandatory http://localhost:3636/api/products/category/categoryName?page=1
    let page = (req.query.page !== undefined && req.query.page !== 0) ? req.query.page : 1;   // check if page query param is defined or not
    const limit = (req.query.limit !== undefined && req.query.limit !== 0) ? req.query.limit : 100;   // set limit of items per page
    let startValue;
    let endValue;
    if (page > 0) {
        startValue = (page * limit) - limit;      // 0, 10, 20, 30
        endValue = page * limit;                  // 10, 20, 30, 40
    } else {
        startValue = 0;
        endValue = 10;
    }

    // Get category title value from param
    const fam_id = req.params.fam;

    database.table('produit as p')
        .join([
            {
                table: "categorie as c",
                on: `c.ID_CATEGORIE = p.CATEGORIE`
            },{
                table: "famille as f",
                on: `f.ID_FAMILLE = p.FAMILLE WHERE f.ID_FAMILLE ='${fam_id}'`
            }
        ])
        .withFields(['f.NOM_FAMILLE as famille', 'c.NOM_CATEGORIE as categorie' ,
        'p.ID_PRODUIT' ,
        'p.NOM_PRODUIT' ,
        'p.DEF_PRODUIT' ,
        'p.REM_PRODUIT' ,
        'p.DESCRIPTION' ,
        'p.CATEGORIE' ,
        'p.FAMILLE' ,
        'p.PRIX' ,
        'p.quantity' ,
        'p.TAXE' ,
        'p.IMAGE' ,
        'p.ALT' ,
        'p.VISIBLE',
        ])
        .slice(startValue, endValue)
   
        .getAll()
        .then(prods => {
            if (prods.length > 0) {
                res.status(200).json({
                    count: prods.length,
                    products: prods
                });
            } else {
                res.json({message: `No products  famille ${fam_id}`});
            }
        }).catch(err => res.json(err));

});



/* GET produits recherche  */

router.get('/product/:proName', (req, res) => { // Sending Page Query Parameter is mandatory http://localhost:3636/api/products/category/categoryName?page=1
    let page = (req.query.page !== undefined && req.query.page !== 0) ? req.query.page : 1;   // check if page query param is defined or not
    const limit = (req.query.limit !== undefined && req.query.limit !== 0) ? req.query.limit : 100;   // set limit of items per page
    let startValue;
    let endValue;
    if (page > 0) {
        startValue = (page * limit) - limit;      // 0, 10, 20, 30
        endValue = page * limit;                  // 10, 20, 30, 40
    } else {
        startValue = 0;
        endValue = 10;
    }

    // Get category title value from param
    const pro_nom = req.params.proName;

    database.table('produit as p')
        .join([
            {
                table: "categorie as c",
                on: `c.ID_CATEGORIE = p.CATEGORIE WHERE p.NOM_PRODUIT LIKE '%${pro_nom}%'`
            }
        ])
        .withFields(['c.NOM_CATEGORIE as category',
        'p.ID_PRODUIT' ,
        'p.NOM_PRODUIT' ,
        'p.DEF_PRODUIT' ,
        'p.REM_PRODUIT' ,
        'p.DESCRIPTION' ,
        'p.CATEGORIE' ,
        'p.FAMILLE' ,
        'p.PRIX' ,
        'p.quantity' ,
        'p.TAXE' ,
        'p.IMAGE' ,
        'p.ALT' ,
        'p.VISIBLE',
        ])
        .slice(startValue, endValue)
   
        .getAll()
        .then(prods => {
            if (prods.length > 0) {
                res.status(200).json({
                    count: prods.length,
                    products: prods
                });
            } else {
                res.json({message: `No products found matching the category ${pro_nom}`});
            }
        }).catch(err => res.json(err));

});


/* GET produits recherche selon categorie  */

router.get('/product/categorie/:proName', (req, res) => { // Sending Page Query Parameter is mandatory http://localhost:3636/api/products/category/categoryName?page=1
    let page = (req.query.page !== undefined && req.query.page !== 0) ? req.query.page : 1;   // check if page query param is defined or not
    const limit = (req.query.limit !== undefined && req.query.limit !== 0) ? req.query.limit : 30;   // set limit of items per page
    let startValue;
    let endValue;
    if (page > 0) {
        startValue = (page * limit) - limit;      // 0, 10, 20, 30
        endValue = page * limit;                  // 10, 20, 30, 40
    } else {
        startValue = 0;
        endValue = 10;
    }

    // Get category title value from param
    const pro_nom = req.params.proName;

    database.table('produit as p')
        .join([
            {
                table: "categorie as c",
                on: `c.ID_CATEGORIE = p.CATEGORIE WHERE p.NOM_PRODUIT LIKE '%${pro_nom}%'`
            }
        ])
        .withFields(['c.NOM_CATEGORIE as category',
            'p.ID_PRODUIT' ,
            'p.NOM_PRODUIT' ,
            'p.DEF_PRODUIT' ,
            'p.REM_PRODUIT' ,
            'p.DESCRIPTION' ,
            'p.CATEGORIE' ,
            'p.FAMILLE' ,
            'p.PRIX' ,
            'p.quantity' ,
            'p.TAXE' ,
            'p.IMAGE' ,
            'p.ALT' ,
            'p.VISIBLE',
        ])
        .slice(startValue, endValue)

        .getAll()
        .then(prods => {
            if (prods.length > 0) {
                res.status(200).json({
                    count: prods.length,
                    products: prods
                });
            } else {
                res.json({message: `No products found matching the category ${pro_nom}`});
            }
        }).catch(err => res.json(err));

});





module.exports = router;

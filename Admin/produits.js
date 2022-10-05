const express = require('express');
const router = express.Router();
const {database} = require('../config/helpers_admin');



router.post('/ajout_produit', async (req, res) => {
   




     database.table('produit').insert({
            NOM_PRODUIT: req.body.NOM_PRODUIT,
            DEF_PRODUIT: req.body.DEF_PRODUIT,
            REM_PRODUIT: req.body.REM_PRODUIT,
            DESCRIPTION: req.body.DESCRIPTION,
            CATEGORIE: req.body.CATEGORIE,
            FAMILLE: req.body.FAMILLE,
            PRIX: req.body.PRIX,
            TAXE: req.body.TAXE,
            IMAGE: req.body.IMAGE,
            IMG: req.body.IMG,
            ALT: req.body.ALT,
            DOCUMENT: req.body.DOCUMENT,
            IMG_DOCUMENT: req.body.IMG_DOCUMENT,
            VIDEO: req.body.VIDEO,
            QUANTITY: req.body.QUANTITY
            
        }).then(() => res.json('Poduit ajouter successfully')).catch(err => res.json(err));
    }
);



router.patch('/update/:produitId', async (req, res) => {
    let produitId = req.params.produitId;     // Get the User ID from the parameter
        database.table('produit').filter({ID_PRODUIT: produitId}).update({
            NOM_PRODUIT: req.body.NOM_PRODUIT,
            DEF_PRODUIT: req.body.DEF_PRODUIT,
            REM_PRODUIT: req.body.REM_PRODUIT,
            DESCRIPTION: req.body.DESCRIPTION,
            CATEGORIE: req.body.CATEGORIE,
            FAMILLE: req.body.FAMILLE,
            PRIX: req.body.PRIX,
            TAXE: req.body.TAXE,
            IMAGE: req.body.IMAGE,
            IMG: req.body.IMG,
            ALT: req.body.ALT,
            DOCUMENT: req.body.DOCUMENT,
            IMG_DOCUMENT: req.body.IMG_DOCUMENT,
            VIDEO: req.body.VIDEO,
            QUANTITY: req.body.QUANTITY,
            VISIBLE: req.body.VISIBLE,  
        }).then(() => res.json('User updated successfully')).catch(err => res.json(err));
    }
);



router.patch('/update  /:produitId', async (req, res) => {
    let produitId = req.params.produitId;     // Get the User ID from the parameter

  // Search User in Database if any
  /*  let produit = await database.table('produit').filter({ID_PRODUIT: produitId}).get();
    if (produit) {

       // let ID_PRODUIT = req.body.ID_PRODUIT
        let  NOM_PRODUIT = req.body.NOM_PRODUIT
        let DEF_PRODUIT = req.body.DEF_PRODUIT
        let REM_PRODUIT = req.body.REM_PRODUIT
        let  DESCRIPTION = req.body.DESCRIPTION
        let  CATEGORIE = req.body.DESCRIPTION
        let  FAMILLE = req.body.FAMILLE
        let  PRIX = req.body.PRIX
        let  TAXE = req.body.TAXE
        let  IMAGE = req.body.IMAGE
        let  IMG = req.body.IMG
        let  ALT = req.body.ALT
        let  DOCUMENT = req.body.DOCUMENT
        let  IMG_DOCUMENT = req.body.IMG_DOCUMENT
        let  VIDEO = req.body.VIDEO
        let  QUANTITY = req.body.QUANTITY
        let  VISIBLE = req.body.VISIBLE

       
 database.table('produit').filter({ID_PRODUIT: produitId}).update({
            NOM_PRODUIT: NOM_PRODUIT !== undefined ? NOM_PRODUIT : produit.NOM_PRODUIT,
            DEF_PRODUIT: DEF_PRODUIT !== undefined ? DEF_PRODUIT : produit.DEF_PRODUIT,
            REM_PRODUIT: REM_PRODUIT !== undefined ? REM_PRODUIT : produit.REM_PRODUIT,
            DESCRIPTION: DESCRIPTION !== undefined ? DESCRIPTION : produit.DESCRIPTION,
            CATEGORIE: CATEGORIE !== undefined ? CATEGORIE : produit.CATEGORIE,
            FAMILLE: FAMILLE !== undefined ? FAMILLE : produit.FAMILLE,
            PRIX: PRIX !== undefined ? PRIX : produit.PRIX,
            TAXE: TAXE !== undefined ? TAXE : produit.TAXE,
            IMAGE: IMAGE !== undefined ? IMAGE : produit.IMAGE,
            IMG: IMG !== undefined ? IMG : produit.IMG,
            ALT: ALT !== undefined ? ALT : produit.ALT,
            DOCUMENT: DOCUMENT !== undefined ? DOCUMENT : produit.DOCUMENT,
            IMG_DOCUMENT: IMG_DOCUMENT !== undefined ? IMG_DOCUMENT : produit.IMG_DOCUMENT,
            VIDEO: VIDEO !== undefined ? VIDEO : produit.VIDEO,
            QUANTITY: QUANTITY !== undefined ? QUANTITY : produit.QUANTITY,
            VISIBLE: VISIBLE !== undefined ? VISIBLE : produit.VISIBLE,


        // Replace the user's information with the form data ( keep the data as is if no info is modified )

        */
        database.table('produit').filter({ID_PRODUIT: produitId}).update({
            NOM_PRODUIT: req.body.NOM_PRODUIT,
            DEF_PRODUIT: req.body.DEF_PRODUIT,
            REM_PRODUIT: req.body.REM_PRODUIT,
            DESCRIPTION: req.body.DESCRIPTION,
            CATEGORIE: req.body.CATEGORIE,
            FAMILLE: req.body.FAMILLE,
            PRIX: req.body.PRIX,
            TAXE: req.body.TAXE,
            IMAGE: req.body.IMAGE,
            IMG: req.body.IMG,
            ALT: req.body.ALT,
            DOCUMENT: req.body.DOCUMENT,
            IMG_DOCUMENT: req.body.IMG_DOCUMENT,
            VIDEO: req.body.VIDEO,
            QUANTITY: req.body.QUANTITY,
            VISIBLE: req.body.VISIBLE,

          
        }).then(() => res.json('User updated successfully')).catch(err => res.json(err));
    }
);















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
        endValue = 100;
    }
    
 
 
 
    database.table("produit as p where p.VISIBLE = 'V'  ")
      
        .withFields([
            'p.ID_PRODUIT' ,
            'p.NOM_PRODUIT' ,
            'p.DEF_PRODUIT' ,
            'p.REM_PRODUIT' ,
            'p.DESCRIPTION' ,
            'p.CATEGORIE' ,
            'p.FAMILLE' ,
            'p.IMAGE' ,
            'p.IMG' ,
            'p.ALT' ,
            'p.DOCUMENT' ,
            'p.IMG_DOCUMENT' ,
            'p.VIDEO'
        ])
        .slice(startValue, endValue)
        .sort()
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
        on : "c.ID_CATEGORIE = p.CATEGORIE and p.VISIBLE = 'V'" ,
       } 
        ]
       
             )

    
    .withFields(['c.NOM_CATEGORIE as categorie' ,
         
    'p.ID_PRODUIT' ,
    'p.NOM_PRODUIT' ,
    'p.DEF_PRODUIT' ,
    'p.REM_PRODUIT' ,
    'p.DESCRIPTION' ,
    'p.CATEGORIE' ,
    'p.FAMILLE' ,
    'p.IMAGE' ,
    'p.IMG' ,
    'p.ALT' ,
    'p.DOCUMENT' ,
    'p.IMG_DOCUMENT' ,
    'p.VIDEO'
        
         
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
                on: `c.ID_CATEGORIE = p.CATEGORIE and p.VISIBLE = 'V' WHERE c.NOM_CATEGORIE LIKE '%${cat_title}%'`
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
        'p.IMAGE' ,
        'p.IMG' ,
        'p.ALT' ,
        'p.DOCUMENT' ,
        'p.IMG_DOCUMENT' ,
        'p.VIDEO'
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
                on: `c.ID_CATEGORIE = p.CATEGORIE WHERE  c.ID_CATEGORIE ='${cat_id}' and p.VISIBLE = 'V' `
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
            'p.IMAGE' ,
            'p.IMG' ,
            'p.ALT' ,
            'p.DOCUMENT' ,
            'p.IMG_DOCUMENT' ,
            'p.VIDEO'
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
                table: "famille as f",
                on: `f.ID_FAMILLE = p.FAMILLE WHERE f.ID_FAMILLE ='${fam_id}' and p.VISIBLE = 'V'`
            }
        ])
        .withFields(['f.NOM_FAMILLE as famille',
        'p.ID_PRODUIT' ,
        'p.NOM_PRODUIT' ,
        'p.DEF_PRODUIT' ,
        'p.REM_PRODUIT' ,
        'p.DESCRIPTION' ,
        'p.CATEGORIE' ,
        'p.FAMILLE' ,
        'p.IMAGE' ,
        'p.IMG' ,
        'p.ALT' ,
        'p.DOCUMENT' ,
        'p.IMG_DOCUMENT' ,
        'p.VIDEO'
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
                on: `c.ID_CATEGORIE = p.CATEGORIE WHERE p.NOM_PRODUIT LIKE '%${pro_nom}%' and p.VISIBLE = 'V'`
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
        'p.IMAGE' ,
        'p.IMG' ,
        'p.ALT' ,
        'p.DOCUMENT' ,
        'p.IMG_DOCUMENT' ,
        'p.VIDEO'
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

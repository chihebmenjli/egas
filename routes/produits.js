const express = require('express');
const router = express.Router();
const {database} = require('../config/helpers');

/* GET ALL PRODUCTS */
router.get('/', function (req, res) {       // Sending Page Query Parameter is mandatory http://localhost:3636/api/products?page=1
   /* let page = (req.query.page !== undefined && req.query.page !== 0) ? req.query.page : 1;
    const limit = (req.query.limit !== undefined && req.query.limit !== 0) ? req.query.limit : 10;   // set limit of items per page
    let startValue;
    let endValue;
    if (page > 0) {
        startValue = (page * limit) - limit;     // 0, 10, 20, 30
        endValue = page * limit;                  // 10, 20, 30, 40
    } else {
        startValue = 0;
        endValue = 100;
    }
    */

    database.table('produit as p ')
   
    .join([
        {
            table: "categorie as c",
            on: `c.ID_CATEGORIE = p.CATEGORIE`
        
            
        
        }
       
    ])


        .withFields([
            'p.ID_PRODUIT' ,
            'p.NOM_PRODUIT' ,
            'p.DEF_PRODUIT' ,
            'p.REM_PRODUIT' ,
            'p.DESCRIPTION' ,
            
            'p.FAMILLE' ,
            'p.PRIX' ,
            'p.quantity' ,
            'p.TAXE' ,
            'p.IMAGE' ,
            'p.ALT' ,
            'p.VISIBLE'
            
        ])
      //  .slice(startValue, endValue)
      //  .sort({id: .1})
        .getAll()
        .then(prods => {
            if (prods.length > 0) {
                res.status(200).json({
                    count: prods.length,
                    produit: prods
                });
            } else {
                res.json({message: "No produit found"});
            }
        })
        .catch(err => console.log(err));
});

module.exports = router;

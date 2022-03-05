const express = require('express');
const router = express.Router();
const {database} = require('../config/helpers');

/* GET ALL FAMILLE */
router.get('/famille', function (req, res) {       // Sending Page Query Parameter is mandatory http://localhost:3636/api/products?page=1
    
    database.table('famille as f')
        .join([
            {
                table: "categorie as c",
                on: `c.ID_CATEGORIE = f.CATEGORIE`
            }
        ])
        .withFields(['c.NOM_CATEGORIE as categorie',
            'f.NOM_FAMILLE',
                'f.ID_FAMILLE'
    
        ])
      //  .slice(startValue, endValue)
        .sort({ID_FAMILLE: .1})
        .getAll()
        .then(prods => {
            if (prods.length > 0) {
                res.status(200).json({
                    count: prods.length,
                    products: prods
                });
            } else {
                res.json({message: "No FAMILLE found"});
            }
        })
        .catch(err => console.log(err));
});



/* GET ALL CATEGORIE */
router.get('/categorie', function (req, res) {       // Sending Page Query Parameter is mandatory http://localhost:3636/api/products?page=1
    
    database.table('categorie as c')
        .join([
            {
                table: "famille as f",
                on: `c.ID_CATEGORIE = f.CATEGORIE`
            }
        ])
        .withFields(['f.NOM_FAMILLE as famille',
                    'c.NOM_CATEGORIE ',
                     'c.ID_CATEGORIE'
    
        ])
      //  .slice(startValue, endValue)
        .sort({ID_CATEGORIE: .1})
        .getAll()
        .then(prods => {
            if (prods.length > 0) {
                res.status(200).json({
                    count: prods.length,
                    products: prods
                });
            } else {
                res.json({message: "No CATEGORIE found"});
            }
        })
        .catch(err => console.log(err));
});








module.exports = router;
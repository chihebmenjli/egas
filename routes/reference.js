const express = require('express');
const router = express.Router();
const { database } = require('../config/helpers');



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

    database.table('reference as r')
        .withFields([
            'r.ID_REFERENCE',
            'r.PRODUIT',
            'r.NOM_REFERENCE',
            'r.IMAGE',
            'r.DESCRIPTION'
        ])
        .slice(startValue, endValue)
        .sort()
        .getAll()
        .then(references => {
            if (references.length > 0) {
                res.status(200).json({
                    count: references.length,
                    references: references
                });
            } else {
                res.json({message: "No references found"});
            }
        })
        .catch(err => console.log(err));
});


router.get('/:specifiqueId',  (req, res) => {
    let SpecId = req.params.specifiqueId;

    database.table('reference as r')
        .withFields([
            'r.ID_REFERENCE',
            'r.PRODUIT',
            'r.NOM_REFERENCE',
            'r.IMAGE',
            'r.DESCRIPTION',
        ])

        .filter({'r.ID_REFERENCE': SpecId})
        .get()
        .then(references => {
            if (references) {
                res.status(200).json({
                    count: references.length,
                    references: references
                });
            } else {
                res.json({message: "No references found"});
            }
        })
        .catch(err => console.log(err));
});


router.get('/produit/:prodId',  (req, res) => {
    let productId = req.params.prodId;

    database.table('reference as r')
        .withFields([
            'r.ID_REFERENCE',
            'r.PRODUIT',
            'r.NOM_REFERENCE',
            'r.IMAGE',
            'r.DESCRIPTION',
        ])

        .filter({'r.PRODUIT': productId})
        .getAll()
        .then(references => {
            if (references) {
                res.status(200).json({
                    count: references.length,
                    references: references
                });
            } else {
                res.json({message: "No references found"});
            }
        })
        .catch(err => console.log(err));
});



module.exports = router;

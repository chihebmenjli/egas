const express = require('express');
const router = express.Router();
const { database } = require('../config/helpers');


router.get('/specification/:idReference', function (req, res) {
    const idReference = req.params.idReference;

    database.table('specification as s')
        .withFields([
            's.ID_SPECIFICATION',
            's.ID_REFERENCE',
            's.NOM',
            's.VALEUR'
        ])
        .filter({'s.ID_REFERENCE': idReference})
        .getAll()
        .then(specifications => {
            if (specifications.length > 0) {
                res.status(200).json({
                    count: specifications.length,
                    specifications: specifications
                });
            } else {
                res.json({message: "No specifications found for the given reference"});
            }
        })
        .catch(err => console.log(err));
});

router.get('/produit/:idReference', function (req, res) {
    const idReference = req.params.idReference;

    database.table('specification as s')
        .join ([

                { table : "reference as r ",
                    on : "r.ID_REFERENCE = s.ID_REFERENCE" ,
                },
                { table : "produit as p ",
                    on : "p.ID_PRODUIT = r.PRODUIT" ,
                },
                { table : "categorie as c ",
                   on : "c.ID_CATEGORIE = p.CATEGORIE" ,
                },
                {  table : "famille as f ",
                   on : "f.ID_FAMILLE = p.FAMILLE" ,
                }

            ]

        )

        .withFields([
            'p.NOM_PRODUIT', 'c.NOM_CATEGORIE ',
            ' f.NOM_FAMILLE', ' r.NOM_REFERENCE',
            'r.IMAGE' , 'p.IMAGE as IMGproduit',  'r.DESCRIPTION' , ' p.DOCUMENT' , ' p.IMG_DOCUMENT ' ,
            'p.ID_PRODUIT' , 'p.CATEGORIE as ID_CATEGORIE ' , ' p.FAMILLE as ID_FAMILLE ' ,


            's.ID_SPECIFICATION',
            's.ID_REFERENCE',
            's.NOM',
            's.VALEUR'
        ])
        .filter({'s.ID_REFERENCE': idReference})
        .getAll()
        .then(specifications => {
            if (specifications.length > 0) {
                res.status(200).json({
                    count: specifications.length,
                    specifications: specifications

                });
            } else {
                res.json({message: "No specifications found for the given reference"});
            }
        })
        .catch(err => console.log(err));
});


router.get('/reference/:idReference', function (req, res) {
    const idReference = req.params.idReference;

    database.table('specification as s')
        .join ([



            ]

        )

        .withFields([

            's.ID_SPECIFICATION',
            's.ID_REFERENCE',
            's.NOM',
            's.VALEUR'
        ])
        .filter({'s.ID_REFERENCE': idReference})
        .getAll()

        .then(specifications => {
            if (specifications.length > 0) {
                res.status(200).json({
                    count: specifications.length,
                    specifications: specifications
                });
            } else {
                res.json({message: "No specifications found for the given reference"});
            }
        })
        .catch(err => console.log(err));
});




    router.get('/prod/:idProduit', function (req, res) {
            const idProduit = req.params.idProduit;

            const query = `
        SELECT
            r.ID_REFERENCE,
            r.PRODUIT,
            r.NOM_REFERENCE,
            r.IMAGE,
            r.DESCRIPTION,
            CONCAT('[', GROUP_CONCAT(
                JSON_OBJECT(
                    'ID_SPECIFICATION', s.ID_SPECIFICATION,
                    'ID_REFERENCE', s.ID_REFERENCE,
                    'NOM', s.NOM,
                    'VALEUR', s.VALEUR
                )
            ), ']') AS specifications
        FROM
            reference AS r
            INNER JOIN specification AS s ON r.ID_REFERENCE = s.ID_REFERENCE
        WHERE
            r.PRODUIT = ${idProduit}
        GROUP BY
            r.ID_REFERENCE;
    `;

            database.query(query)
                .then(results => {
                    if (results.length > 0) {
                        const references = results.map(row => ({
                            ID_REFERENCE: row.ID_REFERENCE,
                            PRODUIT: row.PRODUIT,
                            NOM_REFERENCE: row.NOM_REFERENCE,
                            IMAGE: row.IMAGE,
                            DESCRIPTION: row.DESCRIPTION,
                            specifications: JSON.parse(row.specifications)
                        }));

                        res.status(200).json({ references });
                    } else {
                        res.json({ message: 'No references found for the given product ID' });
                    }
                })
                .catch(error => {
                    res.status(500).json({ error: 'An error occurred while retrieving references' });
                });
        });



// affiche tous les NOM de specification
router.get('/prod/nom_specification/:idProduit', function (req, res) {
    const idProduit = req.params.idProduit;

    const query = `
        SELECT
             s.NOM  ,
                   
                       CONCAT('[', GROUP_CONCAT(
                JSON_OBJECT(
                  
                    'VALEUR', s.VALEUR
                ) 
            ), ']') AS specifications
        FROM
            reference AS r
            INNER JOIN specification AS s ON r.ID_REFERENCE = s.ID_REFERENCE
        WHERE
           r.PRODUIT= ${idProduit}  
         GROUP BY
            s.NOM
       
    `;

    database.query(query)
        .then(results => {
            if (results.length > 0) {
                res.status(200).json({
                    count: results.length,
                    specification: results
                });
            } else {
                res.json({message: "No specifications found for the given reference"});
            }
        })
        .catch(err => console.log(err));
});



router.get('/prod/:idProduit/:nomgroup', function (req, res) {
    const idProduit = req.params.idProduit;
    const nomgroupe = req.params.nomgroup;

    const query = `
        SELECT
            r.ID_REFERENCE,
            r.PRODUIT,
            r.NOM_REFERENCE,
            r.IMAGE,
            r.DESCRIPTION,
            CONCAT('[', GROUP_CONCAT(
                JSON_OBJECT(
                    'ID_SPECIFICATION', s.ID_SPECIFICATION,
                    'ID_REFERENCE', s.ID_REFERENCE,
                    'NOM', s.NOM,
                    'VALEUR', s.VALEUR
                )
            ), ']') AS specifications
        FROM
            reference AS r
            INNER JOIN specification AS s ON r.ID_REFERENCE = s.ID_REFERENCE
        WHERE
            r.PRODUIT = ${idProduit} and s.NOM ='${nomgroupe}'
        GROUP BY
            r.ID_REFERENCE;
    `;

    database.query(query)
        .then(results => {
            if (results.length > 0) {
                const references = results.map(row => ({
                    ID_REFERENCE: row.ID_REFERENCE,
                    PRODUIT: row.PRODUIT,
                    NOM_REFERENCE: row.NOM_REFERENCE,
                    IMAGE: row.IMAGE,
                    DESCRIPTION: row.DESCRIPTION,
                    specifications: JSON.parse(row.specifications)
                }));

                res.status(200).json({ references });
            } else {
                res.json({ message: 'No references found for the given product ID' });
            }
        })
        .catch(error => {
            res.status(500).json({ error: 'An error occurred while retrieving references' });
        });
});



        module.exports = router;

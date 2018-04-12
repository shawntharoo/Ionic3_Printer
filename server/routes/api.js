const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const dbCon = require('../db');

let response = {
    status : 200,
    data : [],
    message : null
}

router.get('/products', function(req, res) {
    var products = [
        {
            id: 1,
            name: 'laptop'
        },
        {
            id: 2,
            name: 'microwave'
        }
    ];
    res.send({ products: products });
});

router.get('/getSelectedPlace', (req,res) => {
   dbCon.connection((db) => {
    db.collection('users').findOne({}, function (findErr, result) {
        if (findErr) throw findErr;
        console.log(result);
      });
    });
});

router.get('/getAllPlaces', (req,res) => {
    dbCon.connection((db) => {
     db.collection('users').find({})
     .toArray((err, docs) => {
         console.log(docs);
     })
     });
 });

 router.get('/addNewPlace', (req,res) => {
    dbCon.connection((db) => {
     db.collection('users').insertOne({name : "robert"},function(err, docs){
         console.log(docs);
     });
     });
 });

 router.get('/users', (req,res) => {
    dbCon.connection((db) => {
     db.collection('users').insert([{name : "insert1"},{name : "insert2"},{name : "insert3"}],function(err, docs){
         console.log(docs);
     });
     });
 });





module.exports = router;
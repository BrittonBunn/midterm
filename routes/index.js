var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var Product = mongoose.model('Product');

router.get('/', function(req, res, next) {
    res.sendFile('customer.html', {root: 'public'});
});

router.post('/products', function(req, res, next) {//Create for CRUD
    var product = new Product(req.body);
    product.save(function(err, product){
        if(err){ return next(err); }
        res.json(product);
    });
});

router.get('/products', function(req, res, next) {//Read for CRUD
    Product.find(function(err, products){
        if(err){ return next(err); }
        res.json(products);
    });
});


router.param('product', function(req, res, next, id) {
    var query = Product.findById(id);
    query.exec(function(err, product) {
        if (err) { return next(err);}
        req.product = product;
        return next();
    });
});

router.get('/products/:product', function(req, res) {//Also read for CRUD
    res.json(req.product);
});

router.put('/products/:product/purchase', function(req, res, next) {//Update for CRUD
    req.product.purchase(function(err, product){
        if (err) { return next(err); }
        res.json(product);
    });
});


router.delete('/products/:product', function(req, res) {//Delete for CRUD
    req.product.remove();
    res.sendStatus(200);
});

module.exports = router;
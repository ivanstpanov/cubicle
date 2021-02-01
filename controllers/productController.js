const { Router } = require('express'); 
const router = Router();  
const productService = require('../services/productServices')
router.get('/', (req, res) => { 
    let products = productService.getAll();
    res.render('home', {title :'Browse' , products});
}); 
router.get('/create', (req, res) => {
    res.render('create', {title :'Create'});
}); 
router.post('/create', validateProduct, (req,res) => {  
    productService.create(req.body, (err) => { 
        if (err) {
            return res.status('500').end();
        }
        res.redirect('/products')
    })
    res.redirect('/products')
})
router.get('/details/:productId', (req, res) => { 
    let product = productService.getOne(req.params.productId);
    res.render('details', {title :'Product Details', product});
}); 

function validateProduct(req,res,next){
    let isValid = true; 
    if (req.body.name.trim().lenght < 2) {
        isValid = false;
    } else if (!req.body.imageUrl) {
        isValid = false;
    } 
    if (isValid) {
        next();
    }
}

module.exports = router;
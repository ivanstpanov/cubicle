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
router.post('/create', (req,res) => {  
    productService.create(req.body)
    res.redirect('/products')
})
router.get('/details/:productId', (req, res) => {
    res.render('details', {title :'Details'});
}); 

module.exports = router;
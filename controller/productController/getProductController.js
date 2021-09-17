const Product = require('../../models/Product');

const getProduct = async (req, res) => {

    try {

        const products = await Product.find();
        // empty products
        if (products.length == 0) {
            
            let products = [];
            let categories = [];
            let companies = [];
            return res.render('index', {products, categories, companies});

        } else {
            
            const categories = req.category;
            const companies = req.company;
        
            return res.render('index', { products, categories, companies});
        }

    } catch (err) {
        
        console.log(err);
        return res.render('notFound');
    }
    
}

module.exports = getProduct;
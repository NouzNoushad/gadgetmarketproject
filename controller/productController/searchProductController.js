const Product = require('../../models/Product');

const searchProduct = async (req, res) => {
    
    try {

        const categories = req.category;
        const companies = req.company;

        let products = await Product.find();

        //filter products
        const productCategory = req.body.category;
        const productCompany = req.body.company;

        let filterProducts = await products.filter((product) => {

            return (productCategory === product.category) && (productCompany === product.company);

        });

        if ((productCategory === 'All') && (productCompany === 'All')) {
            
            filterProducts = products;
        }

        else if ((productCategory === 'All') && (productCompany !== 'All')) {

            filterProducts = await products.filter((product) => productCompany === product.company);
        }

        else if ((productCompany === 'All') && (productCategory !== 'All')) {
            
            filterProducts = await products.filter((product) => productCategory === product.category);
            
        }
        
        res.render('index', { products: filterProducts, categories: categories, companies: companies});

    } catch (err) {
        
        console.log(err);
        return res.render('notFound');
        
    }   

}

module.exports = searchProduct;
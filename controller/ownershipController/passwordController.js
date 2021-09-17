const Product = require('../../models/Product');

const ownerCreateProduct = (req, res) => {

    try {

        let errors = [];
        return res.render('password', {errors});

    } catch (err) {
        
        console.log(err);
        return res.render('notFound');
    }

}

const ownerEditProduct = async (req, res) => {

    try {
        
        let errors = [];
        const product = await Product.findById(req.params.id);
        return res.render('passwordEdit', { product, errors });

    } catch (err) {
        
        console.log(err);
        return res.render('notFound');
    }
    
}

const postOwnerCreateProduct = (req, res) => {

    return res.redirect('/products/create');
}

const postOwnerEditProduct = (req, res) => {

    return res.redirect(`/products/update/${req.params.id}`);
}

module.exports = {
    
    ownerCreateProduct,
    ownerEditProduct,
    postOwnerCreateProduct,
    postOwnerEditProduct
}
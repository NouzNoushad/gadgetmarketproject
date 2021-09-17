const Product = require('../../models/Product');

const deleteProduct = async (req, res) => {

    try {
        
        const product = await Product.findOneAndRemove({ _id: req.params.id });
        req.flash('success_msg', `${product.name} has been deleted successfully`);
        res.redirect('/products');

    } catch (err) {
        
        console.log(err);
        return res.render('notFound');
    }
}

module.exports = deleteProduct;
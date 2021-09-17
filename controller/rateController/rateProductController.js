const Rating = require('../../models/Rating');
const Product = require('../../models/Product');

const rateProduct = async (req, res) => {

    try {
        
        let errors = [];
        const product = await Product.findById(req.params.id);
        res.render('rating', { product: product, errors: errors });

    } catch (err) {
        
        console.log(err);
        return res.render('notFound');
    }

}

const postRateProduct = async (req, res) => {

    try {
        
        let errors = [];
        const product = await Product.findById(req.params.id);

        //validations
        const { username, rating, review, message } = req.body;

        //check all fields
        if (!username || !rating || !(review || message)) {
            
            errors.push({ message: 'All fields are required' });
        }

        //rating is not a number
        if (rating && (!Number(rating))) {
            
            errors.push({ message: 'Rating should not allow string value' });
        }

        //rating limited upto 5
        if (rating > 5) {
            
            errors.push({ message: 'Rating should be atleast 5' });
        }

        //review limited to 20 characters
        if (review.length > 20) {
            
            errors.push({ message: 'Expect breif review donot exceed 20 characters' });
        }

        //errors
        if (errors.length > 0) {
            
            return res.render('rating', { errors, product });

        } else {
            
            //create new rating
            req.body.product = req.params.id;
            await Rating.create(req.body);
 
            req.flash('success_msg', `${username} has rated the product successfully`);
            return res.redirect(`/products/details/${req.params.id}`);
        }

    } catch (err) {
        
        console.log(err);
        return res.render('notFound');

    }
}

module.exports = {
    
    rateProduct,
    postRateProduct,

}
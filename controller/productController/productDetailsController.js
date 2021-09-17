const Product = require("../../models/Product");
const Rating = require('../../models/Rating');

const productDetails = async (req, res) => {

    try {
        
        // Find total ratings of users
        let totalRating = 0;

        const usersRatedProduct = await Rating.find();
        const usersRating = usersRatedProduct.filter(userRating => userRating.product == req.params.id);
        const rating = usersRating.map(ratings => ratings.rating)
        const ratingSum = rating.reduce((acc, curr) => {

            totalRating++;
            return acc + curr;

        }, totalRating);

        let averageRatings = (ratingSum / totalRating).toString().slice(0, 3);

        if (isNaN(averageRatings)) {
            
            averageRatings = 5;
        }

        // Find product
        const product = await Product.findById(req.params.id);

        product.rating = averageRatings;
        await product.save();

        // Find user rating
        const usersReviews = await Rating.find().sort({ date: 'desc' });
        
        res.render('details', {

            product: product,
            averageRatings: averageRatings,
            usersReviews: usersReviews,
            customers: totalRating
        });

    } catch (err) {
        
        console.log(err);
        return res.render('notFound');
    }

}

module.exports = productDetails;
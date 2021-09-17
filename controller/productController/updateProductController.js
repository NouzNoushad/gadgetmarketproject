const { v4: uuidv4 } = require('uuid');

const Product = require('../../models/Product');
const File = require('../../models/File');

//Update product
const updateProduct = async (req, res) => {

    try {

        let errors = [];
        const product = await Product.findById( req.params.id );
        res.render('update', { product: product, errors: errors});

    } catch (err) {

        console.log(err);
        return res.render('notFound');
    }
    
}

//Post update product
const postUpdateProduct = async (req, res) => {

    req.upload(req, res, async (err) => {

        try {

            const product = await Product.findById(req.params.id);

            if (err) {
                
                res.status(500).send({ err: err.message });
            }

            if (req.file) {
                
                req.file.uuid = uuidv4();
                const image = await File.create(req.file);
                product.image = image.filename;
                await product.save();

            }

            const { name, price, company, category, image, description } = req.body;

            //validations
            let errors = [];

            //check all fields
            if (!name || !price || !company || !category || !description) {
                
                errors.push({ message: 'All fields are required' });
            }

            //price limited to 12 digits
            if (price.length > 12) {
                
                errors.push({ message: 'Price should exceed 12 digits' });
            }

            //errors
            if (errors.length > 0) {
                
                return res.render('update', { errors, product });

            } else {
                
                //capitalize
                String.prototype.capitalize = function(){

                    return this.charAt(0).toUpperCase() + this.slice(1);
                }

                //Image updated and save product
                const product = await Product.findOneAndUpdate({ _id: req.params.id },
                    {
                        $set: {
                            image,
                            name,
                            price,
                            company: company.capitalize(),
                            category: category.capitalize(),
                            description
                        }
                });
                
                req.flash('success_msg', `${product.name} has been updated successfully`);
                return res.redirect('/products');

            }

        } catch (err) {

            console.log(err);
            return res.render('notFound');

        }
            
    });

}

module.exports = {
    
    updateProduct,
    postUpdateProduct

}
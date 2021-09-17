const { v4: uuidv4 } = require('uuid');

const Product = require('../../models/Product');
const File = require('../../models/File');

//Create new product
const createProduct = (req, res) => {
    
    try {
        
        let errors = [];
        res.render('create', { errors: errors });

    } catch (err) {
        
        console.log(err);
        return res.render('notFound');
    }
}

//Post create product
const postCreateProduct = async (req, res) => {

    req.upload(req, res, async (err) => {

        try {

            let errors = [];

            //Handle req from file
            if (err) {
                
                res.status(500);
                errors.push({ message: err.message});
            
            }

            if (req.file) {
                
                //create new file
                const file = new File({

                    filename: req.file.filename,
                    path: req.file.path,
                    size: req.file.size,
                    uuid: uuidv4()
                });

                //response
                await file.save();

            } else {
                
                errors.push({ message: 'Please upload an Image' });

            }
        
            //Handle req from body
            const { name, category, company, price, description } = req.body;

            //check all fields
            if (!name || !category || !company || !price || !description || !req.file) {

                errors.push({ message: 'All fields are required' });

            }

            //price limited to 12 digits
            if (price.length > 12) {
                
                errors.push({ message: 'Price shouldnot exceed 12 digits' });
            }
            
            //errors
            if (errors.length > 0) {
                
                res.render('create', { errors: errors });

            }
            else { 

                //capitalize string
                String.prototype.capitalize = function () {
                    return this.charAt(0).toUpperCase() + this.slice(1);
                }

                //create new product
                const newProduct = new Product({

                    name,
                    category: category.capitalize(),
                    company: company.capitalize(),
                    price,
                    description,
                    image: req.file.filename
                });
                
                const product = await newProduct.save();

                req.flash('success_msg', `${product.name} has been created successfully`);
                res.redirect('/products');
                
            }
            

        } catch (err) {
            
            console.log(err);
            return res.render('notFound');
        }
        
    })

}

module.exports = {
    
    postCreateProduct,
    createProduct
}
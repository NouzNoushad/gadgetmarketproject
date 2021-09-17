const Owner = require('../../models/Owner');
const bcrypt = require('bcrypt');

const createOwner = (req, res) => {

    try {
        
        let errors = [];
        return res.render('ownership', {errors});

    } catch (err) {
        
        console.log(err);
        return res.render('notFound');
    }
}

const postCreateOwner = async (req, res) => {

    try {
        
        let errors = [];
        //validations
        const { name, email, password, profession, company, details } = req.body;

        //check all fields
        if (!name || !email || !password ) {
            
            errors.push({ message: 'All fields are required' });
        }

        //password limited to 5 characters
        if (password.length > 5) {
            
            errors.push({ message: 'Password should be atleast 5 characters' });
        }

        //errors
        if (errors.length > 0) {
            
            return res.render('ownership', { errors });

        } else {
            
            //owner exists
            const owner = await Owner.findOne({ email: email });
            if (owner) {
                
                errors.push({ message: 'Email already exists' });
                return res.render('ownership', { errors });

            } else {
                
                //create new Owner
                const newOwner = new Owner({

                    name,
                    email,
                    password,
                    profession,
                    company,
                    details
                });

                //bcrypt
                bcrypt.genSalt(10, (err, salt) => {

                    bcrypt.hash(newOwner.password, salt, async (err, hash) => {

                        if (err) throw err;

                        //hash password
                        newOwner.password = hash;

                        //save owner
                        await newOwner.save();

                        req.flash('success_msg', `${name} has owned the Website.`)
                        return res.redirect('/products');
                    });
                })
            }
        }

    } catch (err) {
        
        console.log(err);
        return res.render('notFound');
    }
}

module.exports = {
    
    createOwner,
    postCreateOwner
}
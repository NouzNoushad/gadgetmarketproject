const Owner = require('../models/Owner');
const bcrypt = require('bcrypt');

const ownerValidation = async (req, res, next) => {

        try {
        
            let errors = [];
            //validation
            const { email, password } = req.body;

            //check password
            if (!email || !password) {
            
                errors.push({ message: 'All fields are required' });
            }
            //password limited to 5
            if (password.length > 5) {
            
                errors.push({ message: 'Password should atleast 5 characters' });
            }

            //errors
            if (errors.length > 0) {
            
                return res.render('password', { errors });

            } else {

                const owner = await Owner.findOne({ email: email });

                if (!owner) {
                
                    errors.push({ message: 'Invalid Email. Owner doesnot exist' });
                    return res.render('password', { errors });

                } else {
                
                    // bcrypt password match
                    bcrypt.compare(password, owner.password, (err, match) => {

                        if (err) throw err;

                        if (match) {
                    
                            return next();

                        } else {
                        
                            errors.push({ message: 'Invalid password.' });
                            return res.render('password', { errors });
                        }
                    })

                }

            }

        } catch (err) {
        
            console.log(err);
            return res.render('notFound');
        }

}

module.exports = ownerValidation;

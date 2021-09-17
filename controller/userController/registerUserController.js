const bcrypt = require('bcrypt');

const User = require('../../models/User');

const registerUser = (req, res) => {
    
    try {
        
        const errors = [];
        return res.render('register', { errors: errors });

    } catch (err) {
        
        console.log(err);
        return res.render('notFound');
    }

}

const postRegisterUser = async (req, res) => {

    try {

        const { name, email, password, confirmPassword } = req.body;

        //validations
        let errors = [];

        //check all fields
        if (!name || !email || !password || !confirmPassword) {
                
            errors.push({ message: 'All fields are required' });
        }

        //check password matchs
        if (password !== confirmPassword) {
                
            errors.push({ message: 'Incorrect Confirm Password' });
        }

        //password limit to 10 characters
        if (password.length >= 10) {
                
            errors.push({ message: 'Password should be atleast 10 characters' });
        }

        //errors exist
        if (errors.length > 0) {
                
            res.render('register', {
                errors,
                name,
                email,
                password,
                confirmPassword
            });

        } else {

            const user = await User.findOne({ email: email });

            //user exist
            if (user) {
                
                errors.push({ message: 'User already exists' });
                res.render('register', {
                    errors
                });

            } else {
                
                //create new user
                const newUser = new User({

                    name,
                    email,
                    password

                });

                //bcrypt password
                bcrypt.genSalt(10, (err, salt) => {

                    bcrypt.hash(newUser.password, salt, async (err, hash) => {

                        //err
                        if (err) throw err;

                        //hash password
                        newUser.password = hash;

                        //save user
                        await newUser.save();
                        req.flash('success_msg', 'You are now registered and Please login');
                        res.redirect('/products/login');

                    });
                });
            }
        }

    } catch (err) {
                
        console.log(err);
        return res.render('notFound');

    }
      
    
}

module.exports = {
    registerUser,
    postRegisterUser
}

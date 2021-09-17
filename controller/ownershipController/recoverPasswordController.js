const Owner = require('../../models/Owner');
const bcrypt = require('bcrypt');

const recoverPassword = (req, res) => {

    try {
        
        let errors = [];
        return res.render('recover', {errors});

    } catch (err) {
        
        console.log(err);
        return res.render('notFound');
    }
}

const postRecoverPassword = async (req, res) => {

    try {

        let errors = [];
        //validations
        const { email, password } = req.body;

        //check all fields
        if (!email || !password) {
            
            errors.push({ message: 'All fields are required' });

        }
        //password length limited to 5
        if (password.length > 5) {
            
            errors.push({ message: 'Password should be atleast 5 characters' });
        }

        if (errors.length > 0) {
            
            return res.render('recover', { errors });

        } else {
            
            const owner = await Owner.findOne({ email: email });
            //create new password
            owner.password = password;
            //bcrypt
            bcrypt.genSalt(10, (err, salt) => {

                bcrypt.hash(owner.password, salt, async (err, hash) => {

                    if (err) throw err;

                    owner.password = hash;

                    //save owner details
                    await owner.save();
                    req.flash('success_msg', `${owner.name} has updated his password`);
                    return res.redirect('/products');
                })
            })
            
        }

    } catch (err) {
        
        console.log(err);
        return res.render('notFound');
    }
}

module.exports = {

    recoverPassword,
    postRecoverPassword
}
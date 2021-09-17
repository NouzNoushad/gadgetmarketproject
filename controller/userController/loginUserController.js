const passport = require('passport');

const loginUser = (req, res) => {

    try {
        
        const errors = [];
        return res.render('login', { errors: errors });

    } catch (err) {
        
        console.log(err);
        return res.render('notFound');

    }
    
}

const postLoginUser = passport.authenticate('local', {

    successRedirect: '/products',
    failureRedirect: '/products/login',
    failureFlash: true

});

module.exports = {

    loginUser,
    postLoginUser

}
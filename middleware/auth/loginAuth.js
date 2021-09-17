const loginAuth = (req, res, next) => {

    if (req.isAuthenticated()) {

        res.redirect('/products');

    }

    return next();
}

const ensureAuth = (req, res, next) => {

    if (req.isAuthenticated()) {
        
        return next();
    }

    res.redirect('/products/login');
}

module.exports = {

    loginAuth,
    ensureAuth

}
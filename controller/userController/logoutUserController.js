const logoutUser = (req, res) => {

    try {
        
        req.logout();
        req.flash('success_msg', 'You are logged out');
        return res.redirect('/products');

    } catch (err) {
        
        console.log(err);
        return res.render('notFound');
    }
}

module.exports = logoutUser;
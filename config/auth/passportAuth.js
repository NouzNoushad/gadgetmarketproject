const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const User = require('../../models/User');

const passportAuth = (passport) => {

    passport.use(new localStrategy({ usernameField: 'email' },
        
        (email, password, done) => {

            try {
                
                User.findOne({ email: email }, (err, user) => {
                
                    //err
                    if (err) return done(err);

                    //user doesn't exist
                    if (!user) {

                        return done(null, false, { message: 'Email is not registered' });
                    }

                    //bcrypt compare password
                    bcrypt.compare(password, user.password, (err, match) => {

                        //err
                        if (err) return done(err);

                        //match password
                        if (match) {
                        
                            return done(null, user);

                        } else {
    
                            return done(null, false, { message: 'Incorrect Password' });
                        }
                    });

                });
            
            } catch (err) {

                console.log(err);
                return res.render('notFound');
            }
        }
    ));

    //sessions
    passport.serializeUser((user, done) => {

        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {

        User.findById(id, (err, user) => {

            done(err, user);
        })
    });
}


module.exports = passportAuth;
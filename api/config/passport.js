import User from '../models/user';
import passport from 'passport';
import passportJWT from 'passport-jwt';
const config = require('../config/main');
const JwtStrategy = passportJWT.Strategy,
      ExtractJwt = passportJWT.ExtractJwt;

      //setup work and export for the JWT passport strategy
module.exports = function() {
    const opts = {};       
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = config.secret;
    const strategy = new JwtStrategy(opts, function(jwt_payload, done){
        User.findOne({_id: jwt_payload.user_id},function(err, user){
            if(err){
                return done(err, false);
            }
            if(user){
                done(null, user);
            }
            else{
                done(null, false);
            }
        });
    });
    passport.use(strategy);
    return{
        initialize: function(){
            return passport.initialize();
        },
        authenticate: function(){
            return  passport.authenticate("jwt", {session: false});
        }
    }
};
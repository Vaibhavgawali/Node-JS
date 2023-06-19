const express = require("express");
const app = express();
const session = require("express-session")
const passport = require("passport")
const port = 9800
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

app.use(session({
    secret: 'SUPERSECRET',
    resave: false,
    saveUninitialized: true
}))

app.use(passport.initialize())
app.use(passport.session())
app.set('view engine', 'ejs')

app.get('/',(req,res)=>{
    res.send('<a href="/auth/google">Login with Google</a>')
})

app.get('/err',(req,res)=>{
    res.send("error whle logging in")
})

app.get('/profile',(req,res)=>{
    res.send(userprofile)
})
  
passport.deserializeUser((user, done)=> {
    done(null,user);
});

passport.serializeUser((user, done)=> {
    done(null, user);
});

passport.use(new GoogleStrategy({
    clientID: "294589700264-n2kbju3a40badda1ell6atfmok5gekss.apps.googleusercontent.com",
    clientSecret:"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",
    callbackURL: "http://localhost:9800/auth/google/callback"
},
    function (accessToken, refreshToken, profile, cb) {
        userprofile = profile;
        return cb(null, userprofile);
    }
));

app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile'] }));

app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/err' }),
    function (req, res) {
        res.redirect('/profile');
    });

app.listen(port,()=>{
    console.log(`listening on port ${port}`);
})
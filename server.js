import express from 'express';
import session from 'express-session';
import apiRoutes from './routes/indexRoutes.js';
import * as dotenv from 'dotenv';
import exphbs from 'express-handlebars';
// import passport from 'passport';
// import { Strategy as LocalStrategy } from 'passport-local';


dotenv.config();

const users = [];

const app = express();

app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
        //Expires in 10 (minutes)
        maxAge: 600000
    }
}))

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(express.static('public'));

app.engine('.hbs', exphbs({ extname: '.hbs', defaultLayout: 'main.hbs' }));

app.set('view engine', '.hbs');

app.use("/", apiRoutes);

// app.use(passport.initialize());

// app.use(passport.session());

// passport.use('register', new LocalStrategy({
//     usernameField: "name",
//     passwordField: "password",
//     emailField: "email",
//     passReqToCallback: true
//     }, (name, email, password, done) => {
    
//         const user = users.find(u => u.name === name)
    
//         if (user) {

//             return done('User already registered.')

//         } else {

//             const newUser = {
//                 name: name,
//                 email: email,
//                 password: password,
//             };
    
//             users.push(newUser);

//             console.log(users);

//             return done(null, newUser)
//         };
//     }
// ));

// passport.use('login', new LocalStrategy((name, email, password, done) => {
//     const user = users.find(u => u.name === name)

//     if (!user) {
//         return done(null, false)
//     }

//     if (user.password !== password) {
//         return done(null, false)
//     }

//     if (user.email !== email) {
//         return done(null, false)
//     }

//     user.contador = 0;

//     return done(null, user)
//     }
// ));

// passport.serializeUser(function (user, done) {
//     done(null, user.name);
// });

// passport.deserializeUser(function (name, done) {
//     const user = users.find(u => u.name === name)
//     done(null, user);
// });




const PORT = process.env.PORT;

const server = app.listen(PORT, () => {
    console.log(`Server started on port http://localhost:${PORT}. at ${new Date().toLocaleString()}`)
});

server.on("error", (err) => {
    console.log(err);
})
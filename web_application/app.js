import express from 'express';
import exphbs from "express-handlebars";
const app = express();
import configRoutesFunction from './routes/index.js';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const staticDir = express.static(__dirname + '/public');
import session from 'express-session';

app.use(session({
    name: 'AuthState',
    secret: 'some secret string!',
    resave: false,
    saveUninitialized: false
}));

const handlebarsInstance = exphbs.create({
    defaultLayout: 'main',
    helpers: {
      asJSON: (obj, spacing) => {
        if (typeof spacing === 'number')
          return new Handlebars.SafeString(JSON.stringify(obj, null, spacing));
  
        return new Handlebars.SafeString(JSON.stringify(obj));
      }
    },
  });

app.use('/', (req, res, next) => {
    let time = new Date().toUTCString();
    let requestMethod = req.method;
    let requestRoute = req.originalUrl;
    let authenticated = req.session.user ? 'Authenticated User' : 'Non-Authenticated User';
    console.log(`[${time}]: ${requestMethod} ${requestRoute} (${authenticated})`); // source: chatGPT
    if (req.path == '/') {
        if (req.session.user) {
            res.redirect('/home');
        } else {
            return res.redirect('/login');
        }
    } else {
        next();
    }
});

app.use('/login', (req, res, next) => {
    if (req.session.user) {
        return res.redirect('/home');
    } else {
        next();
    }
});

app.use('/home', (req, res, next) => {
    if (!req.session.user) {
        return res.redirect('/login');
    } else {
        next();
    }
});

app.use('/logout', (req, res, next) => {
    if (!req.session.user) {
        return res.redirect('/login');
    } else {
        next();
    }
});

app.use(express.json());
app.use('/public', staticDir);
app.use(express.urlencoded({extended: true}));


configRoutesFunction(app);
// app.engine('handlebars', handlebarsInstance.engine);
app.engine('handlebars', exphbs.engine({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');



app.listen(3000, () => {
    console.log("Your routes will be runing on http://localhost:3000");
});
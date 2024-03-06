import express from 'express';
import exphbs from "express-handlebars";
const app = express();
import configRoutesFunction from './routes/index.js';

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

configRoutesFunction(app);
app.engine('handlebars', handlebarsInstance.engine);
app.set('view engine', 'handlebars');


app.listen(3000, () => {
    console.log("Your routes will be runing on http://localhost:3000");
});
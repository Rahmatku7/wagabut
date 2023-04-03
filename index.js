const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const config = require("./src/configs/app.js");
const router = require("./src/configs/router.js");
const { helper } = require("./src/helpers/system.js");
const multer = require('multer');
const { create } = require('express-handlebars');
const upload = multer();
const app = express();

//Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded( { extended: true } ));
app.use(upload.array()); 

//Cookie Parser
app.use(cookieParser());

// ignore route public dir
app.use(express.static('public'));

//set template engine
const hbs = create({
    defaultLayout: false,
    helpers: helper('handlebars'),
    extname: '.html'
});

app.set('view engine', 'html');
app.set('views', './src/views');
app.engine('html', hbs.engine);

//set router
new router(app);

app.listen(process.env.PORT ?? config.port, () => console.log(`Server Running at http://localhost:${config.port}`));

module.exports = app
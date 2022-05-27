// required packages
const express = require('express');
const path = require('path');
const sequelize = require('./config/connection');
const session = require('express-session');
const sequelizeStore = require('connect-session-sequelize')(session.Store);
const routes = require('./controllers');
const helpers = require('./utils/helpers');

const app = express();
const PORT = process.env.PORT || 3001;

const exphbs = require('express-handlebars');
const hbs = exphbs.create({ helpers });

// setting up express session for user login/logout
const sess = {
    secret: 'secret key',
    cookie: {
        expires: 10 * 60 * 1000
    },
    resave: true,
    saveUninitialized: true,
    store: new sequelizeStore({
        db: sequelize
    })
};

// setting up express session handlebars
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(session(sess));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Port ${PORT} now listening!`));
});


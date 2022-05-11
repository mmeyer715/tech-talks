// required packages
const express = require('express');
const path = require('path');
const sequelize = require('./config/connection');
const session = require('express-session');
const exphbs = require('express-handlebars');
const sequelizeStore = require('connect-session-sequelize')(sessions.Store);
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
    secret: 'secret key',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new sequelizeStore({
        db: sequelize
    })
};

app.use(session(sess));

const hbs = exphbs.create({});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Port ${PORT} now listening!`));
});

// write CRUD routes
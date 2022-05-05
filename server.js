

// required packagese
const express = require('express');
const path = reqiure('path');
const sequelize = require('./config/connection');
const sessions = require('express-sessions');
const exphbs = require('express-handlebars');
const sequelizeStore = require('connect-session-sequelize')(sessions.Store);
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3001;

const session = {
    secret: 'secret key',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new sequelizeStore({
        db: sequelize
    })
};

app.use(sessions(session));

const hbs = exphbs.create({});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Port ${PORT} now listening!`));
});

// write CRUD routes
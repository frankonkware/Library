const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');
const sql = require('mssql');

const app = express();
const port = process.env.PORT || 3000;

const config = {
  user: 'Node',
  password: 'pass@123*',
  server: 'DESKTOP-G3H5G2E\\UNBOUND', // You can use 'localhost\\instance' to connect to named instance
  database: 'PSLibrary',
};

sql.connect(config).catch((err) => debug(err));

app.use(morgan('tiny'));

app.use((req, res, next) => {
  debug('my middleware');
  next();
});

app.use(express.static(path.join(__dirname, '/public/')));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));
app.set('views', './src/views');
app.set('view engine', 'ejs');

const nav = [
  { link: '/books', Title: 'Book' },
  { link: '/authors', Title: 'Author' }
];

const bookRouter = require('./src/routes/bookRoutes')(nav);

app.use('/books', bookRouter);
app.use('/authors', bookRouter);

app.get('/', (req, res) => {
  res.render(
    'index',
    {
      nav: [{ link: '/books', Title: 'Books' },
        { link: '/authors', Title: 'Authors' }],
      title: 'Library'
    }
  );
});

app.listen(port, () => {
  debug(`Listening on port  ${chalk.green(port)}`);
});

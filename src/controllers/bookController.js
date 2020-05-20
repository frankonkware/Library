/* eslint-disable linebreak-style */
const { MongoClient, ObjectID } = require('mongodb');
const debug = require('debug')('app:bookController');

function bookController(bookService, nav) {
  function getIndex(req, res) {
    const url = 'mongodb://library:QyL8cZDlHh9llGN7@ds151124.mlab.com:51124/heroku_tk7cnp1d';
    const dbName = 'heroku_tk7cnp1d';

    (async function mongo() {
      let client;
      try {
        client = await MongoClient.connect(url);
        debug('Connected correctly to server');

        const db = client.db(dbName);

        const col = await db.collection('books');

        const books = await col.find().toArray();
        res.render('bookListView',
          {
            nav,
            title: 'Library',
            books
          });
      } catch (err) {
        debug(err.stack);
      }

      client.close();
    }());
  }
  function getById(req, res) {
    const { id } = req.params;
    const url = 'mongodb://library:QyL8cZDlHh9llGN7@ds151124.mlab.com:51124/heroku_tk7cnp1d';
    const dbName = 'heroku_tk7cnp1d';

    (async function mongo() {
      let client;
      try {
        client = await MongoClient.connect(url);
        debug('Connected correctly to server');

        const db = client.db(dbName);

        const col = await db.collection('books');
        const book = await col.findOne({ _id: new ObjectID(id) });
        debug(book);

        book.details = await bookService.getBookById(book.bookId);
        res.render('bookView',
          {
            nav,
            title: 'Library',
            book
          });
      } catch (err) {
        debug(err.stack);
      }
    }());

    // res.send('Hellow Single Books');
  }
  function middleware(req, res, next) {
    // if (req.user) {
    next();
    // } else {
    //   res.redirect('/');
    // }
  }
  return {
    getIndex,
    getById,
    middleware
  };
}

module.exports = bookController;

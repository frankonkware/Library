var sql = require('mssql');

var sqlConfig = {
    user: 'Node',
    password: 'pass@123*',
    server: 'DESKTOP-G3H5G2E\\UNBOUND',  
    database: 'PSLibrary'
  };

  (async function () {
    try {
      console.log("sql connecting......")
      let pool = await sql.connect(sqlConfig)
      let result = await pool.request()
        .query('select * from books')  // subject is my database table name
  
      console.log(result )
  
    } catch (err) {
      console.log(err);
    }
  })()
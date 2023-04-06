knex = require('knex');

class database {

  static db = knex({
    client: 'mysql',
    connection: {
      host : '127.0.0.1',
      port : 3306,
      user : 'root',
      password : '',
      database : 'wagabut'
    }
  });

}

module.exports = database;
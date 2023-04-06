knex = require('knex');

class database {

  static db = knex;

  static table = this.db({
    client: 'mysql',
    connection: {
      host : 'localhost',
      port : 3306,
      user : 'panelwan_wzny',
      password : 'wahyuna67@',
      database : 'panelwan_wahyu'
    }
  });

}

module.exports = database;

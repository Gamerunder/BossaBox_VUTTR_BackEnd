const { dbMysql } = require('./.env')

module.exports = {
  client: 'mysql',
  connection: dbMysql,
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations'
  }
}

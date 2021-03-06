require('dotenv').config();

module.exports = {
  development: {
    username: 'postgres',
    database: 'school manager',
    password: 'profyem001',
    host: '127.0.0.1',
    dialect: 'postgres',
    port: 8080,
  },
  test: {
    username: 'postgres',
    password: 'profyem001',
    database: 'travis_db',
    host: '127.0.0.1',
    dialect: 'postgres',
    port: 5432,
  },
  production: {
    use_env_variable: 'DATABASE_URL',
  },
};

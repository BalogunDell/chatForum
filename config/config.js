require('dotenv').config();

module.exports = {
  development: {
    username: 'postgres',
    password: process.env.DB_PASSWORD,
    database: 'chatForum',
    dialect: 'postgres'
  },
  test: {
    username: 'postgres',
    password: process.env.DB_PASSWORD,
    database: 'chatForumTest',
    dialect: 'postgres'
  },
  production: {
    use_env_constiable: 'PRODUCTION_DB',
    dialect: 'postgres'
  }
};


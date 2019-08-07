const app = require('./app');
const knex = require('knex');
const { PORT } = require('./config');

const db = knex({
  client: 'mysql',
  connection: {
    host: `${process.env.MIGRATION_DB_HOST}`,
    user: `${process.env.MIGRATION_DB_USER}`,
    password: `${process.env.MIGRATION_DB_PASSWORD}`,
    database: `${process.env.MIGRATION_DB_NAME}`
  }
})

app.set('db', db)

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
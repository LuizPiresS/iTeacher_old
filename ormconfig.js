const path = require('path')

const DatabaseDirectory = path.join('src', 'database')

module.exports = {
  cli: {
    entitiesDir: path.join(DatabaseDirectory, 'entities'),
    migrationsDir: path.join(DatabaseDirectory, 'migrations'),
    subscribersDir: path.join(DatabaseDirectory, 'subscribers')
  }
}

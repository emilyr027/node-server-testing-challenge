// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    useNullAsDefault: true,
    migrations: { directory: './data/migrations' },
    seeds: { directory: './data/seeds' },
    connection: {
      filename: './data/projectdb.sqlite3'
    }
  },

  testing: {
    client: 'sqlite3',
    useNullAsDefault: true,
    migrations: { directory: './data/migrations' },
    seeds: { directory: './data/seeds' },
    connection: {
      filename: './data/projectdb.sqlite3'
    }
  },

  production: {
    
  }

};

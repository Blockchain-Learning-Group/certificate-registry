const argv = require('../argv');
const log = require('../logger');
const r = require('rethinkdb');
const { setup, createUsers, connect } = require('./index');

let conn;

/**
 * Initialize a new db connection and create setup the db where required.
 */
async function init() {
  try {
    log.info({ module: 'db' }, 'Creating new db connection...');

    const host = argv['db-host'];
    const port = argv['db-port'];

    conn = await connect(host, port);

    const dbName = argv['db-name'];
    conn = await setup(conn, dbName);

    log.info({ module: 'db' }, 'Successfully conncted to db.');
  } catch (err) {
    log.error({ module: 'db', err }, `db initilization error... ${err.message}`)
    throw err
  }
}


/**
 * Insert a new object into a table
 * @param {Object} data All required class data to hold
 * @param {String} table Table to insert into 
 */
async function insertObject(data, table) {
  const result = await r.table(table).insert(data).run(conn);
  const id = result['generated_keys'][0];

  return { id };
}

module.exports = {
  init,
  insertObject
};

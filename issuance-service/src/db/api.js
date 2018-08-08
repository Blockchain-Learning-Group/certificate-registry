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

    const host = process.env.DB_LOCATION || 'localhost';
    const port = process.env.DB_PORT || '28015';

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
 * Get an object from the db
 * @param {Object} filter The query filter
 * @param {String} table table to query within
 * @return {Cursor} the documents that were found, if any
 */
async function getObject(filter, table) {
  const cursor = await r.table(table).filter(filter).run(conn);
  return cursor;
}

/**
 * Get an object from the db
 * @param {Object} filter The query filter
 * @param {String} table table to query within
 * @param {Object} update the update to make
 * @return {Cursor} the documents that were found, if any
 */
async function updateObject(filter, table, update) {
  const res = await r.table(table).filter(filter).update(update).run(conn);
  return res;
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
  insertObject,
  getObject,
  updateObject
};

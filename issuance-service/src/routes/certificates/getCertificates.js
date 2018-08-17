const db = require('../../db/api');

/**
 * Get a certificate for a given identifier
 * @param {String} filter JSON.stringified objects, specific query for the certificates db
 * @return {Object} cert when it may be found
 */
module.exports = async function({ filter }) {
    const query = JSON.parse(filter);
    const cursor = await db.getObject(query, 'certificates');
    return await cursor.toArray();
}
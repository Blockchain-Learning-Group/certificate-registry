const argv = require('yargs')
  .option('api-url', { description: 'Location of the api to connect to', default: 'http://localhost:3000', type: 'string' })
  .option('db-host', { description: 'Host of database to connect to', default: 'localhost', type: 'string' })
  .option('db-port', { description: 'Port to connect to', default: 28015, type: 'number' })
  .option('db-name', { description: 'Name of database to create and use', default: 'blgCertifications', type: 'string' })
  .option('courseDescription', { description: 'Description of the course', default: '3-Day developer bootcamp', type: 'string' })
  .option('expiryDate', { description: 'Date the the cert expires, default is one year, in ms', default: ((new Date).setDate((new Date).getDate() + 365)), type: 'number' })
  .option('ipfs-host', { description: 'Host of the ipfs node to connect to', default: 'ipfs.infura.io', type: 'string' })
  .option('ipfs-port', { description: 'Port to connect to', default: 5001, type: 'number' })
  .option('server-port', { description: 'Port the server will run on', default: 3001, type: 'number' })
  .option('test-dir', { description: 'Test directory to execute', default: 'units', type: 'string' })
  .option('threads', { description: 'Number of service threads to create', default: 1, type: 'number' })
  .help('help')
  .argv

module.exports = argv

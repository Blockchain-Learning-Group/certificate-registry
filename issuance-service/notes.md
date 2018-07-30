# Testing

- need to have a rethink instance running: `docker-compose up rethinkdb`
- run test suite: `yarn test`

## Integration testing
- for automation with nothing running you may run `./scripts/integration-test.sh`
- you may set the build tag, BUILD_TAG, so run against a specific image is you wish,
will default to empty or latest is not specified
  * this can be done with the following: `BUILD_TAG=:test && export BUILD_TAG`  NOTE must inlude :


# API

## Classes
- createClass
  ```
  /**
  * Create a new class record
  * @param {Array} studentAddresses List of eth addresses 
  * @param {Array} studentNames List of full names
  * @param {String} description Short description of the course completed
  * @param {String} location Where the course took place
  * @param {Timestamp} expiryDate When the certification of this course expires
  */
  ```

## Certificates
- createCertificates
  ```
  /**
  * Create a new class record
  * @param {String} classIpfsHash Location of the information on the class this cert is regarding
  * @param {String} recipientName Full name
  * @param {Address} recipientAddress ETH Address
  * @param {String} issuingAuthority Full name
  * @param {Address} issuingAuthorityAddress ETH Address
  */
  ```
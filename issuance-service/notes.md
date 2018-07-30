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
- return
  ```
  body: { 
    dbId: 'c55bf4c6-63ff-4d35-8f86-cbf3f33ea0ae',
    merkleRoot: 'CDDA623B264BFBA196CCAC3BDBA76316B9C8B653DEE4A786154F0CADB2B29F00',
    ipfsHash: 'QmUVGD7MpgF1SZqs5jDmbSjgqGGSBSBKSaYVS71g7ZCHVs' 
  } 
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
  - return
    ```
    body: { 
      dbId: 'c55bf4c6-63ff-4d35-8f86-cbf3f33ea0ae',
      ipfsHash: 'QmUVGD7MpgF1SZqs5jDmbSjgqGGSBSBKSaYVS71g7ZCHVs' 
    } 
    ```

########
CLI Usage
########

- Start the rethinkdb: ``docker-compose up rethinkdb``
- Start issuance service: ``PRIV=f6f2827297cd95da7176533eceed3348a8690cc5211be84da4489e37fc63cdca docker-compose up issuance-service``
- Update the json of certificates to issue ``issuedCertificates/toIssue.json``
- Execute the script to issue the certs ``cd issuance-service && yarn issue-certs``


##########
App Usage
##########
- start rethink and issuance service: ``docker-compose up``
- start the app server: **NOTE set correct api url** ``cd app &&  REACT_APP_API_URL=http://localhost yarn start``


########
Testing
########

- need to have a rethink instance running: `docker-compose up rethinkdb`
- run test suite: `yarn test`

## Integration testing
- for automation with nothing running you may run `./scripts/integration-test.sh`
- you may set the build tag, BUILD_TAG, so run against a specific image is you wish,
will default to empty or latest is not specified
  * this can be done with the following: `BUILD_TAG=:test && export BUILD_TAG`  NOTE must inlude :


########
Data Models
########

Certificates
########

- DB Schema

.. code-block:: json

  {
      "location": "Toronto, Ontario, Canada",
      "description": "Blockchain Application Development Fundamentals",
      "issuingAuthority": "Blockchain Learning Group Inc.",
      "issuingAuthorityAddress": "0xCFE2Bd9F6B83D446FFcB911b7873685B35736815",
      "daysValidFor": "365",
      "recipient": {
          "firstNames": "Adam John",
          "lastName": "Lemmon",
          "email": "adamjlemmon@gmail.com",
          "address": "0xad72A42A278881311929DCE42D328CD1a4568Ac3"
      }
      ipfsHash: "QmVTbPZtnixAXXXWfG9ywKZozpaqdHcdhU4R5soyzhGJSw",
      signatures: {
        issuingAuthoritySignature: {},
        recipientSignature: {},
      }
  }

DB Queries
--------------
- Get: ``r.db('blgCertifications').table('certificates').filter({ recipientLastName: "Lemmon" })``


########
API
########

Certificates
########

POST issueCertificates { cert }
-------------------------------
  ```
  /**
  * Issue a new certificate to a successful student
  * @param {Object} cert 
  *  @param {String} cert.description 
  *  @param {Date} cert.expiryDate 
  *  @param {String} cert.recipient.firstNames 
  *  @param {String} cert.recipient.lastName
  *  @param {String} cert.recipient.email
  *  @param {Address} cert.recipient.address ETH Address
  *  @param {String} cert.issuingAuthority Full name
  *  @param {Address} cert.issuingAuthorityAddress ETH Address
  */
  ```
  - return
    ```
    body: { 
      dbId: 'c55bf4c6-63ff-4d35-8f86-cbf3f33ea0ae',
      ipfsHash: 'QmUVGD7MpgF1SZqs5jDmbSjgqGGSBSBKSaYVS71g7ZCHVs' 
    } 
    ```

- IPFS stored
.. code-block:: json

  {
    "location":"Toronto, Ontario, Canada",
    "description":"Blockchain Application Development Fundamentals",
    "issuingAuthority":"Blockchain Learning Group Inc.",
    "issuanceDate": "Mon Aug 06 2018 20:22:44 GMT-0400 (EDT)",
    "expiryDate": "Tue Aug 06 2019 20:22:44 GMT-0400 (EDT)",
    "recipient": {"firstNames":"Adam John","lastName":"Lemmon","email":"adamjlemmon@gmail.com","address":"0xad72A42A278881311929DCE42D328CD1a4568Ac3"},
    "signatures": {
      "issuingAuthoritySignature":{"message":"{\"location\":\"Toronto, Ontario, Canada\",\"description\":\"Blockchain Application Development Fundamentals\",\"issuingAuthority\":\"Blockchain Learning Group Inc.\",\"expiryDate\":2083002067965,\"recipient\":{\"firstNames\":\"Adam John\",\"lastName\":\"Lemmon\",\"email\":\"adamjlemmon@gmail.com\",\"address\":\"0xad72A42A278881311929DCE42D328CD1a4568Ac3\"}}","messageHash":"0x6ccd4b022cb44877e9e27e5726089d9472ae6936d69318668e61d94625448790","v":"0x1c","r":"0xdfb8cc5915ddee304a264a480da37b9785dd0f7cd245eeb7cb68c5e9b5d9fa38","s":"0x210553450807fe703e06ba9b80c78e82bd16c5a5f68429ef8d7b9bbccf94d664","signature":"0xdfb8cc5915ddee304a264a480da37b9785dd0f7cd245eeb7cb68c5e9b5d9fa38210553450807fe703e06ba9b80c78e82bd16c5a5f68429ef8d7b9bbccf94d6641c"},
      "recipientSignature":null
    }
  }

- GET getCertificates/:filter
-------------------------------
- request
- query params: ``filter: { recipientLastName: "Lemmon" }``
- Example:

 .. code-block:: javascript
  
      const res = await sendRequest(apiPath, `getCertificates/${ JSON.stringify(filter) }`);

- response: 

.. code-block:: console

  statusCode: 200
  body: [{ 
    description: 'Blockchain Application Development Fundamentals',                                   
    expiryDate: 2083005571587,                     
    id: '6cd04eea-1849-4336-a79a-594842a5f241',    
    ipfsHash: 'QmT51zhDVGSMHFXmFVMW6Ko5LFmpFAMExRYiY9dYqpy3ou',                                       
    issuingAuthority: 'Blockchain Learning Group Inc.',                                               
    issuingAuthorityAddress: '0xcfe2bd9f6b83d446ffcb911b7873685b35736815',                            
    location: 'Toronto, Ontario, Canada',          
    recipientAddress: '0xad72a42a278881311929dce42d328cd1a4568ac3',                                   
    recipientEmail: 'adamjlemmon@gmail.com',       
    recipientFirstNames: 'Adam John',              
    recipientLastName: 'Lemmon',                   
    signatures:                                    
     { issuingAuthoritySignature: [Object],        
       recipientSignature: null } 
  }]   








## Classes
########
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
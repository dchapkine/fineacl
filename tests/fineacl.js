let assert = require('assert');
let fineacl = require('../src/index.js');


describe('FineAcl', () => {

  describe('FineAcl#rel', () => {

    // check params existance
    it('should return null if userId param is missing', () => {
      assert.equal(null, fineacl().rel({
      }));
    })

    it('should return null if resourceType param is missing', () => {
      assert.equal(null, fineacl().rel({
        userId: 1234
      }));
    })
    
    it('should return null if resourceId param is missing', () => {
      assert.equal(null, fineacl().rel({
        userId: 1234,
        resourceType: "REPOSITORY"
      }));
    })
    
    it('should return null if roles param is missing', () => {
      assert.equal(null, fineacl().rel({
        userId: 1234,
        resourceType: "REPOSITORY",
        resourceId: 5678
      }));
    })

    it('should return "Relationship" class instance if all params are supplied', () => {
      assert.equal("Relationship", fineacl().rel({
        userId: 1234,
        resourceType: "REPOSITORY",
        resourceId: 5678,
        roles: ["READ", "REVIEW", "MERGE"]
      }).constructor.name);
    })

    // validate params values


  });



  describe('FineAcl#resource', () => {

    // check params existance
    it('should return null if name param is missing', () => {
      assert.equal(null, fineacl().resource());
    })

    it('should return null if params param is missing', () => {
      assert.equal(null, fineacl().resource("REPOSITORY"));
    })

    it('should return null if params.roles param is missing', () => {
      assert.equal(null, fineacl().resource("REPOSITORY", {
      }));
    })

    it('should return "Resource" class instance if all params are supplied with correct types', () => {
      assert.equal("Resource", fineacl().resource("REPOSITORY", {
        roles: {"READ": "", "REVIEW": "", "MERGE": ""}
      }).constructor.name);
    })

    // validate params values


  });

});


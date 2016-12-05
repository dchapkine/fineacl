let assert = require('assert');
let fineacl = require('../src/index.js');


describe('Relationship', () => {

  describe('Relationship#assert', () => {

    it("should callback with success=false on a role that is NOT assigned to this user" , () => {

      let rel = fineacl().rel({
        userId: 1234,
        resourceType: "REPOSITORY",
        resourceId: 5678,
        permissions: ["READ", "REVIEW", "MERGE"]
      });

      rel.assert((err, successChecking) => {
        assert.equal(false, successChecking);  
      })
      
    })

    it("should callback with success=true on a role that is assigned to this user" , () => {

      let acl = fineacl();

      let rel = acl.rel({
        userId: 1234,
        resourceType: "REPOSITORY",
        resourceId: 5678,
        permissions: ["READ", "REVIEW", "MERGE"]
      });

      rel.replace((err, succesEnforcing) => {
        assert.equal(true, succesEnforcing);

        rel.assert((err, successChecking) => {
          assert.equal(true, successChecking);  
        })
      })

    })

  });


  describe('Relationship#replace', () => {

    it("should callback with success=true on a role that is assigned to this user" , () => {

      let acl = fineacl();

      let rel = acl.rel({
        userId: 1234,
        resourceType: "REPOSITORY",
        resourceId: 5678,
        permissions: ["READ", "REVIEW", "MERGE"]
      });

      rel.replace((err, succesEnforcing) => {
        assert.equal(true, succesEnforcing);

        rel.assert((err, successChecking) => {
          assert.equal(true, successChecking);  
        })
      })

    })
  });


  describe('Relationship#break', () => {

    it("should callback with success=false on a role that was removed from user" , () => {

      let acl = fineacl();

      let rel = acl.rel({
        userId: 1234,
        resourceType: "REPOSITORY",
        resourceId: 5678,
        permissions: ["READ", "REVIEW", "MERGE"]
      });

      rel.replace((err, succesEnforcing) => {
          assert.equal(true, succesEnforcing);

        rel.break((err, successBreaking) => {
          assert.equal(true, successBreaking);

          rel.assert((err, successChecking) => {
            assert.equal(false, successChecking);
          })  
        })
      })

    })
  });



  describe('Relationship#getPersistedPermissions', () => {

    it("should callback with persistedPermissions=[] on a user that has no permissions for this resource" , () => {

      let acl = fineacl();

      let rel = acl.rel({
        userId: 1234,
        resourceType: "REPOSITORY",
        resourceId: 5678,
        permissions: ["READ", "REVIEW", "MERGE"]
      });

      rel.getPersistedPermissions((err, persistedPermissions) => {
          assert.deepEqual([], persistedPermissions);
      })

    })


    it('should callback with persistedPermissions=["READ", "REVIEW", "MERGE"] after enforcing this rules' , () => {

      let acl = fineacl();

      let rel = acl.rel({
        userId: 1234,
        resourceType: "REPOSITORY",
        resourceId: 5678,
        permissions: ["READ", "REVIEW", "MERGE"]
      });

      rel.replace((err, succesEnforcing) => {
        assert.equal(true, succesEnforcing);

        rel.getPersistedPermissions((err, persistedPermissions) => {
            assert.deepEqual(["READ", "REVIEW", "MERGE"], persistedPermissions);
        })
      })


    })
  })




  describe('Relationship#replace', () => {
    it('should callback with persistedPermissions=["BLUE"] after enforcing 2 separate relations: ["RED", "GREEN"] and ["BLUE"]' , () => {

      let acl = fineacl();

      let rel = acl.rel({
        userId: 1234,
        resourceType: "REPOSITORY",
        resourceId: 5678,
        permissions: ["RED", "GREEN"]
      });

      let rel2 = acl.rel({
        userId: 1234,
        resourceType: "REPOSITORY",
        resourceId: 5678,
        permissions: ["BLUE"]
      });

      rel.replace((err, succesEnforcing) => {
        assert.equal(true, succesEnforcing);

        rel2.replace((err, succesEnforcing2) => {
          assert.equal(true, succesEnforcing2);

          rel.getPersistedPermissions((err, persistedPermissions) => {
              assert.deepEqual(["BLUE"], persistedPermissions);
          })

        })
      })


    })
  })



  describe('Relationship#sync', () => {


    it('should add new permissions while keeping old ones, after enforcing 2 separate relations: ["RED", "GREEN"] and ["BLUE"], resulting in ["RED", "GREEN", "BLUE"]' , () => {

      let acl = fineacl();

      let rel = acl.rel({
        userId: 1234,
        resourceType: "REPOSITORY",
        resourceId: 5678,
        permissions: ["RED", "GREEN"]
      });

      let rel2 = acl.rel({
        userId: 1234,
        resourceType: "REPOSITORY",
        resourceId: 5678,
        permissions: ["BLUE"]
      });

      rel.sync((err, succesEnforcing) => {
        assert.equal(true, succesEnforcing);

        rel2.sync((err, succesEnforcing2) => {
          assert.equal(true, succesEnforcing2);

          rel.getPersistedPermissions((err, persistedPermissions) => {
              assert.deepEqual(["RED", "GREEN", "BLUE"], persistedPermissions);
          })

        })
      })
    })


    it('should eliminate duplicate permissions, after enforcing 2 separate relations: ["RED", "GREEN"] and ["RED", "BLUE"], resulting in ["RED", "GREEN", "BLUE"]' , () => {

      let acl = fineacl();

      let rel = acl.rel({
        userId: 1234,
        resourceType: "REPOSITORY",
        resourceId: 5678,
        permissions: ["RED", "GREEN"]
      });

      let rel2 = acl.rel({
        userId: 1234,
        resourceType: "REPOSITORY",
        resourceId: 5678,
        permissions: ["RED", "BLUE"]
      });

      rel.sync((err, succesEnforcing) => {
        assert.equal(true, succesEnforcing);

        rel2.sync((err, succesEnforcing2) => {
          assert.equal(true, succesEnforcing2);

          rel.getPersistedPermissions((err, persistedPermissions) => {
              assert.deepEqual(["RED", "GREEN", "BLUE"], persistedPermissions);
          })

        })
      })
    })

  });



});



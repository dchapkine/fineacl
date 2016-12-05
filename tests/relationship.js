let assert = require('assert');
let fineacl = require('../src/index.js');


describe('Relationship', () => {

  describe('Relationship#assert', () => {

    it("should callback with success=false on a role that is NOT assigned to this user" , () => {

      let rel = fineacl().rel({
        userId: 1234,
        resourceType: "REPOSITORY",
        resourceId: 5678,
        roles: ["READ", "REVIEW", "MERGE"]
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
        roles: ["READ", "REVIEW", "MERGE"]
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
        roles: ["READ", "REVIEW", "MERGE"]
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
        roles: ["READ", "REVIEW", "MERGE"]
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



  describe('Relationship#getPersistedRoles', () => {

    it("should callback with persistedRoles=[] on a user that has no roles for this resource" , () => {

      let acl = fineacl();

      let rel = acl.rel({
        userId: 1234,
        resourceType: "REPOSITORY",
        resourceId: 5678,
        roles: ["READ", "REVIEW", "MERGE"]
      });

      rel.getPersistedRoles((err, persistedRoles) => {
          assert.deepEqual([], persistedRoles);
      })

    })


    it('should callback with persistedRoles=["READ", "REVIEW", "MERGE"] after enforcing this rules' , () => {

      let acl = fineacl();

      let rel = acl.rel({
        userId: 1234,
        resourceType: "REPOSITORY",
        resourceId: 5678,
        roles: ["READ", "REVIEW", "MERGE"]
      });

      rel.replace((err, succesEnforcing) => {
        assert.equal(true, succesEnforcing);

        rel.getPersistedRoles((err, persistedRoles) => {
            assert.deepEqual(["READ", "REVIEW", "MERGE"], persistedRoles);
        })
      })


    })
  })




  describe('Relationship#replace', () => {
    it('should callback with persistedRoles=["BLUE"] after enforcing 2 separate relations: ["RED", "GREEN"] and ["BLUE"]' , () => {

      let acl = fineacl();

      let rel = acl.rel({
        userId: 1234,
        resourceType: "REPOSITORY",
        resourceId: 5678,
        roles: ["RED", "GREEN"]
      });

      let rel2 = acl.rel({
        userId: 1234,
        resourceType: "REPOSITORY",
        resourceId: 5678,
        roles: ["BLUE"]
      });

      rel.replace((err, succesEnforcing) => {
        assert.equal(true, succesEnforcing);

        rel2.replace((err, succesEnforcing2) => {
          assert.equal(true, succesEnforcing2);

          rel.getPersistedRoles((err, persistedRoles) => {
              assert.deepEqual(["BLUE"], persistedRoles);
          })

        })
      })


    })
  })



  describe('Relationship#sync', () => {


    it('should add new roles while keeping old ones, after enforcing 2 separate relations: ["RED", "GREEN"] and ["BLUE"], resulting in ["RED", "GREEN", "BLUE"]' , () => {

      let acl = fineacl();

      let rel = acl.rel({
        userId: 1234,
        resourceType: "REPOSITORY",
        resourceId: 5678,
        roles: ["RED", "GREEN"]
      });

      let rel2 = acl.rel({
        userId: 1234,
        resourceType: "REPOSITORY",
        resourceId: 5678,
        roles: ["BLUE"]
      });

      rel.sync((err, succesEnforcing) => {
        assert.equal(true, succesEnforcing);

        rel2.sync((err, succesEnforcing2) => {
          assert.equal(true, succesEnforcing2);

          rel.getPersistedRoles((err, persistedRoles) => {
              assert.deepEqual(["RED", "GREEN", "BLUE"], persistedRoles);
          })

        })
      })
    })


    it('should eliminate duplicate roles, after enforcing 2 separate relations: ["RED", "GREEN"] and ["RED", "BLUE"], resulting in ["RED", "GREEN", "BLUE"]' , () => {

      let acl = fineacl();

      let rel = acl.rel({
        userId: 1234,
        resourceType: "REPOSITORY",
        resourceId: 5678,
        roles: ["RED", "GREEN"]
      });

      let rel2 = acl.rel({
        userId: 1234,
        resourceType: "REPOSITORY",
        resourceId: 5678,
        roles: ["RED", "BLUE"]
      });

      rel.sync((err, succesEnforcing) => {
        assert.equal(true, succesEnforcing);

        rel2.sync((err, succesEnforcing2) => {
          assert.equal(true, succesEnforcing2);

          rel.getPersistedRoles((err, persistedRoles) => {
              assert.deepEqual(["RED", "GREEN", "BLUE"], persistedRoles);
          })

        })
      })
    })

  });



});



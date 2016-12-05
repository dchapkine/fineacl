class StoreImplementation {

  getUserRolesByResource (userId, resourceType, resourceId, cb) {
    cb(null, []);
  }

  assertRelationship (userId, resourceType, resourceAttributes, roles, cb) {
    cb(null, false);
  }

  syncRelationship (userId, resourceType, resourceAttributes, roles, cb) {
    cb(null, false);
  }

  replaceRelationship (userId, resourceType, resourceAttributes, roles, cb) {
    cb(null, false);
  }
  
  breakRelationship (userId, resourceType, resourceAttributes, roles, cb) {
    cb(null, false);
  }

}
module.exports = StoreImplementation;
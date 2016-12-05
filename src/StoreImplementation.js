class StoreImplementation {

  getUserPermissionsByResource (userId, resourceType, resourceId, cb) {
    cb(null, []);
  }

  assertRelationship (userId, resourceType, resourceAttributes, permissions, cb) {
    cb(null, false);
  }

  syncRelationship (userId, resourceType, resourceAttributes, permissions, cb) {
    cb(null, false);
  }

  replaceRelationship (userId, resourceType, resourceAttributes, permissions, cb) {
    cb(null, false);
  }
  
  breakRelationship (userId, resourceType, resourceAttributes, permissions, cb) {
    cb(null, false);
  }

}
module.exports = StoreImplementation;
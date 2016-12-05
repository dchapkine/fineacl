let StoreImplementation = require('./StoreImplementation');

class DummyStoreImplementation extends StoreImplementation {

  constructor() {
    super();

    // persisted users and relations
    this.users = new Map();
    this.users_x_resources = new Map();
    this.groups_x_resources = new Map();
  }

  getUserPermissionsByResource (userId, resourceType, resourceId, cb) {
    
    let key = userId+"__"+resourceType+"__"+resourceId;

    if (this.users_x_resources.has(key))
    {
      return cb(null, this.users_x_resources.get(key));
    }
    return cb(null, []);
  }

  assertRelationship (userId, resourceType, resourceId, wantedPermissions, cb) {
    
    let key = userId+"__"+resourceType+"__"+resourceId;

    if (this.users_x_resources.has(key))
    {
      let storedPermissions = this.users_x_resources.get(key);
      for (let i = 0; i < wantedPermissions.length; i++) {
        if (storedPermissions.indexOf(wantedPermissions[i]) === -1) return cb(null, false);
      }
      // all wantedPermissions were found, success
      return cb(null, true);
    }
    return cb(null, false);
  }
  
  replaceRelationship (userId, resourceType, resourceId, newPermissions, cb) {
    
    let key = userId+"__"+resourceType+"__"+resourceId;

    this.users_x_resources.set(key, newPermissions);
    cb(null, true);
  }
  
  syncRelationship (userId, resourceType, resourceId, newPermissions, cb) {
    
    let key = userId+"__"+resourceType+"__"+resourceId;

    if (!this.users_x_resources.has(key))
    {
      this.users_x_resources.set(key, newPermissions);  
    }
    else
    {
      let allPermissions = this.users_x_resources.get(key);

      for (let i = 0; i < newPermissions.length; i++)
      {
        if (allPermissions.indexOf(newPermissions[i]) == -1) {
          allPermissions.push(newPermissions[i]);
        }
      }

      this.users_x_resources.set(key, allPermissions);
    }
    cb(null, true);
  }

  breakRelationship (userId, resourceType, resourceId, unwantedPermissions, cb) {
    
    let key = userId+"__"+resourceType+"__"+resourceId;

    // todo: make a diff between unwantedPermissions and stored permissions
    this.users_x_resources.delete(key);
    cb(null, true);
  }
}

module.exports = DummyStoreImplementation;
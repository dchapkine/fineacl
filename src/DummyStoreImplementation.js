let StoreImplementation = require('./StoreImplementation');

class DummyStoreImplementation extends StoreImplementation {

  constructor() {
    super();

    // persisted users and relations
    this.users = new Map();
    this.users_x_resources = new Map();
    this.groups_x_resources = new Map();
  }

  getUserRolesByResource (userId, resourceType, resourceId, cb) {
    
    let key = userId+"__"+resourceType+"__"+resourceId;

    if (this.users_x_resources.has(key))
    {
      return cb(null, this.users_x_resources.get(key));
    }
    return cb(null, []);
  }

  assertRelationship (userId, resourceType, resourceId, wantedRoles, cb) {
    
    let key = userId+"__"+resourceType+"__"+resourceId;

    if (this.users_x_resources.has(key))
    {
      let storedRoles = this.users_x_resources.get(key);
      for (let i = 0; i < wantedRoles.length; i++) {
        if (storedRoles.indexOf(wantedRoles[i]) === -1) return cb(null, false);
      }
      // all wantedRoles were found, success
      return cb(null, true);
    }
    return cb(null, false);
  }
  
  replaceRelationship (userId, resourceType, resourceId, newRoles, cb) {
    
    let key = userId+"__"+resourceType+"__"+resourceId;

    this.users_x_resources.set(key, newRoles);
    cb(null, true);
  }
  
  syncRelationship (userId, resourceType, resourceId, newRoles, cb) {
    
    let key = userId+"__"+resourceType+"__"+resourceId;

    if (!this.users_x_resources.has(key))
    {
      this.users_x_resources.set(key, newRoles);  
    }
    else
    {
      let allRoles = this.users_x_resources.get(key);

      for (let i = 0; i < newRoles.length; i++)
      {
        if (allRoles.indexOf(newRoles[i]) == -1) {
          allRoles.push(newRoles[i]);
        }
      }

      this.users_x_resources.set(key, allRoles);
    }
    cb(null, true);
  }

  breakRelationship (userId, resourceType, resourceId, unwantedRoles, cb) {
    
    let key = userId+"__"+resourceType+"__"+resourceId;

    // todo: make a diff between unwantedRoles and stored roles
    this.users_x_resources.delete(key);
    cb(null, true);
  }
}

module.exports = DummyStoreImplementation;
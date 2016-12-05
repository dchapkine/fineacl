let Relationship = require('./Relationship');
let Resource = require('./Resource');
let DummyStoreImplementation = require('./DummyStoreImplementation');

class FineAcl {

  constructor(params) {
    params = params || {};
    params.store = params.store||new DummyStoreImplementation();

    this.resources = new Map();
    this.store = params.store;
  }

  /**
   * Returns new relation
   *
   * @param object params
   * @return Relationship
   */
  rel (params) {
    if (!params) return null;
    if (!params.userId) return null;
    if (!params.resourceType) return null;
    if (!params.resourceId) return null;
    if (!params.permissions) return null;
    return new Relationship(params, {
      store: this.store
    });
  }

  /**
   * Defines new resource or returns an existing one
   *
   * @param string name
   * @param object params
   * @return Resource
   */
  resource (name, params) {
    if (!this.resources.has(name))
    {
      if (!name) return null;
      if (!params) return null;
      if (!params.permissions) return null;
      this.resources.set(name, new Resource(params));
    }
    return this.resources.get(name);
  }

  /**
   * Lists all permissions of a user on a particular resource
   *
   * @param string|int userId
   * @param string resourceType
   * @param string|int resourceId
   * @param function cb
   */
  getUserPermissionsByResource (userId, resourceType, resourceId, cb) {
    return this.store.getUserPermissionsByResource(userId, resourceType, resourceId, cb);
  }
  

}

module.exports = FineAcl;
class Relationship {

  constructor(params, config) {
    this.userId = params.userId;
    this.resourceType = params.resourceType;
    this.resourceId = params.resourceId;
    this.permissions = params.permissions;
    this._storeImplementation = config.store;
  }

  assert(cb) {
    this._storeImplementation.assertRelationship(this.userId, this.resourceType, this.resourceId, this.permissions, cb);
  }

  /**
   * Persists this relationship, keeping all existing permissions for this user+resource
   *
   * @param function cb
   */
  sync(cb) {
    this._storeImplementation.syncRelationship(this.userId, this.resourceType, this.resourceId, this.permissions, cb);
  }

  /**
   * Persist this relationship, erasing every existing permissions by the permissions contained in this.permissions
   *
   * @param function cb
   */
  replace(cb) {
    this._storeImplementation.replaceRelationship(this.userId, this.resourceType, this.resourceId, this.permissions, cb);
  }

  break(cb) {
    this._storeImplementation.breakRelationship(this.userId, this.resourceType, this.resourceId, this.permissions, cb);
  }

  getPersistedPermissions(cb) {
    this._storeImplementation.getUserPermissionsByResource(this.userId, this.resourceType, this.resourceId, cb)
  }

  // make a diff between this.permissions in memory and permissions stores in persistent storage
  diffPermissions(cb) {
    // todo
  }
}

module.exports = Relationship;



class Relationship {

  constructor(params, config) {
    this.userId = params.userId;
    this.resourceType = params.resourceType;
    this.resourceId = params.resourceId;
    this.roles = params.roles;
    this._storeImplementation = config.store;
  }

  assert(cb) {
    this._storeImplementation.assertRelationship(this.userId, this.resourceType, this.resourceId, this.roles, cb);
  }

  /**
   * Persists this relationship, keeping all existing roles for this user+resource
   *
   * @param function cb
   */
  sync(cb) {
    this._storeImplementation.syncRelationship(this.userId, this.resourceType, this.resourceId, this.roles, cb);
  }

  /**
   * Persist this relationship, erasing every existing roles by the roles contained in this.roles
   *
   * @param function cb
   */
  replace(cb) {
    this._storeImplementation.replaceRelationship(this.userId, this.resourceType, this.resourceId, this.roles, cb);
  }

  break(cb) {
    this._storeImplementation.breakRelationship(this.userId, this.resourceType, this.resourceId, this.roles, cb);
  }

  getPersistedRoles(cb) {
    this._storeImplementation.getUserRolesByResource(this.userId, this.resourceType, this.resourceId, cb)
  }

  // make a diff between this.roles in memory and roles stores in persistent storage
  diffRoles(cb) {
    // todo
  }
}

module.exports = Relationship;



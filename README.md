

# What ?

FINEACL is a fine grained ACL library for node


# What ???

FINEACL is a document/row level access contol library that handles per user, per resource, user defined ACLs.


# Why

Sometimes you need to contol access to a single dynamic resource or a dynamic set of resources, which can be challenging since most frameworks and ACL libraries assume that you want a veyr simple role based ACL to access static resource groups.


# Why ???

Here is a list of real life usecases where this type library could be used:

- allow read access to a google drive document
- allow a user to commit into a git repository
- allow a group of users to list particular folder
- allow a group of users to review and merge commits
- allow a user to contribute to my trello board
- allow a user to access my slack channel


# Run tests

Tests are written using mocha, you can run it using:

```
npm test
```


# Quickstart

## Install

```
npm install fineacl --save
```

```
const fineacl = require('fineacl');
```

## Acl instance

let acl = fineacl();


## Resource

First, let's define our resource types.

```
acl.resource("REPOSITORY", {

    // select attributes whitelist
    attributes: ["id"],

    // define available acces roles
    roles: {
        READ:   "Gives read only access to the repository",
        REVIEW: "Gives review publish ability",
        MERGE:  "Gives merge access to any branch of the repository",
        ADMIN:  "Gives full access to any operation on the repository"
    });
```


## Relationship

A relationship between a `user` and a `resource` is a key concept in fineacl.

```
let rel = acl.rel({
	userId: 1234,
	resourceType: "REPOSITORY",
	resourceId: 5678,
	roles: ["READ", "REVIEW", "MERGE"]
});
```


Once we defined a relationship, we can check its existence with assert method:

```
rel.assert((err, exists) => {
	console.log(exists?"access to resource granted":"access to resource denied")
});
```


We can enforce this relationship, using sync method, to add new roles, while keeping existing ones:

```
rel.sync((err, success) => {
	console.log(success?"access granted":"can't grant access, check err")
});
```


Alternatively we can enforce this relationship, using replace method, to replace existing ones:

```
rel.replace((err, success) => {
	console.log(success?"access granted":"can't grant access, check err")
});
```


We can remove this relationship, using break method:

```
rel.break((err, success) => {
	console.log(success?"relationship broken successfully":"can't break relationship, check err")
});
```



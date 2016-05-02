Colliders
=========

collider
--------
An entity that represents a region that can be collided with

    // Object, Object -> collider
    const collider = initCollider(colliderConfig, colliderType);

### colliderConfig

    { id: 0, x: 10, y: 10, width: 200, height: 100}

colliderSet
-----------
A collection of colliders

    // Object, Object -> [collider]
    const colliderSet = initColliderSet(colliderSetConfig, colliderTypeSet);

    // Object, Object -> Boolean
    const collision = collisionBetween(collider1, collider2);

### colliderSetConfig

    [
      { id: 0, x: 10, y: 10, width: 200, height: 100},
      { id: 1, x: 50, y: 20, width: 100, height: 20}
    ]

colliderType
------------

    { type: 'solid' }

colliderTypeSet
---------------
A collection of collider types

    [
      { type: 'solid' }, { type: 'trigger' }, { type: 'platform' }
    ]

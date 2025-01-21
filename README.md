```
# MongoDB Important Concepts

## 1. Document
A document is a JSON-like structure that MongoDB uses to store data.

```
{
  "name": "John Doe",
  "age": 22,
  "hobbies": ["reading", "gaming", "traveling"]
}
```

## 2. Collection
A collection is a group of documents. For example, a `users` collection might look like this:

```
db.users.insertOne({
  "name": "Alice",
  "age": 25,
  "email": "alice@example.com"
});
```

## 3. CRUD Operations

### Create
```
// Insert a single document
db.users.insertOne({ name: "Bob", age: 30 });

// Insert multiple documents
db.users.insertMany([
  { name: "Charlie", age: 35 },
  { name: "Diana", age: 28 }
]);
```

### Read
```
// Find all documents
db.users.find();

// Find documents with a condition
db.users.find({ age: { $gt: 25 } });

// Find one document
db.users.findOne({ name: "Alice" });
```

### Update
```
// Update one document
db.users.updateOne({ name: "Bob" }, { $set: { age: 31 } });

// Update multiple documents
db.users.updateMany({ age: { $lt: 30 } }, { $set: { status: "young" } });
```

### Delete
```
// Delete one document
db.users.deleteOne({ name: "Charlie" });

// Delete multiple documents
db.users.deleteMany({ age: { $lt: 30 } });
```

## 4. Indexing
```
// Create an index on the 'name' field for faster search
db.users.createIndex({ name: 1 });
```

## 5. Sharding
Sharding requires enabling it at the database level and distributing data across shards.

```
sh.enableSharding("myDatabase");
sh.shardCollection("myDatabase.users", { age: 1 });
```

## 6. Replication
Replication is set up using replica sets. Here's an example configuration in the `mongo` shell:

```
rs.initiate({
  _id: "replicaSetName",
  members: [
    { _id: 0, host: "localhost:27017" },
    { _id: 1, host: "localhost:27018" },
    { _id: 2, host: "localhost:27019" }
  ]
});
```

## 7. Aggregation
```
// Group users by age and count them
db.users.aggregate([
  { $group: { _id: "$age", count: { $sum: 1 } } }
]);

// Filter and project specific fields
db.users.aggregate([
  { $match: { age: { $gte: 25 } } },
  { $project: { name: 1, age: 1, _id: 0 } }
]);
```

## 8. Operators

### Comparison Operator Example:
```
// Find users older than 25
db.users.find({ age: { $gt: 25 } });
```

### Logical Operator Example:
```
// Find users who are either named 'Alice' or are older than 30
db.users.find({ $or: [{ name: "Alice" }, { age: { $gt: 30 } }] });
```

### Array Operator Example:
```
// Add a new hobby to a user's hobbies array
db.users.updateOne(
  { name: "John Doe" },
  { $push: { hobbies: "coding" } }
);
```

## 9. Data Types
MongoDB supports various data types:

```
db.items.insertOne({
  stringField: "Hello",
  numberField: 123,
  booleanField: true,
  dateField: new Date(),
  arrayField: [1, 2, 3],
  objectField: { key1: "value1", key2: "value2" },
});
```

## 10. Schema Design Example

### Denormalized Design (Embedding Related Data):
```
{
   "_id": ObjectId("123"),
   "name": "John Doe",
   "orders": [
      {
         "orderId": ObjectId("456"),
         "product": "Laptop",
         "quantity": 1,
         "price": 1000
      },
      {
         "orderId": ObjectId("789"),
         "product": "Phone",
         "quantity": 2,
         "price": 500
      }
   ]
}
```

### Normalized Design (Referencing Related Data):

**Users Collection**:
```
{
   "_id": ObjectId("123"),
   "name": "John Doe"
}
```

**Orders Collection**:
```
{
   "_id": ObjectId("456"),
   "userId": ObjectId("123"),
   "product": "Laptop",
   "quantity": 1,
   "price": 1000
}
```
```

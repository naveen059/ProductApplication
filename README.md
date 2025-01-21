```
# MERN Stack Important Concepts  
**Date:** Tuesday, January 21, 2025, 12 PM IST  

---

## 1. MongoDB  

### **1.1 Document**  
A document is a JSON-like structure used to store data in MongoDB.  

Example:  
```
{
  "name": "John Doe",
  "age": 22,
  "hobbies": ["reading", "gaming", "traveling"]
}
```

### **1.2 Collection**  
A collection is a group of documents.  

Example:  
```
db.users.insertOne({
  "name": "Alice",
  "age": 25,
  "email": "alice@example.com"
});
```

### **1.3 CRUD Operations**  

#### Create  
- Insert a single document:  
```
db.users.insertOne({ name: "Bob", age: 30 });
```
- Insert multiple documents:  
```
db.users.insertMany([
  { name: "Charlie", age: 35 },
  { name: "Diana", age: 28 }
]);
```

#### Read  
- Find all documents:  
```
db.users.find();
```
- Find documents with a condition:  
```
db.users.find({ age: { $gt: 25 } });
```
- Find one document:  
```
db.users.findOne({ name: "Alice" });
```

#### Update  
- Update one document:  
```
db.users.updateOne({ name: "Bob" }, { $set: { age: 31 } });
```
- Update multiple documents:  
```
db.users.updateMany({ age: { $lt: 30 } }, { $set: { status: "young" } });
```

#### Delete  
- Delete one document:  
```
db.users.deleteOne({ name: "Charlie" });
```
- Delete multiple documents:  
```
db.users.deleteMany({ age: { $lt: 30 } });
```

### **1.4 Indexing**  
Create an index on the `name` field for faster search.  
```
db.users.createIndex({ name: 1 });
```

### **1.5 Sharding**  
Enable sharding and distribute data across shards.  
```
sh.enableSharding("myDatabase");
sh.shardCollection("myDatabase.users", { age: 1 });
```

### **1.6 Replication**  
Replication setup using replica sets in the `mongo` shell.  
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

### **1.7 Aggregation**  

- Group users by age and count them:
```
db.users.aggregate([
  { $group: { _id: "$age", count: { $sum: 1 } } }
]);
```
- Filter and project specific fields:
```
db.users.aggregate([
  { $match: { age: { $gte: 25 } } },
  { $project: { name: 1, age: 1, _id: 0 } }
]);
```

### **1.8 Operators**  

#### Comparison Operator Example:
Find users older than 25:
```
db.users.find({ age: { $gt: 25 } });
```

#### Logical Operator Example:
Find users who are either named 'Alice' or are older than 30:
```
db.users.find({ $or: [{ name: "Alice" }, { age: { $gt: 30 } }] });
```

#### Array Operator Example:
Add a new hobby to a user's hobbies array:
```
db.users.updateOne(
  { name: "John Doe" },
  { $push: { hobbies: "coding" } }
);
```

### **1.9 Data Types**  

Example of supported data types in MongoDB:
```
db.items.insertOne({
  stringField: "Hello",
  numberField: 123,
  booleanField: true,
  dateField: new Date(),
  arrayField: [1, 2, 3],
  objectField: { key1:"value1", key2:"value2" }
});
```

### **1.10 Schema Design Example**  

#### Denormalized Design (Embedding Related Data):  
```
{
   "_id": ObjectId("123"),
   "name": "John Doe",
   "orders": [
      {
         "orderId": ObjectId("456"),
         "product": "Laptop",
         "quantity": 1,
         "price":1000
      },
      {
         "orderId": ObjectId("789"),
         "product": "Phone",
         "quantity":2,
         "price":500
      }
   ]
}
```

#### Normalized Design (Referencing Related Data):  

**Users Collection:**  
```
{
   "_id": ObjectId("123"),
   "name": "John Doe"
}
```
**Orders Collection:**  
```
{
   "_id": ObjectId("456"),
   "userId": ObjectId("123"),
   "product":"Laptop",
   "quantity":1,
   "price":1000 
}
```


---

## 2. React  

### **2.1 Components**  
Components are the building blocks of a React application. They can be either class components or functional components.

#### Example of Class Component:
```
import React, { Component } from 'react';

class HelloWorld extends Component {
    constructor(props) {
        super(props);
        this.state = {
            greeting:'Hello, World!'
        };
    }

    render() {
        return (
            <div>
                <h1>{this.state.greeting}</h1>
            </div>
        );
    }
}
``` 

#### Example of Functional Component:
```
function Greeting() {
    return (
        <h1 className="heading">Welcome to React</h1>
    );
}
``` 

### **2.2 Props**  
Props (short for properties) are used to pass data from parent components to child components.

```
function Head(props) {
    return <p>{props.children}</p>;
}
``` 

### **2.3 State**  
State is used to manage dynamic data within a component.

```
const [count, setCount] = useState(0);
``` 

### **2.4 Lifecycle Methods**  
Lifecycle methods allow you to run code at specific points in a component's life cycle.

```
componentDidMount() {
    // Code to run after the component mounts
}
``` 

### **2.5 Hooks**  
Hooks are functions that let you use state and other React features without writing a class.

#### Example of useState Hook:
```
const [name, setName] = useState("");
const [age, setAge] = useState(0);
``` 

### **2.6 Routing with React Router**  
React Router enables navigation between different components in your application.

```
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="about" element={<About />} />
                <Route path="contact" element={<Contact />} />
                <Route path="*" element={<NoPage />} />
            </Routes>
        </BrowserRouter>
    );
}
``` 

---

## 3. Express.js  

### **3.1 Introduction**  
Express.js is a web application framework for Node.js designed for building web applications and APIs.

### **3.2 Setting Up an Express Server**
```
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
``` 

### **3.3 Middleware**
Middleware functions are functions that have access to the request object (req), the response object (res), and the next middleware function in the application’s request-response cycle.

```
app.use(express.json()); // Parses incoming JSON requests
``` 

### **3.4 Routing**
Define routes for handling requests.
```
app.get('/api/users', (req, res) => {
    res.send('User list');
});
``` 

---

## 4. Node.js  

### **4.1 Introduction**  
Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine that allows you to run JavaScript on the server side.

### **4.2 Setting Up a Node.js Project**
Initialize a new Node.js project.
```
npm init -y
``` 

### **4.3 Installing Packages**
Install necessary packages using npm.
```
npm install express mongoose cors dotenv
``` 

### **4.4 Creating a Simple Server**
Create a basic server using Node.js.
```
const http = require('http');

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World\n');
});

server.listen(3000, () => {
    console.log('Server running at http://localhost:3000/');
});
``` 

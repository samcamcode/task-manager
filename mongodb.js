// CRUD create read update delete

// const mongodb = require('mongodb');
// const MongoClient = mongodb.MongoClient;
// const ObjectID = mongodb.ObjectID;

// below is destructure for above/////////////////////////////////////
const { MongoClient, ObjectID} = require('mongodb')
// above is destructure for above/////////////////////////////////////

const connectionURL ='mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';


MongoClient.connect(connectionURL, {useNewUrlParser: true}, (error, client) => {
    if (error) {
        return console.log('cant connect to db')
    }

    const db = client.db(databaseName);

    // db.collection('users').deleteMany(
    //     {age: 36}
    // ).then((result)=> console.log(result)).catch((error) => console.log(error));

    // db.collection('tasks').deleteOne({description: 'sleep'})
    // .then(result => console.log(result))
    // .catch(error => console.log(error))

})

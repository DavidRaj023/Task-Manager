// CRUD create read update delete

const { MongoClient, ObjectId } = require('mongodb')


const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database!')
    }

    const db = client.db(databaseName)
    

    //insert
    // db.collection('tasks').insertOne({
    //     title: 'Crud Operation',
    //     description: 'Complete CRUD operation using node js',
    //     completed : true
    // }, (error, result) => {
    //     if(error){
    //         return console.log(error)
    //     }
    //     const id = result.insertedId.getTimestamp()
    //     console.log(id)
        
        
    // })

    //insert many

    // db.collection('users').insertMany([
    //     {
    //         name: 'David01',
    //         age: 23
    //     },
    //     {
    //         name: 'David02',
    //         age: 23
    //     },
    //     {
    //         name: 'David03',
    //         age: 23
    //     },
    //     {
    //         name: 'David04',
    //         age: 23
    //     },
    //     {
    //         name: 'David05',
    //         age: 23
    //     }
    // ], (errors, results) =>{
    //     if(errors){
    //         return console.log(errors)
    //     }
    //     console.log(results)
    // })

    //read

    // db.collection('users').findOne( { name: 'Raj'}, (errors, user) => {
    //     if(user){
    //         return console.log(user)
    //     }
    //     console.log(user)
    // })

    //read all
    // db.collection('users').find( { name: 'Raj' }).toArray((error, users) => {
    //     console.log(users)
    // })

    // const updatePromise = db.collection('users').updateOne({ 
    //     _id: new ObjectId('619cc6100bf195fe274e4af0')
    // }, {
    //     $set: {
    //         Name: 'David Raj E'
    //     }
    // })

    // updatePromise.then((result) => {
    //     console.log(result)
    // }).catch( (error) => {
    //     console.log(error)
    // })


    //Common pattern 

    // db.collection('users').updateOne({ 
    //     _id: new ObjectId('619cc6100bf195fe274e4af0')
    // }, {
    //     $inc: {
    //         age: 1
    //     }
    // }).then((result) => {
    //     console.log(result)
    // }).catch( (error) => {
    //     console.log(error)
    // })


    db.collection('users').deleteMany({
        age:27
    }).then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })
})
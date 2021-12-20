const express = require('express');
require('./db/mongoose');
const userRouter = require('./routers/users-route');
const taskRouter = require('./routers/tasks-route');

const app = express();
const port = process.env.PORT || 3000;

//Block perticular router
// app.use((req, res, next) => {
//     if(!req.method === 'GET'){
//         next();
//     }
//     res.send('Get is not available');
    
// });

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
    console.log('Server up and running on port: ' + port);
});


// const bcrypt = require('bcryptjs')

// const myFunction = async () => {
//     const password = 'password'
//     const hasPassword = await bcrypt.hash(password, 8)
//     console.log(hasPassword)

//     const isMatch = await bcrypt.compare('password', hasPassword)
//     const isMatch2 = await bcrypt.compare('password', '$2a$08$NEX0Rd0Z2hLseDO7atXecevZ35QsrURpc6N9fofkdVmTYCkatYGIW')
//     console.log(isMatch)
//     console.log(isMatch2)

    
// }

// myFunction()

//Tokens

// const jwt = require('jsonwebtoken');

// const myTockenFunction = async () =>{
//     const tocken = jwt.sign({ _id: '1234David' }, 'david' ,{ expiresIn: '1 seconds' });
//     console.log(tocken);

//     const verify = jwt.verify(tocken, 'david');
//     console.log(verify);
// }


// myTockenFunction();
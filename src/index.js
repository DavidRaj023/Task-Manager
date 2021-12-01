const express = require('express');
require('./db/mongoose');
const userRouter = require('./routers/users-route');
const taskRouter = require('./routers/tasks-route');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
    console.log('Server up and running on port: ' + port);
})


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
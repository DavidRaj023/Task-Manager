require('../src/db/mongoose')
const User = require('../src/model/user')

User.findByIdAndUpdate('619e2be82b93f710eb5a858f', { name: 'Raju' }).then((sd) => {
    console.log(sd)
    return User.countDocuments({ name: 'david'})
}).then((result) => {
    console.log(result)
    return User.countDocuments({ name: 'Raj'})
}).then((result2) => {
    console.log(result2)
}).catch((e) => {
    console.log(e)
})
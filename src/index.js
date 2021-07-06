const express = require('express');
require('./db/mongoose');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

const app = express();
const port = process.env.PORT;

// app.use((req, res, next) => {
//     res.status(503).send('under maintenance')
// })

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
    console.log(`server up on port ${port}`);
})

const Task = require('./models/task')
const User = require('./models/user');

// const main = async () => {

//     //            tasks to user
//     // const task = await Task.findById('60dd6ddb5f711fa17079a0e6')
//     // await task.populate('owner').execPopulate()
//     // console.log('owner',task.owner)

//     //            user to tasks
//     // const user = await User.findById('60dd6cbb209093a011c20eaa')
//     // await user.populate('tasks').execPopulate()
//     // console.log(user.tasks)
// }

// main()

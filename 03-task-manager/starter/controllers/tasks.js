const Task = require('../models/Task')
const asyncWrapper = require('../middleware/async.js')
const { createCustomError} = require('../errors/custom-error')

// const getAllTasks = async (req, res) => {
//   // res.send('Get all tasks')
//   try {
//     const tasks = await Task.find({})

//     res.status(200).json({ tasks: tasks })
//   } catch (error) {
//     res.status(500).json({ msg: error })
//   }
// }

// REFACTORED FROM ABOVE (but then refactored again for asyncWrapper)
// const getAllTasks = async (req, res) => {
//   // res.send('Get all tasks')
//   try {
//     const tasks = await Task.find({})

//     res.status(200).json({ tasks: tasks })

//     //other options but will cause errors
//     // res.status(200).json({ tasks: tasks, amount:tasks.length })
//     // res.status(200).json({ success: true, data:{tasks, nbHits: tasks.length} })
//   } catch (error) {
//     res.status(500).json({ msg: error })
//   }
// }

// Below AFTER adding the middleware functionality, pass in controller
const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({})
  res.status(200).json({ tasks: tasks })
})

/* BEFORE ADDING SCHEMA
const createTask = (req, res) => {
  res.json(req.body)
}
*/

//AFTER ADDING: You CAN Hard code instead of using create
const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body)
  res.status(201).json({ task })
})
//BEFORE using Model:
// const getTask = (req, res) => {
//   res.json({ id: req.params.id })
// }

// //AFTER:
const getTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params
  const task = await Task.findOne({ _id: taskID })

  if (!task) {
    //The custom replaces the 3 lines below:
    // const error = new Error('Not found')
    // error.status = 404
    // return next(error)
    return next(createCustomError( `No task with that ID: ${taskID}`, 404 ))
    
  }

  res.status(200).json({ task })
})

//BEFORE MODELS
// const deleteTask = (req, res) => {
//   res.send('delete task')
// }

//AFTER:
const deleteTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params
  const task = await Task.findByIdAndDelete({ _id: taskID })
  if (!task) {
    //The custom replaces the 3 lines below:
    // const error = new Error('Not found')
    // error.status = 404
    // return next(error)
    return next(createCustomError( `No task with that ID: ${taskID}`, 404 ))
  }

  // res.status(200).json({ task })
  // res.status(200).send()
  res.status(200).json({ task: null, status: 'success' })
})

const updateTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params
  const task = await Task.findOneAndUpdate(
    { _id: taskID },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  )
  if (!task) {
    //The custom replaces the 3 lines below:
    // const error = new Error('Not found')
    // error.status = 404
    // return next(error)
    return next(createCustomError( `No task with that ID: ${taskID}`, 404 ))
  }

  // res.status(200).json({id:taskID, data: req.body})
  res.status(200).json({ task })
})


module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
}

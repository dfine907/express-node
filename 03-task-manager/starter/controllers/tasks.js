const Task = require('../models/Task')

const getAllTasks = async (req, res) => {
  // res.send('Get all tasks')
  try {
    const tasks = await Task.find({})
    res.status(200).json({ tasks: tasks })
  } catch (error) {
    res.status(500).json({ msg: error })
  }
}

/* BEFORE ADDING SCHEMA
const createTask = (req, res) => {
  res.json(req.body)
}
*/
//AFTER ADDING: You CAN Hard code instead of using create
const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body)
    res.status(201).json({ task })
  } catch (error) {
    res.status(500).json({ msg: error })
  }
}
//BEFORE using Model:
// const getTask = (req, res) => {
//   res.json({ id: req.params.id })
// }

// //AFTER:
const getTask = async (req, res) => {
  try {
    const { id: taskID } = req.params
    const task = await Task.findOne({ _id: taskID })
    if (!task) {
      return res
        .status(404)
        .json({ msg: `No task with that ID: ${taskID}` })
    }

    res.status(200).json({ task })
  } catch (error) {
    res.status(500).json({ msg: error })
  }
}

//BEFORE MODELS
// const deleteTask = (req, res) => {
//   res.send('delete task')
// }

//AFTER:
const deleteTask = async (req, res) => {
  try {
    const { id: taskID } = req.params
    const task = await Task.findByIdAndDelete({ _id: taskID })
    if (!task) {
      return res
        .status(404)
        .json({ msg: `No task with that ID: ${taskID}` })
    }

    // res.status(200).json({ task })
    // res.status(200).send()
    res.status(200).json({ task: null, status: 'success' })
  } catch (error) {
    res.status(500).json({ msg: error })
  }
}

const updateTask = async (req, res) => {
  try {
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
      return res
        .status(404)
        .json({ msg: `No task with that ID: ${taskID}` })
    }

    // res.status(200).json({id:taskID, data: req.body})
    res.status(200).json({ task })
  } catch (error) {
    res.status(500).json({ msg: error })
  }
}

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
}

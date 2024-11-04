const Job = require('../models/Job')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')

//get all Jobs associated with one user
const getAllJobs = async (req, res) => {
  const jobs = await Job.find({createdBy:req.user.userId}).sort('createdAt')
  res.status(StatusCodes.OK).json({ jobs, count:jobs.length })
}

const getJob = async (req, res) => {
  //destructure -reminder params provided by express
  const { user:{userId}, params:{id:jobId}} = req
  //now find the ONE job - jobId
  const job = await Job.findOne({
    _id:jobId, createdBy:userId
  })
  if(!job){
    throw new NotFoundError(`No job found with id ${jobId}`)
  }
  res.status(StatusCodes.OK).json( {job})
}

const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId
  const job = await Job.create(req.body)
  res.status(StatusCodes.CREATED).json({ job })
}

const updateJob = async (req, res) => {
  res.send('update a job')
}

const deleteJob = async (req, res) => {
  res.send('delete a job')
}


module.exports = {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
}

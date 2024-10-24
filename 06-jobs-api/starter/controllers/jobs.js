const getAllJobs = async (req, res) => {
    console.log(req)
    
  res.send('Get All Jobs')
}
const getJob = async (req, res) => {
  res.send('get a job')
}
const createJob = async (req, res) => {
  res.send('create a job')
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
  deleteJob
}

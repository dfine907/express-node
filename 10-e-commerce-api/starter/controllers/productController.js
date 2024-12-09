const Product = require('../models/Product')
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors')

const createProduct = async (req, res) => {
    //req.body.user comes from the middleware that uses JWT, etc
    req.body.user = req.user.userId
    const product = await Product.create(req.body)
    
  
  res.status(StatusCodes.CREATED).json({product})
}

const getAllProducts = async (req, res) => {
  res.send('Get all products route')
}

const getSingleProduct = async (req, res) => {
  res.send('Get single product')
}

const updateProduct = async (req, res) => {
  res.send('Update a product')
}

const deleteProduct = async (req, res) => {
  res.send('Product deleted!')
}

const uploadImage = async (req, res) => {
  res.send('Image uploaded')
}

module.exports = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
}

const Product = require('../models/Product')
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors')

const createProduct = async (req, res) => {
  // console.log(req.products)
  res.send('Product created')
}

const getAllProducts = async (req, res) => {
  // console.log(req.products)
  res.send('Get all products route')
}

const getSingleProduct = async (req, res) => {
  // console.log(req.products)
  res.send('Get single product')
}

const updateProduct = async (req, res) => {
  // console.log(req.products)
  res.send('Update a product')
}

const deleteProduct = async (req, res) => {
  // console.log(req.products)
  res.send('Product deleted!')
}

const uploadImage = async (req, res) => {
  // console.log(req.products)
  res.send('Image uploaded')
}

module.exports = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  uploadImage
}

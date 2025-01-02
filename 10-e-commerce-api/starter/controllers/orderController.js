const Order = '../models/Order'
const Product = require('../models/Product')

const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors')
const { checkPermissions } = require('../utils')

const createOrder = async (req, res) => {
  const { items: cartItems, tax, shippingFee } = req.body

  if (!cartItems || cartItems.length < 1) {
    throw new CustomError.BadRequestError('No cart items provided')
  }
  if (!tax || !shippingFee) {
    throw new CustomError.BadRequestError(
      'Please provide tax and shipping fee'
    )
  }
  let order = []
  let subtotal = 0

  for (const item of cartItems) {
    const dbProduct = await Product.findOne({ _id: item.product })
    if (!dbProduct) {
      throw new CustomError.NotFoundError(
        `No product with id ${dbProduct}`
      )
    }
    const { name, price, image } = dbProduct
    const singleOrderItem = {
      amount: item.amount,
      name,
      price,
      image,
      product: _id,
    }
//add item to order
orderItems = [...orderItems, singleOrderItem]
// calcuate subtotal each iteration
subtotal  += item.amount *price

  }

  console.log(orderItems,);
  console.log(subtotal)
  

  res.send('ORDER CREATED thus far')
}

const getAllOrders = async (req, res) => {
  res.send('get all orders')
}
const getSingleOrder = async (req, res) => {
  res.send('get single order')
}
const getCurrentUserOrders = async (req, res) => {
  res.send('get current user orders')
}

const updateOrder = async (req, res) => {
  res.send('update order')
}

module.exports = {
  getAllOrders,
  getSingleOrder,
  getCurrentUserOrders,
  createOrder,
  updateOrder,
}

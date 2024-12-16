const Review = require('../models/Review')
const Product = require('../models/Product')

const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors')
const { checkPermissions } = require('../utils')

const createReview = async (req, res) => {
  const { product:productId } = req.body
  const isValidProduct = await Product.findOne( {_id: productId})
  if(!isValidProduct){
    throw new CustomError.NotFoundError(`No product with ID: ${productId}`)
  }

  const alreadySubmitted = await Review. findOne( {
    product:productId, user:req.user.userId
  })

  if(alreadySubmitted){
    throw new CustomError.BadRequestError("Already submitted review for this product")
  }

  // We have middleware, that's why we can do this:
  req.body.user = req.user.userId
  const review = await Review.create(req.body)
  res.status(StatusCodes.CREATED).json( {review})

}

const getAllReviews = async (req, res) => {
  res.send('get all reviews')
}

const getSingleReview = async (req, res) => {
  res.send('get single review')
}

const updateReview = async (req, res) => {
  res.send('review updated!')
}

const deleteReview = async (req, res) => {
  res.send('review deleted!')
}

module.exports = {
  createReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
}

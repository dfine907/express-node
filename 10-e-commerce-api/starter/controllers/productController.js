const Product = require('../models/Product')
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors')
const path = require('path')

const createProduct = async (req, res) => {
  //req.body.user comes from the middleware that uses JWT, etc
  req.body.user = req.user.userId
  const product = await Product.create(req.body)
  res.status(StatusCodes.CREATED).json({ product })
}

const getAllProducts = async (req, res) => {
  const product = await Product.find({})
  res.status(StatusCodes.OK).json({ product, count: product.length })
}

const getSingleProduct = async (req, res) => {
  const { id: productId } = req.params
  const product = await Product.findOne({ _id: productId }).populate( 'reviews' )
  if (!product) {
    throw new CustomError.NotFoundError(
      `No product with ID: ${productId} found`
    )
  }
  res.status(StatusCodes.OK).json({ product })
}

//admin status required
const updateProduct = async (req, res) => {
  const { id: productId } = req.params

  const product = await Product.findOneAndUpdate(
    { _id: productId },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  )

  if (!product) {
    throw new CustomError.NotFoundError(
      `No product with id : ${productId}`
    )
  }

  res.status(StatusCodes.OK).json({ product })
}

const deleteProduct = async (req, res) => {
  const { id: productId } = req.params
  const product = await Product.findOne({ _id: productId })
  if (!product) {
    throw new CustomError.NotFoundError(
      `No product with ID: ${productId} found`
    )
  }//use remove because findoneandelete will not remove all the other reviews.
  await product.remove()
  res
    .status(StatusCodes.OK)
    .json({ msg: 'Product succesfully removed!' })
}

const uploadImage = async (req, res) => {
  if (!req.files) {
    throw new CustomError.BadRequestError('No File Uploaded');
  }
  const productImage = req.files.image;

  if (!productImage.mimetype.startsWith('image')) {
    throw new CustomError.BadRequestError('Please Upload Image');
  }

  const maxSize = 1024 * 1024;

  if (productImage.size > maxSize) {
    throw new CustomError.BadRequestError(
      'Please upload image smaller than 1MB'
    );
  }

  const imagePath = path.join(
    __dirname,
    '../public/uploads/' + `${productImage.name}`
  );
  await productImage.mv(imagePath);
  res.status(StatusCodes.OK).json({ image: `/uploads/${productImage.name}` });
};

module.exports = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
}

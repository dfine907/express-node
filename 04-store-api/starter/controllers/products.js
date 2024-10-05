const Product = require('../models/product')

//TESTING:
const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({}).sort('name')
  res.status(200).json({ products, nbHits: products.length })
}

const getAllProducts = async (req, res) => {
  const { featured, company, name, sort } = req.query

  const queryObject = {}

  if (featured) {
    queryObject.featured = featured === 'true' ? true : false
  }
  if (company) {
    queryObject.company = company
  }

  if (name) {
    queryObject.name = { $regex: name, $options: 'i' }
  }
  // if (name) {
  //   queryObject.name_lowercase = name.toLowerCase()
  // }


  // const products = await Product.find(queryObject)
  let result = Product.find(queryObject)

  if (sort) {
    const sortList = sort.split(',').join(' ')
    result = result.sort(sortList)
  } else {
    result = result.sort('createAt')
  }

  const products = await result
  // res.status(200).json({ msg: 'productions route' })
  res.status(200).json({ products, nbHits: products.length })
}

module.exports = {
  getAllProductsStatic,
  getAllProducts,
}

//ORGINAL SIMPLE:
// const Product = require('../models/product')

// const getAllProductsStatic = async (req, res) => {
//   const products = await Product.find({
//     name: 'vase table',
//   })
//   res.status(200).json({ products, nbHits: products.length })
// }

// const getAllProducts = async (req, res) => {
//   console.log(req.query)
//   res.status(200).json({ msg: 'productions route' })
// }

// module.exports = {
//   getAllProductsStatic,
//   getAllProducts,
// }

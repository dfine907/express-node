const Product = require('../models/product')

//TESTING:
const getAllProductsStatic = async (req, res) => {
  const search = 'a'
  const products = await Product.find({
    name: {$regex:search, $options:'i'}
  })
  res.status(200).json({ products, nbHits: products.length })
}

const getAllProducts = async (req, res) => {
  const { featured, company, name } = req.query
  //now set up a new object:
  const queryObject = {}

  if (featured) {
    queryObject.featured = featured === 'true' ? true : false
  }
  if(company){
    queryObject.company = company
  }

  if(name){
    queryObject.name = {$regex: name, $options:'i'}
  }
  console.log(queryObject)

  const products = await Product.find(queryObject)

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

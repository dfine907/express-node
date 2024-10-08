const Product = require('../models/product')

//TESTING:
const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({ price: { $gt: 30 } })
    .sort('price')
    .select('name price')
  res.status(200).json({ products, nbHits: products.length })
}

const getAllProducts = async (req, res) => {
  const { featured, company, name, sort, fields, numericFilters } =
    req.query

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
  // ALTERNATIVE instead of regex
  // if (name) {
  //   queryObject.name_lowercase = name.toLowerCase()
  // }

  if (numericFilters) {
    const operatorMap = {
      '>': '$gt',
      '>=': '$gte',
      '=': '$eq',
      '<': '$lt',
      '<=': '$lte',
    }

    const regEx = /\b(<|>|>=|=|<|<=)\b/g
    let filters = numericFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    )
    const options = ['price', 'rating']
    filters = filters.split(',').forEach((item) => {
      const [field, operator, value] = item.split('-')
      if (options.includes(field)) {
        queryObject[field] = { [operator]: Number(value) }
      }
    })
  }

  // USING NO REGEX: 
  // if (numericFilters) {
  
  //   const options = ['price', 'rating']
  //   let filters = numericFilters.split(',')

  //   filters.forEach((filter) => {
  //     let operator
  //     let field
  //     let value

  //     if (filter.includes('>=')) {
  //       ;[field, value] = filter.split('>=')
  //       operator = '$gte'
  //     } else if (filter.includes('<=')) {
  //       ;[field, value] = filter.split('<=')
  //       operator = '$lte'
  //     } else if (filter.includes('>')) {
  //       ;[field, value] = filter.split('>')
  //       operator = '$gt'
  //     } else if (filter.includes('<')) {
  //       ;[field, value] = filter.split('<')
  //       operator = '$lt'
  //     } else if (filter.includes('=')) {
  //       ;[field, value] = filter.split('=')
  //       operator = '$eq'
  //     }

  //     if (options.includes(field)) {
  //       queryObject[field] = { [operator]: Number(value) }
  //     }
  //   })
  // }

  console.log(queryObject)

  let result = Product.find(queryObject)

  // SORT
  if (sort) {
    const sortList = sort.split(',').join(' ')
    result = result.sort(sortList)
  } else {
    result = result.sort('createAt')
  }
  if (fields) {
    const fieldsList = fields.split(',').join(' ')
    result = result.select(fieldsList)
  }

  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 10
  const skip = (page - 1) * limit

  result = result.skip(skip).limit(limit)
  //Notes: total 23 products in data file
  // if limit chose is 7 pages ==> 23/7 = 4 pages ( 7,7,7,2 times each page)

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

const getAllProductsStatic = async (req, res) => {
    throw new Error('testing async errors')
    // res.status(200).json({ msg: "productions testing route" });
  };
  
  const getAllProducts = async (req, res) => {
    res.status(200).json({ msg: "productions route" });
  };
  
  module.exports = {
    getAllProductsStatic,
    getAllProducts,
  };
  
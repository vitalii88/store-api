
export const getAllProductsStatic = async (req, resp) => {
  throw new Error('testing async errors');
  resp.status(200).json({msg: 'test getAllProductsStatic route'});
};

export const getAllProducts = async (req, resp) => {
  resp.status(200).json({msg: 'test getAllProducts route'});
};


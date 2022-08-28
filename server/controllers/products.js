import Products from '../models/products.js';

export const getAllProductsStatic = async (req, resp) => {
  const products = await Products.find({}).sort('-name price');
  resp.status(200).json({ products, nbHits: products.length });
};

export const getAllProducts = async (req, resp) => {
  const { featured, company, name, sort } = req.query;
  const queryObj = {};

  if (featured) {
    queryObj.featured = (featured === 'true');
  }
  if (company) {
    queryObj.company = company;
  }
  if (name) {
    queryObj.name = { $regex: name, $options: 'i' };
  }

  console.log(queryObj)
  let result = Products.find(queryObj);
  if (sort) {
    const sortList = sort.split(',').join(' ');
    result = result.sort(sortList);
  } else {
    result.sort('createdAt');
  }
  const products = await result;
  resp.status(200).json({ products, nbHits: products.length });
};


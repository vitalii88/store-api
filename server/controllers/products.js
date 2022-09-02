import Products from '../models/products.js';

export const getAllProductsStatic = async (req, resp) => {
  const products = await Products.find({}).select('name price').limit(3);
  resp.status(200).json({ products, nbHits: products.length });
};

export const getAllProducts = async (req, resp) => {
  const {
    featured,
    company,
    name,
    sort,
    fields,
    numericFilters,
  } = req.query;
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
  if (numericFilters) {
    const operators = {
      '>': '$gt',
      '>=': '$gte',
      '=': '$eq',
      '<': '$lt',
      '<=': '$lte',
    }
    const regEx = /\b(<|>|<=|>=|=)\b/g;
    let filters = numericFilters.replace(regEx, (match) => `-${operators[match]}-`);
    const options = ['price','rating'];
    filters.split(',').forEach((item) => {
        const [field, operator, value] = item.split('-');
        if (options.includes(field)) {
          queryObj[field] = { [operator]: Number(value) };
        }
    });
  }

  let result = Products.find(queryObj);
  // SORT
  if (sort) {
    const sortList = sort.split(',').join(' ');
    result = result.sort(sortList);
  } else {
    result.sort('createdAt');
  }

  // FIELDS
  if (fields) {
    const fieldsList = fields.split(',').join(' ');
    result = result.select(fieldsList);
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const products = await result;
  resp.status(200).json({ products, nbHits: products.length });
};


const addProduct = (Produk) => async (data) => {
  try {
    const newProduct = new Produk(data);
    return newProduct.save();
  } catch (error) {
    return Promise.reject(error);
  }
};
const listProduct = (Produk) => async (queries = {}) => {
  const products = await Produk.find(queries);
  return products;
};
module.exports = (model) => ({
  addProduct: addProduct(model),
  listProduct: listProduct(model),
});

const addProduct = (Produk) => async (data) => {
  try {
    const newProduct = new Produk(data);
    return newProduct.save();
  } catch (error) {
    return Promise.reject(error);
  }
};

const editProduct = (Produk) => async (id, data) => {
  try {
    const editedProduct = await Produk.findByIdAndUpdate(id, data, {
      new: true,
    });
    return editedProduct;
  } catch (error) {
    return Promise.reject(error);
  }
};

const deleteProduct = (Produk) => async (id) => {
  try {
    const deletedProduct = await Produk.findByIdAndDelete(id);
    return deletedProduct;
  } catch (error) {
    return Promise.reject(error);
  }
};

const listProduct =
  (Produk) =>
  async (queries = {}) => {
    const products = await Produk.find(queries).populate("pemilik", "nama");
    return products;
  };

const getProduct = (Produk) => (id) => {
  return Produk.findById(id);
};

const exists = (Produk) => (id) => {
  return Produk.exists({ _id: id });
};

module.exports = (model) => ({
  addProduct: addProduct(model),
  listProduct: listProduct(model),
  editProduct: editProduct(model),
  deleteProduct: deleteProduct(model),
  getProduct: getProduct(model),
  exists: exists(model),
});

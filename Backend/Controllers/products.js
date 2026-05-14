import Products from "../Models/products.js";


export async function createProducts(req, res) {
  try {
    const { name, price, discount, stock, manufacturer, category, description } = req.body;
    const image = req.file ? req.file.filename : null;
    const products = await Products.create({
      name,
      price,
      discount,
      stock,
      manufacturer,
      image,
      category,
      description
    });

    return res.json({ products });

  } catch (err) {
    console.log('products error:', err)
    return res.status(500).json({ msg: err });
  }

};

export async function getProducts(req, res) {
  try {
    const products = await Products.find({});
    return res.json({ products });

  } catch (err) {
    return res.status(500).json({ msg: err });
  }

};
getProducts;

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Products.findByIdAndDelete(id);
    return res.status(200).json(product);
  } catch (err) {
    console.log('delete===>error', err);
    return res.status(500).json({ msg: err });
  }
}


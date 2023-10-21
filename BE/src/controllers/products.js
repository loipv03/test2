import Products from "../models/products";

export const addProduct = async (req, res) => {
  try {
    const product = await Products.create({
      image: req.files["image"][0].path,
      thumbnail: req.files["thumbnail"].map((file) => file.path),
    });
    return res.status(201).json({
      messange: "Thêm sản phẩm thành công",
      product,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

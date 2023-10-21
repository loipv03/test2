import Products from "../models/products";
import { v2 as cloudinary } from "cloudinary";

export const updateProduct = async (req, res) => {
  try {
    const product = await Products.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Không có sản phẩm nào!",
      });
    }

    const products = await Products.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        image: req.files?.["image"]?.[0].path ?? product.image,
        thumbnail:
          [
            ...req.files?.["thumbnail"]?.map((file) => file.path),
            ...product.thumbnail,
          ] ?? product.thumbnail,
      },
      {
        new: true,
      }
    );
    return res.status(200).json({
      messange: "update sản phẩm thành công",
      product: products,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

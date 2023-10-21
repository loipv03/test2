import cloudinary from "../configs/cloudinary";
import Product from "../models/products";

export const updateThumbnail = async (req, res) => {
  try {
    const id = req.params.id;
    const publicId = req.params.publicId;
    const product = await Product.findById(id);

    product.thumbnail.map((item, index) => {
      if (item.includes(publicId)) {
        product.thumbnail.splice(index, 1);
        return product;
      }
    });

    const { result } = await cloudinary.uploader.destroy(
      `${process.env.FOLDER_CLOUDINARY}/${publicId}`
    );

    const updateThumbnail = await Product.findByIdAndUpdate(id, product, {
      new: true,
    });

    if (!product && !updateThumbnail) {
      return res.status(404).json({
        error: true,
        message: "Sản phẩm không tồn tại!",
      });
    }

    if (result !== "ok") {
      return res.status(404).json({
        error: true,
        message: "Cập nhật thất bại, vui lòng thử lại sau",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Cập nhật thành công",
      updateThumbnail,
    });
  } catch (error) {
    return res.status(404).json({
      error: true,
      message: error.message,
    });
  }
};

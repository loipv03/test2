import express from "express";
import { addProduct } from "../controllers/products";
import { updateProduct } from "../controllers/updateProduct";
import { upload } from "../configs/cloudinary";
import { updateThumbnail } from "../controllers/updateThumbnail";

const router = express.Router();

router.post(
  "/products",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "thumbnail", maxCount: 20 },
  ]),
  addProduct
);
router.patch(
  "/products/:id",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "thumbnail", maxCount: 20 },
  ]),
  updateProduct
);

router.patch("/products/updateThumbnail/:id/:publicId", updateThumbnail);

export default router;

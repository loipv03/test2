import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    image: String,
    thumbnail: [String],
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model("Products", productSchema);

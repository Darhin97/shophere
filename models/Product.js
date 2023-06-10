import { Schema, model, models } from "mongoose";

const ProductSchema = Schema({
  id: String,
  name: String,
  description: String,
  price: Number,
  category: String,
});

const Product = models?.Product || model("Product", ProductSchema);

export default Product;

import mongoose from "mongoose";

const dbUrl = `${process.env.MONGO_URI}${process.env.DB_NAME}`;

//set up Product Schema and model
const ProductSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  size: String,
  category: String,
  image: String
});
const Product = mongoose.model("Product", ProductSchema);

//set up Category Schema and model
const CategorySchema = new mongoose.Schema({
  name: String,
  description: String,
});
const Category = mongoose.model("Category", CategorySchema);

await mongoose.connect(dbUrl); 
//MONGODB FUNCTIONS

// PRODUCT FUNCTIONS
//Get all Products from the Products collection
async function getProducts() {
  return await Product.find({}); //return array for find all
}

//function to add product
async function addProduct(data) {
  return await Product.create(data); //return array for find all
}

//function to update data
async function getProductById(id){
  return await Product.findById(id);
}
async function updateProduct(id, data){
  return await Product.findByIdAndUpdate(id, data);
}

//function to delete by id
async function deleteProduct(id) {
  return await Product.findByIdAndDelete(id);
}
// CATEGORY FUNCTIONS
async function getCategories() {
  return await Category.find({}); //return array for find all
}

//function to add Category
async function addCategory(data) {
  return await Category.create(data); //return array for find all
}

//function to delete by id
async function deleteCategory(id) {
  return await Category.findByIdAndDelete(id);
}


//export all functions so that another file like(index.js)can use them
export default {
  getProducts,
  addProduct,
  getProductById,
  updateProduct,
  deleteProduct,
  
  addCategory,
  getCategories,
  deleteCategory
};
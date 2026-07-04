import mongoose from "mongoose";

const dbUrl = `${process.env.MONGO_URI}${process.env.DB_NAME}`;// Database connection string using environment variables

//set up Product Schema and model
const ProductSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  size: String,
  category: String,
  image: String
});
const Product = mongoose.model("Product", ProductSchema); // create a model based on product schema

//set up Category Schema and model
const CategorySchema = new mongoose.Schema({
  name: String,
  description: String,
});
const Category = mongoose.model("Category", CategorySchema); // create a model based on category schema

await mongoose.connect(dbUrl); // Established connection to MongoDb database 


// PRODUCT FUNCTIONS

//Get all Products from the Products collection in database
async function getProducts() {
  return await Product.find({}); //return array for find all
}

//function to add new product to the collection
async function addProduct(data) {
  return await Product.create(data); //return array for find all
}

//function to retrieve a specific product by its unique ID
async function getProductById(id){
  return await Product.findById(id);
}
// function to UPDATE product information by ID
async function updateProduct(id, data){
  return await Product.findByIdAndUpdate(id, data);
}

//function to DELETE product by id
async function deleteProduct(id) {
  return await Product.findByIdAndDelete(id);
}
// CATEGORY FUNCTIONS
//Get all CATEGORIES from the Categories collection in database
async function getCategories() {
  return await Category.find({}); //return array for find all
}

//function to ADD new Category to the collection
async function addCategory(data) {
  return await Category.create(data); //return array for find all
}

//function to DELETE Category by id
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
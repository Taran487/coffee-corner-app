import "dotenv/config"; // Environment variable from .env file
import express from "express";
import path from "path";
import db from "./components/db.js"; //load db.js

const __dirname = import.meta.dirname; 

const app = express(); //set up the Express app

const port = process.env.PORT || "8888";

//Set up Application Template Engine
app.set("views", path.join(__dirname, "views")); //The first "views" is the setting name. the Second value above is the path: __dirname/views

app.set("view engine", "pug"); // Set the engine to render files

//set up Folder for static files(css, images)
app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: true }));//This line reads data from browser, decode the data and put it inside request.body

//USE PAGE ROUTES FROM ROUTER(S)

//DASHBOARD PAGE
app.get("/",async(request, response) => {
  response.render("dashboard",{});
});

//PRODUCTS PAGE fetches all the products and display them on the Product Page
app.get("/products",async(request, response) => { 
  let productList = await db.getProducts(); // The getProduct() function is called defined inside db.js and fetch products array and assign all data here in variable productList. 
  console.log(productList);
  response.render("products",{ products: productList}); // Object containing KEY: products means variables used inside product.pug file and VALUE:productList actual data that just fetched using db.getProducts()
});

// ADD PRODUCT PAGE shows a form to add new product 
app.get("/products/add",(request, response)=>{
  response.render("addProduct");
});
// SAVE the data of Submitted form in the database
app.post("/products/add", async(request, response)=>{
  await db.addProduct({
    name: request.body.name, // Takes what we type in name field in form
    description: request.body.description,
    price: request.body.price,
    size: request.body.size,
    category: request.body.category,
    image: request.body.image
  });
  response.redirect("/products"); // Return to product list
})

//UPDATE PRODUCT PAGE it will shows form that already filled with data found by ID and we edit that form and hit submit
app.get("/products/update/:id", async(request, response) => {
  const product = await db.getProductById(request.params.id);
    response.render("updateProduct", { product });
});
// Save the edited data in to database
app.post("/products/update/:id", async(request, response)=>{
  await db.updateProduct(request.params.id,{
    name: request.body.name,
    description: request.body.description,
    price: request.body.price,
    size: request.body.size,
    category: request.body.category,
    image: request.body.image
  });
  response.redirect("/products");
})

//DELETE PRODUCT  this will delete the product by ID and redirect to products page
app.get("/products/delete/:id", async (request, response) => {
  await db.deleteProduct(request.params.id); // (request.params.id) request.params is an object it will take the id and gives to delete function
  response.redirect("/products");
});

//CATEGORIES PAGE
app.get("/categories",async(request, response) => {
  let categoryList = await db.getCategories();
  response.render("categories",{ categories: categoryList});
});

// ADD CATEGORY PAGE shows a form to add new Category
app.get("/categories/add",(request, response)=>{
  response.render("addCategory");
});

// SAVE the data of Submitted form in the database
app.post("/categories/add", async(request, response)=>{
  await db.addCategory({
    name: request.body.name,
    description: request.body.description,
  });
  response.redirect("/categories");
})

//DELETE CATEGORY  this will delete the Category by ID and redirect to Categories page
app.get("/categories/delete/:id", async (request, response) => {
  await db.deleteCategory(request.params.id);
  response.redirect("/categories");
});

//API ENDPOINTS

// API to GET Products as JSON data
app.get("/api/products", async(request, response) => {
  const products = await db.getProducts();
  response.json(products);
});

// API to GET Categories as JSON data
app.get("/api/categories", async(request, response) => {
  const categories = await db.getCategories();
  response.json(categories);
});

//set up server listening
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
}); 


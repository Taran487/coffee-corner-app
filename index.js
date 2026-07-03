import "dotenv/config";
import express from "express";
import path from "path";

import db from "./components/db.js"; //load db.js


const __dirname = import.meta.dirname;

//set up the Express app
const app = express();
const port = process.env.PORT || "8888";

//set up application template engine
app.set("views", path.join(__dirname, "views")); //the first "views" is the setting name
//the second value above is the path: __dirname/views
app.set("view engine", "pug");

//set up folder for static files
app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: true }));//This line reads data from browser, decode the data and put it inside request.body

//USE PAGE ROUTES FROM ROUTER(S)

//DASHBOARD PAGE
app.get("/",async(request, response) => {
  response.render("dashboard",{});
});

//PRODUCTS PAGE

app.get("/products",async(request, response) => {
  let productList = await db.getProducts();
  console.log(productList);
  response.render("products",{ products: productList});
});

app.get("/products/add",(request, response)=>{
  response.render("addProduct");
});

app.post("/products/add", async(request, response)=>{
  await db.addProduct({
    name: request.body.name,
    description: request.body.description,
    price: request.body.price,
    size: request.body.size,
    category: request.body.category,
    image: request.body.image
  });
  response.redirect("/products");
})

app.get("/products/update/:id", async(request, response) => {
  const product = await db.getProductById(request.params.id);
    response.render("updateProduct", { product });
});

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

//Delete
app.get("/products/delete/:id", async (request, response) => {
  await db.deleteProduct(request.params.id);
  response.redirect("/products");
});

//CATEGORIES PAGE
app.get("/categories",async(request, response) => {
  let categoryList = await db.getCategories();
  response.render("categories",{ categories: categoryList});
});

app.get("/categories/add",(request, response)=>{
  response.render("addCategory");
});

app.post("/categories/add", async(request, response)=>{
  await db.addCategory({
    name: request.body.name,
    description: request.body.description,
  });
  response.redirect("/categories");
})

//Delete
app.get("/categories/delete/:id", async (request, response) => {
  await db.deleteCategory(request.params.id);
  response.redirect("/categories");
});



//API ENDPOINTS
app.get("/api/products", async(request, response) => {
  const products = await db.getProducts();
  response.json(products);
});

app.get("/api/categories", async(request, response) => {
  const categories = await db.getCategories();
  response.json(categories);
});

//set up server listening
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
}); 


const express = require("express");
const session = require("express-session");
const nocache = require('nocache');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// Load variables from `.env` file into process.env global object.
dotenv.config();

// Routers
const authRoutes = require("./routers/authRouter");
const userRoutes = require("./routers/userRouter");
const adminRoutes = require("./routers/adminRouter");

//User
const User = require("./models/User");

// Initialize database
mongoose.connect("mongodb://localhost:27017/heal")
.then(() => {
  console.log("🍃  Mongoose connected with MongoDB successfully.")
})
.catch(err => {
  console.log("❌ Mongoose could not establish a connection with MongoDB")
  console.error(err);
  process.exit(1);
});



// Initialize server application.
const app = express();

// Set EJS as the view engine.
app.set("view engine", "ejs")
// Serve the 'public' folder statically.
app.use(express.static('public'));
// Accept all kinds of POST data from user and put it in req.body.
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Set up session configuration
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))

// Make sure that no route is cached by browser.
// nocache is a library used to prevent browser caching.
app.use(nocache());

// -- Routes --
app.get('/', function(req, res) {
  // Render our home page.
  res.render('index');
});

// Apply authentication routes like /login, /register.
app.use("/",authRoutes);
// Apply user routes like /dashboard
app.use("/",userRoutes);

// Apply admin routes like /admin/dashboard
app.use("/admin", adminRoutes);

// 404 Page, Wildcard Route (Catch ALl)
app.get("*", function(request,response){
  // response.sendStatus(404);
  response.status(404); // Set the status code.
  response.send("404 Not Found");
});

// Start the server on port defined in .env.
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`😍  Server Started on http://localhost:${port}`)
});

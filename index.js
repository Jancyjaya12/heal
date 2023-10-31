// Dependency
const express = require("express");
const session = require("express-session");

// nocache is a library used to prevent browser caching.
const nocache = require('nocache');

const dotenv = require('dotenv');
// Load variables from `.env` file into process.env global object.
dotenv.config();

// Initialize server application.
const app = express()

// Set EJS as the view engine.
app.set("view engine", "ejs")
// Serve the 'public' folder statically.
app.use(express.static('public'));
// Accept all kinds of POST data from user and put it in req.body.
app.use(express.urlencoded({ extended: true }));
// Set up session configuration
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))

// Make sure that no route is cached by broweser.
app.use(nocache());

// -- Routes --
app.get("/", function (request, response) {
  // Render the login page.
  // Render = Build to HTML + Send to User

  if (request.session.loggedIn === true) {
    response.redirect('/dashboard');
  } else {
    response.render("index");
  }
});

app.get('/login', function(request, response) {
  response.redirect('/');
})

app.post("/login", function (request, response) {
  // Validate user input with credentials.
  if (request.body.email === process.env.EMAIL && request.body.password === process.env.PASSWORD) {
    // Store user data in session.
    request.session.loggedIn = true;
    request.session.email = request.body.email;
    // If user has valid details, send them to /dashboard.
    response.redirect('/dashboard');
  } else { 
    // If invalid details, render same login page with an error message.
    response.render("index", { error: "Invalid credentials" })
  }
})

app.get("/dashboard", function (request, response) {
  if (request.session.loggedIn === true) {
    // We pass this to the dashboard.ejs to render a greeting message dynamically,
    // according to time...
    const currentHour = new Date().getHours();
    // If user is already logged in, show them dashboard.
    response.render("dashboard", { currentHour: currentHour, email: request.session.email })
  }
  else {
    // If user is not logged in, send them back to login page.
    response.redirect('/')
  }
})

app.get("/signout", function (request, response) {
  // Clear all session data when user logs out.
  request.session.loggedIn = false;
  request.session.email = null;
  response.redirect("/")
});

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
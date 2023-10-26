// Dependency
const express = require("express")
const session = require("express-session");
const nocache = require('nocache');
// Initialize server application.
const app = express()

// Set EJS as the view engine.
app.set("view engine", "ejs")
// Serve the 'public' folder statically.
app.use(express.static('public')); 0
app.use(express.urlencoded({ extended: true }));
// Set up session configuration
app.use(session({
  secret: "dashiodyhaw9ioduyhwaoiuerhoaiwuehoiawerhr",
  resave: false,
  saveUninitialized: true
}))
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

app.post("/login", function (request, response) {

  if (request.body.email === "waterrmalann@ai.com" && request.body.password === "30112004") {
    request.session.loggedIn = true;
    response.redirect('/dashboard');
  } else {
    response.render("index", { error: "Invalid credentials" })
  }
})
app.get("/dashboard", function (request, response) {
  if (request.session.loggedIn === true) {
    response.render("dashboard")
  }
  else {
    response.redirect('/')
  }
})

app.get("/signout", function (request, response) {
  request.session.loggedIn = false;
  response.redirect("/")
})


// Start the server on port 5000.
app.listen(5000, () => {
  console.log("😍  Server Started on http://localhost:5000")
})

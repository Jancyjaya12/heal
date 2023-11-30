const bcrypt = require("bcrypt");
const User = require("../models/User")


function getLogin(request, response) {
  // Render the login page.
  // Render = Build to HTML + Send to User

  if (request.session.loggedIn === true) {
    response.redirect('/dashboard');
  } else {
    if (request.session.newlyRegistered) {
      request.session.newlyRegistered = false;
      response.render("login", { error: "Account was registered successfully." });
    } else {
      response.render("login");
    }
  }
}

async function postLogin(request, response) {
  const { email, password } = request.body;
  // Find user by email.
  const user = await User.findOne({ email });
  if (!user) {
    response.render("login", { error: "Invalid credentials" })
  } else {
    // Validate user input with credentials.
    if (await bcrypt.compare(password, user.password)) {
      // Store user data in session.
      request.session.loggedIn = true;
      request.session.email = request.body.email;
  
      // If user has valid details, send them to /dashboard.
      response.redirect('/dashboard');
    } else {
      response.render("login", { error: "Invalid credentials" })
    }
  }
}

function getLogout(request, response) {
  // Clear all session data when user logs out.
  request.session.loggedIn = false;
  request.session.email = null;
  response.redirect("/")
}

function getRegister(request, response) {
  if (request.session.loggedIn === true) {
    response.redirect("/dashboard")
  }
  else {
    response.render("register")
  }

}

async function postRegister(request, response) {
  const { name, username, email, password } = request.body

  // Hash the password using bcrypt
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await User.create({ name, username, email, password: hashedPassword });
    request.session.newlyRegistered = true;
    response.redirect('/login');
  } catch (err) {
    console.error(err);
    response.send(err);
  }

}

module.exports = {
  getLogin,
  postLogin,
  getLogout,
  getRegister,
  postRegister
}
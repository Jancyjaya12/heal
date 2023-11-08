function getLogin(request, response) {
  // Render the login page.
  // Render = Build to HTML + Send to User

  if (request.session.loggedIn === true) {
    response.redirect('/dashboard');
  } else {
    response.render("login");
  }
}

function postLogin(request, response) {
  // Validate user input with credentials.
  if (request.body.email === process.env.EMAIL && request.body.password === process.env.PASSWORD) {
    // Store user data in session.
    request.session.loggedIn = true;
    request.session.email = request.body.email;
    // If user has valid details, send them to /dashboard.
    response.redirect('/dashboard');
  } else { 
    // If invalid details, render same login page with an error message.
    response.render("login", { error: "Invalid credentials" })
  }
}

function getLogout(request, response) {
  // Clear all session data when user logs out.
  request.session.loggedIn = false;
  request.session.email = null;
  response.redirect("/")
}

function getRegister(request, response){
  if(request.session.loggedIn===true){
    response.redirect("/dashboard")
  }
  else{
    response.render("register")
  }
  
}



module.exports = { 
  getLogin, 
  postLogin,
  getLogout,
  getRegister
}
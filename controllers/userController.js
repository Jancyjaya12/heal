function getDashboard(request, response) {
  if (request.session.loggedIn === true) {
    // We pass this to the dashboard.ejs to render a greeting message dynamically,
    // according to time...
    const currentHour = new Date().getHours();
    // If user is already logged in, show them dashboard.
    response.render("dashboard", { currentHour: currentHour, email: request.session.email })
  }
  else {
    // If user is not logged in, send them back to login page.
    response.redirect('/login')
  }
}

module.exports = { getDashboard }
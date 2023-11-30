const User = require("../models/User");
const bcrypt = require('bcrypt');

// getAdminLogin, postAdminLogin, getAdminDashboard, getUsers

const getAdminLogin = async (req, res) => {
  if (req.session.isAdmin) {
    // Admin is already logged in, so should goto dashboard.
    res.redirect('/admin/dashboard');
  } else {
    res.render("admin/login");
  }
}

const getAdminLogout = async (req, res) => {
  req.session.isAdmin = false;
  res.redirect('/admin/');
}

const postAdminLogin = async (req, res) => {
  const { email, password } = req.body;
  if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
    req.session.isAdmin = true;
    res.redirect('/admin/dashboard');
  } else {
    res.send("Invalid admin credentials.");
  }
}

const getAdminDashboard = async (req, res) => {
  if (!req.session.isAdmin) {
    return res.sendStatus(403);
  }
  res.render("admin/dashboard");
}

const getUsers = async (req, res) => {
  if (!req.session.isAdmin) {
    return res.sendStatus(403);
  }

  const allUsers = await User.find();
  res.render("admin/users", { users: allUsers });
}

const deleteUserById = async (req, res) => {
  if (!req.session.isAdmin) {
    return res.sendStatus(403);
  }

  const { id } = req.params;
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      res.status(404).send({ success: false, message: "user not found" });
    } else {
      res.status(200).send({ success: true });
    }
  } catch (err) {
    res.status(500).send({ success: false });
  }
}

const putUserById = async (req, res) => {
  const { id } = req.params;
  const { name, username, email } = req.body;
  try {
    const user = await User.findByIdAndUpdate(id, { name, username, email });
    if (!user) {
      res.status(404).send({ success: false, message: "user not found" });
    } else {
      res.status(200).send({ success: true });
    }
  } catch (err) {
    res.status(500).send({ success: false });
  }
}

module.exports = {
  getAdminLogin, getAdminLogout, deleteUserById, putUserById, postAdminLogin, getAdminDashboard, getUsers
}
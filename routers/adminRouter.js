const express = require('express');
const { getAdminLogin, postAdminLogin, getAdminDashboard, getUsers, deleteUserById, putUserById, getAdminLogout } = require('../controllers/adminController');
const router = express.Router();

router.get('/login', (req, res) => { res.redirect('/admin/') });
router.get('/', getAdminLogin);
router.post('/', postAdminLogin);
router.get('/dashboard', getAdminDashboard);
router.get('/users', getUsers);
router.delete('/users/:id', deleteUserById);
router.put('/users/:id', putUserById);
router.get('/logout', getAdminLogout);

module.exports = router;
const express = require('express');
const { createNavigationItem, getNavigationItems } = require('../controller/navigate.controller');
const router = express.Router();

router.post('/', createNavigationItem);
router.get('/', getNavigationItems);

module.exports = router;
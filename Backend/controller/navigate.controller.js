const NavigationItem = require('../models/navigate.model');

exports.createNavigationItem = async (req, res) => {
  try {
    const { title, link, order } = req.body;
    const newItem = new NavigationItem({ title, link, order });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getNavigationItems = async (req, res) => {
  try {
    const items = await NavigationItem.find().sort('order');
    res.json(items);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const express = require('express');
const router = express.Router();
const { getGroups, createGroup, getLatestGroups,joinGroup,leaveGroup,latestgroup } = require('../controller/newgroup.controller');
 
router.get('/groups', getGroups);
router.post('/groups', createGroup);
router.get('/groups/latest', getLatestGroups);
router.post('/groups/join', joinGroup);
router.post('/groups/leave', leaveGroup); // New route for leaving a group
router.get('/latestgroup/top3',latestgroup)
 
module.exports = router;
 
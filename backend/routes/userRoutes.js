const express = require('express');
const router = express.Router();
const {
    getUserProfile,
    getPublicProfile,
    updateUserProfile,
    addSkillOffered,
    addSkillWanted,
    removeSkill
} = require('../controllers/userController');

// All routes are prefixed with /api/users in server.js

// Profile routing
router.get('/me', getUserProfile);
router.get('/:userId', getPublicProfile);
router.put('/update', updateUserProfile);

// Skills management
router.put('/add-skill-offered', addSkillOffered);
router.put('/add-skill-wanted', addSkillWanted);
router.delete('/remove-skill/:skillName', removeSkill);

module.exports = router;

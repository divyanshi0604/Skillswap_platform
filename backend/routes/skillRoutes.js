const express = require('express');
const router = express.Router();
const {
    createSkill,
    getAllSkills,
    searchSkills
} = require('../controllers/skillController');

router.post('/', createSkill);
router.get('/', getAllSkills);
router.get('/search', searchSkills);

module.exports = router;

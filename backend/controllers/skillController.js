const Skill = require('../models/Skill');
const User = require('../models/User');

// Helper to get user from header
const getUserFromHeader = async (req) => {
    const email = req.headers['user-email'];
    if (!email) throw new Error('Unauthorized: user-email header is missing');
    const user = await User.findOne({ email });
    if (!user) throw new Error('User not found');
    return user;
};

// POST /api/skills — Create a new skill
exports.createSkill = async (req, res) => {
    try {
        const user = await getUserFromHeader(req);
        const { title, level, category, description } = req.body;

        if (!title) return res.status(400).json({ message: 'Skill title is required' });

        const skill = await Skill.create({
            title,
            level: level || 'Beginner',
            category: category || 'General',
            description: description || '',
            userId: user._id
        });

        res.status(201).json(skill);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// GET /api/skills — Return paginated skills excluding the current user's. Defaults to showing MATCHES.
exports.getAllSkills = async (req, res) => {
    try {
        const user = await getUserFromHeader(req);

        const page = Math.max(1, parseInt(req.query.page) || 1);
        const limit = Math.min(50, Math.max(1, parseInt(req.query.limit) || 9));
        const skip = (page - 1) * limit;

        // If ?userId= is provided, return all skills for that specific user
        if (req.query.userId) {
            const [skills, totalSkills] = await Promise.all([
                Skill.find({ userId: req.query.userId })
                    .populate('userId', 'name location')
                    .sort({ createdAt: -1 })
                    .skip(skip)
                    .limit(limit),
                Skill.countDocuments({ userId: req.query.userId })
            ]);
            return res.status(200).json({
                skills,
                currentPage: page,
                totalPages: Math.ceil(totalSkills / limit) || 1,
                totalSkills
            });
        }

        // Extract wanted skill names, lowercase and trimmed
        const wantedSkillNames = user.skillsWanted.map(s => s.name.trim().toLowerCase());

        // If user wants nothing, they get 0 matches in the default view
        if (wantedSkillNames.length === 0) {
            return res.status(200).json({
                skills: [],
                currentPage: page,
                totalPages: 1,
                totalSkills: 0
            });
        }

        // Build case-insensitive regex array for matching
        const regexArray = wantedSkillNames.map(name => new RegExp(`^${name}$`, 'i'));

        const filter = { 
            userId: { $ne: user._id },
            title: { $in: regexArray }
        };

        const [skills, totalSkills] = await Promise.all([
            Skill.find(filter)
                .populate('userId', 'name email location')
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit),
            Skill.countDocuments(filter)
        ]);

        res.status(200).json({
            skills,
            currentPage: page,
            totalPages: Math.ceil(totalSkills / limit) || 1,
            totalSkills
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// GET /api/skills/search?query=react — Search skills with pagination
exports.searchSkills = async (req, res) => {
    try {
        const user = await getUserFromHeader(req);
        const { query } = req.query;

        if (!query) return res.status(200).json({ skills: [], currentPage: 1, totalPages: 1, totalSkills: 0 });

        const page = Math.max(1, parseInt(req.query.page) || 1);
        const limit = Math.min(50, Math.max(1, parseInt(req.query.limit) || 9));
        const skip = (page - 1) * limit;

        const regex = new RegExp(query, 'i');

        const filter = {
            userId: { $ne: user._id },
            $or: [
                { title: regex },
                { category: regex },
                { description: regex }
            ]
        };

        const [skills, totalSkills] = await Promise.all([
            Skill.find(filter)
                .populate('userId', 'name email location')
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit),
            Skill.countDocuments(filter)
        ]);

        res.status(200).json({
            skills,
            currentPage: page,
            totalPages: Math.ceil(totalSkills / limit) || 1,
            totalSkills
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

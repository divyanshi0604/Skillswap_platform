const User = require('../models/User');
const Skill = require('../models/Skill');

// Helper to identify user without JWT
// The frontend will pass the user email via a custom header 'user-email'
const getUserFromHeader = async (req) => {
    const email = req.headers['user-email'];
    if (!email) {
        throw new Error('Unauthorized: user-email header is missing');
    }
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('User not found');
    }
    return user;
};

// GET /api/users/me -> Return the current user's profile.
exports.getUserProfile = async (req, res) => {
    try {
        const user = await getUserFromHeader(req);
        // Exclude password
        user.password = undefined;
        res.status(200).json(user);
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

// GET /api/users/:userId -> Return a user's public profile.
exports.getPublicProfile = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId).select('-password -email');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ message: 'Invalid user ID or user not found' });
    }
};

// PUT /api/users/update -> Update profile details such as name, bio, location.
exports.updateUserProfile = async (req, res) => {
    try {
        const user = await getUserFromHeader(req);
        const { name, bio, location, phone } = req.body;

        if (name !== undefined) user.name = name;
        if (bio !== undefined) user.bio = bio;
        if (location !== undefined) user.location = location;
        if (phone !== undefined) user.phone = phone;

        await user.save();
        user.password = undefined;
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// PUT /api/users/add-skill-offered -> Add a skill the user can teach.
exports.addSkillOffered = async (req, res) => {
    try {
        const user = await getUserFromHeader(req);
        const { skill, level, category } = req.body;

        if (!skill) return res.status(400).json({ message: 'Skill name is required' });

        // Check if skill already exists by name
        const exists = user.skillsOffered.some(s => s.name === skill);
        if (!exists) {
            user.skillsOffered.push({ name: skill, level: level || 'Beginner', category: category || 'General' });
            await user.save();

            // Sync to the Skill collection so it appears in the Marketplace
            await Skill.findOneAndUpdate(
                { userId: user._id, title: skill },
                { title: skill, level: level || 'Beginner', category: category || 'General', description: '', userId: user._id },
                { upsert: true, new: true }
            );
        }

        user.password = undefined;
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// PUT /api/users/add-skill-wanted -> Add a skill the user wants to learn.
exports.addSkillWanted = async (req, res) => {
    try {
        const user = await getUserFromHeader(req);
        const { skill, level, category } = req.body;

        if (!skill) return res.status(400).json({ message: 'Skill name is required' });

        // Check if skill already exists by name
        const exists = user.skillsWanted.some(s => s.name === skill);
        if (!exists) {
            user.skillsWanted.push({ name: skill, level: level || 'Beginner', category: category || 'General' });
            await user.save();
        }

        user.password = undefined;
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// DELETE /api/users/remove-skill/:skillName -> Remove a skill from the profile.
exports.removeSkill = async (req, res) => {
    try {
        const user = await getUserFromHeader(req);
        const { skillName } = req.params;

        // Remove from both arrays by matching the name field
        user.skillsOffered = user.skillsOffered.filter(s => s.name !== skillName);
        user.skillsWanted = user.skillsWanted.filter(s => s.name !== skillName);

        await user.save();

        // Remove from the Skill collection so it no longer appears in the Marketplace
        await Skill.deleteMany({ userId: user._id, title: skillName });

        user.password = undefined;
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

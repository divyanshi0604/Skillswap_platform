const Request = require('../models/Request');
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

// POST /api/requests — Send a skill request
exports.createRequest = async (req, res) => {
    try {
        const sender = await getUserFromHeader(req);
        const { skillId, offeredSkill } = req.body;

        if (!skillId) return res.status(400).json({ message: 'Skill ID is required' });
        if (!offeredSkill?.name) return res.status(400).json({ message: 'offeredSkill with a name is required' });

        // Find the skill and its owner
        const skill = await Skill.findById(skillId);
        if (!skill) return res.status(404).json({ message: 'Skill not found' });

        // Prevent requesting own skill
        if (skill.userId.toString() === sender._id.toString()) {
            return res.status(400).json({ message: 'You cannot request your own skill' });
        }

        // Check for duplicate request
        const existingRequest = await Request.findOne({
            senderId: sender._id,
            skillId: skill._id
        });
        if (existingRequest) {
            return res.status(400).json({ message: 'You have already requested this skill' });
        }

        const request = await Request.create({
            senderId: sender._id,
            receiverId: skill.userId,
            skillId: skill._id,
            offeredSkill: {
                name: offeredSkill.name,
                level: offeredSkill.level || 'Beginner'
            }
        });

        res.status(201).json(request);
    } catch (error) {
        // Handle unique index violation
        if (error.code === 11000) {
            return res.status(400).json({ message: 'You have already requested this skill' });
        }
        res.status(400).json({ message: error.message });
    }
};

// GET /api/requests — Get requests involving the current user
exports.getRequests = async (req, res) => {
    try {
        const user = await getUserFromHeader(req);

        const requests = await Request.find({
            $or: [{ senderId: user._id }, { receiverId: user._id }]
        })
            .populate('senderId', 'name email phone location')
            .populate('receiverId', 'name email phone location')
            .populate('skillId', 'title level category')
            .sort({ createdAt: -1 });

        // Privacy: strip contact info from non-accepted requests
        const sanitize = (request) => {
            const r = request.toObject();
            if (r.status !== 'accepted') {
                if (r.senderId) { delete r.senderId.email; delete r.senderId.phone; }
                if (r.receiverId) { delete r.receiverId.email; delete r.receiverId.phone; }
            }
            return r;
        };

        const incomingRequests = requests
            .filter((request) => request.receiverId && request.receiverId._id.toString() === user._id.toString())
            .map(sanitize);
        const outgoingRequests = requests
            .filter((request) => request.senderId && request.senderId._id.toString() === user._id.toString())
            .map(sanitize);

        res.status(200).json({ incomingRequests, outgoingRequests });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// PUT /api/requests/:id — Update request status (accept/reject)
exports.updateRequest = async (req, res) => {
    try {
        const user = await getUserFromHeader(req);
        const { id } = req.params;
        const { status } = req.body;

        if (!['accepted', 'rejected'].includes(status)) {
            return res.status(400).json({ message: 'Status must be accepted or rejected' });
        }

        const request = await Request.findById(id);
        if (!request) return res.status(404).json({ message: 'Request not found' });

        // Only the receiver can accept/reject
        if (request.receiverId.toString() !== user._id.toString()) {
            return res.status(403).json({ message: 'Only the skill owner can update the request status' });
        }

        if (request.status !== 'pending') {
            return res.status(400).json({ message: 'Request status has already been finalized' });
        }

        request.status = status;
        await request.save();

        res.status(200).json(request);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

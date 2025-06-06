
const userService = require('../services/UserService')

const followService = require('../services/UserFollowService');

const jwt = require('../utils/jwtHelper')

exports.register = async (req, res) => {
    try {
        const user = await userService.createUser(req.body);
        res.status(201).json({ message: 'user created', user: { "id": user.id, "name": user.name, "email": user.email } })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}


exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userService.getUserByEmail(email);
        if (!user || !(await user.validPassword(password))) {
            return res.status(401).json({ error: 'Invalid username/password' });
        }

        const token = jwt.generateToken({ id: user.id, role: user.role })

        res.json({ token })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
};


exports.getAllUsers = async (req, res) => {
    const users = await userService.getAllUsers();
    res.json(users)
};

exports.getUserById = async (req, res) => {
    const user = await userService.getUserById(req.params.id)
    res.json(user)
};

exports.updateUserById = async (req, res) => {
    await userService.updateUserById(req.params.id, req.body)
    res.json({ message: 'updated successfully' })
};

exports.deleteUserById = async (req, res) => {
    await userService.deleteUserById(req.params.id)
    res.json({ message: 'deleted user successfully' })
};

exports.followUser = async (req, res) => {
    try {
        const message = await followService.followUser(req.user.id, parseInt(req.params.id));
        res.json({ message });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.getFollowers = async (req, res) => {
    try {
        const followers = await followService.getFollowers(req.params.id);
        res.json(followers);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

exports.getFollowing = async (req, res) => {
    try {
        const following = await followService.getFollowing(req.params.id);
        res.json(following);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};
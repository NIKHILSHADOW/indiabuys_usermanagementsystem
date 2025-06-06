
const { User } = require('../models')

exports.followUser = async (followerId, followingId) => {
    if (followerId === followingId) {
        throw new Error("You can't follow yourself")
    }

    const follower = await User.findByPk(followerId);
    const following = await User.findByPk(followingId)

    if (!follower || !following) {
        throw new Error("User not Found")
    }

    await follower.addFollowing(following)

    return "Followed succesfully"
}


exports.getFollowers = async (userId) => {
    const user = await User.findByPk(userId, {
        include: { model: User, as: 'Followers', attributes: ['id', 'name', 'email'] }
    });
    if (!user) throw new Error("User not found");
    return user.Followers;
};

exports.getFollowing = async (userId) => {
    const user = await User.findByPk(userId, {
        include: { model: User, as: 'Following', attributes: ['id', 'name', 'email'] }
    });
    if (!user) throw new Error("User not found");
    return user.Following;
};
const Sequelize = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User')(sequelize, Sequelize.DataTypes)

User.belongsToMany(User, {
    as: 'Followers',
    through: 'UserFollows',
    foreignKey: 'followingId',
    otherKey: 'followerId'
})

User.belongsToMany(User, {
    as: 'Following',
    through: 'UserFollows',
    foreignKey: 'followerId',
    otherKey: 'followingId'
})

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.User = User;

module.exports = db;
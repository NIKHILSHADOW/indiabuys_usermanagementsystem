const { User } = require('../models/')
const bcrypt = require('bcrypt')



exports.createUser = async (userData) => {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    return await User.create({ ...userData, password: hashedPassword });
    // return {}
}


exports.getAllUsers = async () => {
    return await User.findAll({
        attributes: { exclude: ['password'] },
        include: [
            { model: User, as: 'Followers', attributes: ['id', 'name'] },
            { model: User, as: 'Following', attributes: ['id', 'name'] },
        ]
    })
}

exports.getUserById = async (id) => {
    return await User.findByPk(id, {
        attributes: { exclude: ['password'] },
        include: [
            { model: User, as: 'Followers', attributes: ['id', 'name'] },
            { model: User, as: 'Following', attributes: ['id', 'name'] },
        ]
    });
}

exports.getUserByEmail = async (email) => {
    return await User.findOne({ where: { email } })
}

exports.updateUserById = async (id, updates) => {
    if (updates.password) {
        updates.password = await bcrypt.hash(updates.password, 10)
    }

    return await User.update(updates, { where: { id } });
}

exports.deleteUserById = async (id) => {
    return await User.destroy({ where: { id } });
}


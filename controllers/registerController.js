const usersDB = {
    users: require('../model/users.json'),
    setUsers: function (data) { this.users = data }
}
const fsPromises = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
    const { user, pwd } = req.body;
    
    // Validate input
    if (!user || !pwd) {
        return res.status(400).json({ 'message': 'Username and password are required.' });
    }

    try {
        // Check for duplicate usernames
        if (usersDB.users.some(person => person.username === user)) {
            return res.sendStatus(409); // Conflict
        }

        // Create new user with hashed password
        const newUser = {
            username: user,
            roles: { User: 2001 },
            password: await bcrypt.hash(pwd, 10)
        };

        // Update users array and save to file
        usersDB.setUsers([...usersDB.users, newUser]);
        await fsPromises.writeFile(
            path.join(__dirname, '..', 'model', 'users.json'),
            JSON.stringify(usersDB.users)
        );

        res.status(201).json({ 'success': `New user ${user} created!` });
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

module.exports = { handleNewUser };
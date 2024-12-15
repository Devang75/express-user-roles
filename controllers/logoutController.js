const usersDB = {
    users: require('../model/users.json'),
    setUsers: function (data) { this.users = data }
}
const fsPromises = require('fs').promises;
const path = require('path');

const handleLogout = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) {
        return res.sendStatus(204);
    }

    const cookieOptions = { 
        httpOnly: true, 
        sameSite: 'None', 
        secure: true 
    };

    // Find user with matching refresh token
    const foundUser = usersDB.users.find(person => person.refreshToken === cookies.jwt);
    if (!foundUser) {
        res.clearCookie('jwt', cookieOptions);
        return res.sendStatus(204);
    }

    // Update user's refresh token to empty string
    usersDB.setUsers(
        usersDB.users.map(person => 
            person.refreshToken === cookies.jwt 
                ? { ...person, refreshToken: '' }
                : person
        )
    );

    // Save updated users to file
    await fsPromises.writeFile(
        path.join(__dirname, '..', 'model', 'users.json'),
        JSON.stringify(usersDB.users)
    );

    res.clearCookie('jwt', cookieOptions);
    res.sendStatus(204);
}

module.exports = { handleLogout }
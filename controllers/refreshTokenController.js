const usersDB = {
    users: require('../model/users.json'),
    setUsers: function (data) { this.users = data }
}
const jwt = require('jsonwebtoken');
require('dotenv').config();

const handleRefreshToken = async (req, res) => {
    const { jwt: refreshToken } = req.cookies;
    if (!refreshToken) return res.sendStatus(401);

    const foundUser = usersDB.users.find(person => person.refreshToken === refreshToken);
    if (!foundUser) return res.sendStatus(403);

    try {
        const decoded = await jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        
        if (foundUser.username !== decoded.username) {
            return res.sendStatus(403);
        }

        const accessToken = jwt.sign(
            {
                "UserInfo": {
                    "username": decoded.username,
                    "roles": Object.values(foundUser.roles)
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '30s' }
        );

        res.json({ accessToken });
    } catch (err) {
        return res.sendStatus(403);
    }
}

module.exports = { handleRefreshToken }
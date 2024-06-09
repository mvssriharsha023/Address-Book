var jwt = require('jsonwebtoken');
const JWT_SECRET = "Harshaisagood$boy";

const fetchuser = (req, res, next) => {
    // get the user details
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({error: "Please authenticate using correct credentials."});
    }

    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data;

        next();
    } catch (error) {
        res.status(401).send({error: "Please authenticate using correct credentials."});
    }
}

module.exports = fetchuser;
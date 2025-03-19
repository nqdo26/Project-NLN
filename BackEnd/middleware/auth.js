require('dotenv').config();
const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const white_lists = [
        '/',
        '/login',
        '/register',
        '/search',
        '/createAdmin',
        '/users',
        '/account',
        '/level',
        '/category',
        '/getDocument/:id',
        '/getDocuments',
    ];

    if (white_lists.find((item) => '/v1/api' + item === req.originalUrl)) {
        next();
    } else {
        if (req.headers && req.headers.authorization) {
            const token = req.headers.authorization.split(' ')[1];

            //verify
            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                req.user = {
                    fullName: decoded.fullName,
                    email: decoded.email,
                    avatar: decoded.avatar,
                    createdBy: 'hehe',
                };
                console.log(decoded);
                next();
            } catch (error) {
                return res.status(401).json({
                    message: 'Token het han/Hoac khong hop le',
                });
            }
        } else {
            // return exception
            return res.status(401).json({
                message: 'Ban chu truyen Access token o header/Hoac token bi het han',
            });
        }
    }
};

module.exports = auth;

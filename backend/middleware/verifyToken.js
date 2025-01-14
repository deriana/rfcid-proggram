const jwt = require('jsonwebtoken');

// Middleware untuk memverifikasi JWT
const verifyToken = () => {
    return (req, res, next) => {
        // Ambil token dari header Authorization
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1]; // Format: "Bearer <token>"
        
        if (!token) {
            return res.status(401).json({ message: 'Token tidak ditemukan, akses ditolak.' });
        }

        // Verifikasi token
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.status(403).json({ message: 'Token tidak valid.' });
            }
            req.user = user; // Simpan user info ke dalam request
            next(); // Lanjutkan ke middleware berikutnya atau route handler
        });
    };
};

module.exports = verifyToken;

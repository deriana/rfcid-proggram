const adminModel = require('../model/adminModel');
const { successResponse, errorResponse } = require('../providers/response');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Controller untuk mendapatkan semua admin
const getAllAdmin = async (req, res) => {
    try {
        const results = await adminModel.getAllAdmin();
        const response = successResponse({ data: results, message: 'Fetching all admin success' });
        return res.status(200).json(response);
    } catch (error) {
        console.error("Error fetching admin", error);
        const response = errorResponse({message: error.message});
        return res.status(500).json(response)
    }
}

// Controller untuk mendaftar admin baru
const insertAdmin = async (req, res) => {
    const { username, password, email, role } = req.body;
    
    if (!username || !password || !email || !role) {
        return res.status(400).json({ message: "Data tidak lengkap" });
    }

    try {
        const rows = await adminModel.checkAdminExists(username, email);
        if (rows.length > 0) {
            return res.status(400).json({ message: "Email atau Username sudah terdaftar" });
        }
        
        const saltRounds = 10;  
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const results = await adminModel.insertAdmin(username, hashedPassword, email, role);
        const allAdmin = await adminModel.getAllAdmin();
        return res.status(200).json({ message: "Admin Created", admins: allAdmin });
    } catch (error) {
        console.error('error registering admin', error);
        return res.status(500).json({ message: error.message });
    }
};

// Controller untuk login admin
const loginAdmin = async (req, res) => {
    const { usernameOrEmail, password } = req.body;

    if (!usernameOrEmail || !password) {
        return res.status(400).json({ message: "Username/email dan password harus diisi" });
    }

    try {
        // Mencari admin berdasarkan username atau email
        const admin = await adminModel.getAdminByUsernameOrEmail(usernameOrEmail);

        if (admin.length === 0) {
            return res.status(400).json({ message: "Username atau Email tidak ditemukan" });
        }

        // Memverifikasi password yang dimasukkan
        const passwordMatch = await bcrypt.compare(password, admin[0].password_hash);

        if (!passwordMatch) {
            return res.status(400).json({ message: "Password salah" });
        }

        // Membuat token JWT
        const token = jwt.sign(
            { id: admin[0].id, username: admin[0].username, email: admin[0].email, role: admin[0].role },
            process.env.SECRET_KEY,
            { expiresIn: '2h' }  
        );

        // Mengembalikan token dan data admin
        return res.status(200).json({
            message: "Login berhasil",
            token: token,
            admin: {
                username: admin[0].username,
                email: admin[0].email,
                role: admin[0].role
            }
        });
    } catch (error) {
        console.error('Error login:', error);
        return res.status(500).json({ message: "Terjadi kesalahan pada server" });
    }
};

const editAdmin = async (req, res) => {
    const { id } = req.params;
    const { username, email, password, role } = req.body;

    if (!id || !username || !email || !role ) {
        return res.status(400).json({ message: "ID, username, dan email dan role wajib diisi" });
    }

    try {
        let hashedPassword = null;

        if (password) {
            const saltRounds = 10;
            hashedPassword = await bcrypt.hash(password, saltRounds);
        }

        const results = await adminModel.editAdmin(id, username, email, role, hashedPassword);
        return res.status(200).json({ message: "Admin berhasil diperbarui", results });
    } catch (error) {
        console.error("Error editing admin", error);
        return res.status(500).json({ message: "Terjadi kesalahan pada server" });
    }
};

const deleteAdmin = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ message: "ID admin diperlukan" });
    }

    try {
        const results = await adminModel.deleteAdmin(id);
        return res.status(200).json({ message: "Admin berhasil dihapus", results });
    } catch (error) {
        console.error("Error deleting admin", error);
        return res.status(500).json({ message: "Terjadi kesalahan pada server" });
    }
};

const getAdminById = async (req, res) => {
    const { id } = req.params;
    try {
        const results = await adminModel.getAdminById(id);
        const response = successResponse({ data: results, message: 'Fetching admin by id success' });
        return res.status(200).json(response);
    } catch (error) {
        console.error("Error fetching admin", error);
        const response = errorResponse({message: error.message});
        return res.status(500).json(response)
    }
}

module.exports = {
    getAllAdmin,
    insertAdmin,
    loginAdmin,
    editAdmin,
    deleteAdmin,
    getAdminById
    
};
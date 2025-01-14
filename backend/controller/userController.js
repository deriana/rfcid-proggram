const userModel = require('../model/userModel');
const { successResponse, errorResponse } = require('../providers/response');
const upload = require('../middleware/multer'); 

const registerUser = (req, res) => {
    // Proses upload menggunakan multer
    upload(req, res, async (err) => {
      // Jika ada error saat upload file
      if (err) {
        console.error('Error upload image:', err.message);  // Log error upload file
        return res.status(400).json({ message: err.message });
      }
  
      // Mengambil data dari request body
      const { rfid, name, kelamin, mapel, nip } = req.body;
      // Mengecek jika ada file yang diupload dan mengambil nama file
      const image = req.file ? req.file.filename : null; 
  
      // Validasi bahwa data tidak kosong
      if (!rfid || !name || !kelamin || !mapel || !image || !nip) {
        return res.status(400).json({ message: "Data tidak boleh kosong" });
      }
  
      try {
        // Cek apakah RFID sudah terdaftar
        const rows = await userModel.getUserByID(rfid);
        if (rows.length > 0) {
          return res.status(400).json({ message: "RFID sudah terdaftar, coba ID yang lain." });
        }
  
        // Jika RFID belum terdaftar, simpan data pengguna baru
        const result = await userModel.insertUser(rfid, name, kelamin, mapel, image, nip);
        
        // Ambil semua pengguna untuk dikirimkan ke response
        const allUsers = await userModel.getAllUsers();
        
        // Kirimkan respon sukses
        return res.status(200).json({ 
          message: "DONE BOS KU", 
          users: allUsers, 
          userInserted: result 
        });
      } catch (error) {
        console.error('Error registering user:', error); // Log error proses registrasi
        return res.status(500).json({ message: error.message });
      }
    });
  };

const getUsers = async (req, res) => {
    try {
        const results = await userModel.getAllUsers();
        const response = successResponse({ data: results, message: 'Fetching all users success' });
        return res.status(200).json(response);
    } catch (error) {
        console.error('Error fetching users:', error); // Debug log
        const response = errorResponse({ message: error.message });
        return res.status(500).json(response);
    }
};

const getUserByID = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ message: "Id tidak boleh kosong" });
    }

    try {
        const user = await userModel.getUserByID(id);
        if (user.length === 0) {
            return res.status(404).json({ message: "User tidak ditemukan" });
        }

        return res.status(200).json({ message: "User ditemukan", user });
    } catch (error) {
        console.error('Error fetching user:', error);
        return res.status(500).json({ message: error.message });
    }
}

const editUser = (req, res) => {
    const { id } = req.params;
  
    // Proses upload file jika ada
    upload(req, res, async (err) => {
      if (err) {
        console.error('Error upload image:', err.message);
        return res.status(400).json({ message: err.message });
      }
  
      // Ambil data dari request
      const { name, kelamin, mapel } = req.body;
      const image = req.file ? req.file.filename : null;
  
      // Validasi input
      if (!id) {
        return res.status(400).json({ message: "ID tidak boleh kosong" });
      }
      if (!name || !kelamin || !mapel) {
        return res.status(400).json({ message: "Data tidak boleh kosong" });
      }
  
      try {
        // Cek apakah pengguna ada di database
        const user = await userModel.getUserByID(id);
        if (user.length === 0) {
          return res.status(404).json({ message: "User tidak ditemukan" });
        }
  
        // Jika file gambar tidak diupload, gunakan gambar lama
        const imageToUpdate = image || user[0].image;
  
        // Update pengguna di database
        const result = await userModel.editUser(id, name, kelamin, mapel, imageToUpdate);
        return res.status(200).json({ 
          message: "User berhasil diubah", 
          result 
        });
      } catch (error) {
        console.error('Error editing user:', error);
        return res.status(500).json({ message: error.message });
      }
    });
  };
  

const deleteUser = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ message: "Id tidak boleh kosong" });
    }

    try {
        const user = await userModel.getUserByID(id);
        if (user.length === 0) {
            return res.status(404).json({ message: "User tidak ditemukan" });
        }

        const result = await userModel.deleteUser(id);
        return res.status(200).json({ message: "User berhasil dihapus", result });
    } catch (error) {
        console.error('Error deleting user:', error); 
        return res.status(500).json({ message: error.message });
    }
};

module.exports = {
    registerUser,
    getUsers,
    editUser,
    deleteUser,
    getUserByID,
};

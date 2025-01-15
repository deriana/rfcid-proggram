const multer = require('multer');

// Konfigurasi untuk upload file
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Folder tempat menyimpan file sementara
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Nama file unik
    }
});

const upload = multer({ storage: storage });

module.exports = upload;

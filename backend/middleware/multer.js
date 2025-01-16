const multer = require('multer');
const path = require('path');

// Konfigurasi penyimpanan
const storage = multer.diskStorage({
  // Tentukan tujuan penyimpanan file
  destination: (req, file, cb) => {
    // Mengarah ke folder ../assets
    cb(null, path.join(__dirname, '../../frontend/public/images'));
  },
  // Tentukan nama file yang disimpan
  filename: (req, file, cb) => {
    // Membuat nama file berdasarkan parameter 'name' di body
    const filename = `${req.body.name}_guru${path.extname(file.originalname)}`;
    cb(null, filename); 
  }
});

// Filter jenis file yang diperbolehkan (gambar saja)
const fileFilter = (req, file, cb) => {
  const filetypes = /jpg|jpeg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  // Periksa jika format file sesuai dengan jenis file yang diizinkan
  if (mimetype && extname) {
    return cb(null, true); 
  } else {
    // Jika file tidak sesuai format, kirimkan error
    return cb(new Error('Hanya gambar dengan format JPG, JPEG, PNG, dan GIF yang diperbolehkan.'));
  }
};

// Menggunakan multer dengan konfigurasi storage dan filter
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
}).single('image');

module.exports = upload;

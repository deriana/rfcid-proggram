const connectDB = require('../config/db');

const getAllAdmin = async () => {
    const connection = await connectDB();
    const query = "SELECT id, username, email, role FROM admin";
    const [results] = await connection.execute(query);
    await connection.end();
    return results;
}

const insertAdmin = async (username, password_hash, email, role) => {
    const connection = await connectDB();
    const query = "INSERT INTO admin (username, password_hash, email, role) VALUES (?, ?, ?, ?)";
    const [results] = await connection.execute(query, [username, password_hash, email, role]);
    await connection.end();
    return results;
}

const checkAdminExists = async (username, email) => {
    const connection = await connectDB();
    const query = `
      SELECT * FROM admin
      WHERE username = ? OR email = ?
    `;
    const [results] = await connection.execute(query, [username, email]);
    await connection.end();
    return results; 
}

const getAdminByUsernameOrEmail = async (usernameOrEmail) => {
    const connection = await connectDB();
    const query = 'SELECT * FROM admin WHERE username = ? OR email = ?';
    const [rows] = await connection.execute(query, [usernameOrEmail, usernameOrEmail]);
    await connection.end();
    return rows;
};

const editAdmin = async (id, username, email, role, password_hash = null) => {
    const connection = await connectDB();
    let query, params;

    if (password_hash) {
        query = "UPDATE admin SET username = ?, email = ?, role = ?, password_hash = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?";
        params = [username, email, role, password_hash, id];
    } else {
        query = "UPDATE admin SET username = ?, email = ?, role = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?";
        params = [username, email, role, id];
    }

    const [results] = await connection.execute(query, params);
    await connection.end();
    return results;
};

const deleteAdmin = async (id) => {
    const connection = await connectDB();
    const query = "DELETE FROM admin WHERE id = ?";
    const [results] = await connection.execute(query, [id]);
    await connection.end();
    return results;
};

const getAdminById = async (id) => {
    const connection = await connectDB();
    const query = "SELECT * FROM admin WHERE id = ?";
    const [results] = await connection.execute(query, [id]);
    await connection.end();
    return results;
}

module.exports = {
    getAllAdmin,
    insertAdmin,
    checkAdminExists,
    getAdminByUsernameOrEmail,
    editAdmin,
    deleteAdmin,
    getAdminById
};
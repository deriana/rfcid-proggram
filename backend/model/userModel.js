const connectDB = require('../config/db');

const insertUser = async (rfid, name, kelamin, mapel, image) => {
    const connection = await connectDB();

    const query = 'INSERT INTO users (rfid, name, kelamin, mapel, image) VALUES (?, ?, ?, ?, ?)';
    const [result] = await connection.execute(query, [rfid, name, kelamin, mapel, image]);

    await connection.end();
    return result;
};

const getAllUsers = async () => {
    const connection = await connectDB();
    const query = 'SELECT * FROM users';
    const [results] = await connection.execute(query);
    await connection.end();
    return results;
};

const getUserByID = async (id) => {
    const connection = await connectDB();

    const query = 'SELECT * FROM users WHERE id = ?';
    const [rows] = await connection.execute(query, [id]);

    await connection.end();
    return rows;
};

const editUser = async (id, name, kelamin, mapel, image) => {
    const connection = await connectDB();

    const query = `
        UPDATE users 
        SET name = ?, kelamin = ?, mapel = ?, image = ? 
        WHERE id = ?`;
    const [result] = await connection.execute(query, [name, kelamin, mapel, image, id]);

    await connection.end();
    return result;
};

const deleteUser = async (id) => {
    const connection = await connectDB();

    const query = 'DELETE FROM users WHERE id = ?';
    const [result] = await connection.execute(query, [id]);

    await connection.end();
    return result;
};

module.exports = {
    insertUser,
    getAllUsers,
    getUserByID,
    editUser,
    deleteUser,
};
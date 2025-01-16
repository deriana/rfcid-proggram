const testModel = require("../model/testModel");

const getLateScans = async (req, res) => {
    try {
        const laporan = await testModel.getLateScans();

        if (laporan.length == 0) {
            return res.status(404).json({ message: "tidak ada data yang telat"});
        }

        res.json(laporan);
    } catch (error) {
        console.error('Error fetching report by RFID:', error);
        res.status(500).json({ message: 'Terjadi kesalahan dalam mengambil data laporan berdasarkan RFID.' });
    }
} 

const getallReport = async (req, res) => {
    try {
        const laporan = await testModel.getAllReport();

        if (laporan.length == 0) {
            return res.status(404).json({ message: "tidak ada data"});
        }

        res.json(laporan);
    } catch (error) {
        console.error('Error fetching report by RFID:', error);
        res.status(500).json({ message: 'Terjadi kesalahan dalam mengambil data laporan berdasarkan RFID.' });
    }
} 

module.exports = {
    getLateScans,
    getallReport
}
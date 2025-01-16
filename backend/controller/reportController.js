const reportModel = require("../model/reportModel");
const { successResponse, errorResponse } = require("../providers/response");

const getAllReport = async (req, res) => {
  try {
    const laporan = await reportModel.getAllReport();

    if (laporan.length === 0) {
      const response = errorResponse({ message: "Tidak ada data" });
      return res.status(404).json(response);
    }

    const response = successResponse({
      data: laporan,
      message: "Laporan berhasil diambil",
    });
    return res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching all reports:", error); // Debug log
    const response = errorResponse({
      message: "Terjadi kesalahan saat mengambil data laporan.",
    });
    return res.status(500).json(response);
  }
};

const getReportByDateRange = async (req, res) => {
  const { startDate, endDate } = req.query;

  if (!startDate || !endDate) {
    const response = errorResponse({
      message:
        "Harap masukkan parameter ?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD",
    });
    return res.status(400).json(response);
  }

  try {
    const laporan = await reportModel.getScansByDateRange(startDate, endDate);

    if (laporan.length === 0) {
      const response = errorResponse({
        message: `Tidak ada data absensi antara tanggal ${startDate} dan ${endDate}`,
      });
      return res.status(404).json(response);
    }

    const response = successResponse({
      data: laporan,
      message: "Laporan berhasil diambil",
    });
    return res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching report by date range:", error); // Debug log
    const response = errorResponse({
      message: "Terjadi kesalahan saat mengambil data laporan.",
    });
    return res.status(500).json(response);
  }
};

const getLateScansTeacher = async (req, res) => {
  const { startDate, endDate } = req.query;

  if (!startDate || !endDate) {
    const response = errorResponse({
      message:
        "Harap masukkan parameter ?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD",
    });
    return res.status(400).json(response);
  }

  try {
    const laporan = await reportModel.getLateScansTeacher(startDate, endDate);

    if (laporan.length === 0) {
      const response = errorResponse({
        message: `Tidak ada data absensi antara tanggal ${startDate} dan ${endDate}`,
      });
      return res.status(404).json(response);
    }

    const response = successResponse({
      data: laporan,
      message: "Laporan berhasil diambil",
    });
    return res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching report by date range:", error); // Debug log
    const response = errorResponse({
      message: "Terjadi kesalahan saat mengambil data laporan.",
    });
    return res.status(500).json(response);
  }
};

const getScansByTeacherDateRange = async (req, res) => {
  const { id } = req.params;
  const { startDate, endDate } = req.query;

  if (!id || !startDate || !endDate) {
    const response = errorResponse({
      message:
        "Harap masukkan parameter ?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD",
    });
    return res.status(400).json(response);
  }

  try {
    const laporan = await reportModel.getReportByTeacherDateRange(
      id,
      startDate,
      endDate
    );

    if (laporan.length === 0) {
      const response = errorResponse({
        message: `Tidak ada data absensi untuk id ${id} antara tanggal ${startDate} dan ${endDate}`,
      });
      return res.status(404).json(response);
    }

    const response = successResponse({
      data: laporan,
      message: "Laporan berhasil diambil",
    });
    return res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching report by id and date range:", error); // Debug log
    const response = errorResponse({
      message: "Terjadi kesalahan saat mengambil data laporan.",
    });
    return res.status(500).json(response);
  }
};

const getRecapAbsen = async (req, res) => {
  const { startDate, endDate } = req.query;

  // Validasi input
  if (!startDate || !endDate) {
    return res.status(400).json({ message: 'Tanggal mulai dan tanggal akhir harus diisi' });
  }

  try {
    // Mengambil data recap absensi dari model
    const recap = await reportModel.getRecapAbsen(startDate, endDate);

    // Mengembalikan data recap absensi sebagai response
    res.status(200).json({
      message: 'Data recap absensi berhasil ditemukan',
      data: recap,
    });
  } catch (err) {
    console.error('Error fetching recap absensi:', err);
    res.status(500).json({ message: 'Terjadi kesalahan dalam mengambil data recap absensi' });
  }
};

module.exports = {
  getAllReport,
  getReportByDateRange,
  getLateScansTeacher,
  getScansByTeacherDateRange,
  getRecapAbsen
};

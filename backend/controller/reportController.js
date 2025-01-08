const reportModel = require("../model/reportModel");
const { successResponse, errorResponse } = require("../providers/response");

const getAllReport = async (req, res) => {
  try {
    const laporan = await reportModel.getAllReport();

    if (laporan.length === 0) {
      const response = errorResponse({ message: "Tidak ada data" });
      return res.status(404).json(response);
    }

    const response = successResponse({ data: laporan, message: "Laporan berhasil diambil" });
    return res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching all reports:", error); // Debug log
    const response = errorResponse({ message: "Terjadi kesalahan saat mengambil data laporan." });
    return res.status(500).json(response);
  }
};

const getReportByTeacher = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    const response = errorResponse({ message: "id harus diisi." });
    return res.status(400).json(response);
  }

  try {
    const laporan = await reportModel.getScansByTeacher(id);

    if (laporan.length === 0) {
      const response = errorResponse({ message: `Tidak ada data absensi untuk id ${id}` });
      return res.status(404).json(response);
    }

    const response = successResponse({ data: laporan, message: "Laporan berhasil diambil" });
    return res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching report by id:", error); // Debug log
    const response = errorResponse({ message: "Terjadi kesalahan saat mengambil data laporan." });
    return res.status(500).json(response);
  }
};

const getReportByType = async (req, res) => {
  const { option } = req.params;

  if (!option) {
    const response = errorResponse({ message: "Tipe absensi harus diisi." });
    return res.status(400).json(response);
  }

  try {
    const laporan = await reportModel.getReportByType(option);

    if (laporan.length === 0) {
      const response = errorResponse({ message: `Tidak ada absensi dengan tipe ${option}` });
      return res.status(404).json(response);
    }

    const response = successResponse({ data: laporan, message: "Laporan berhasil diambil" });
    return res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching report by type:", error); // Debug log
    const response = errorResponse({ message: "Terjadi kesalahan saat mengambil data laporan." });
    return res.status(500).json(response);
  }
};

const getReportByDateRange = async (req, res) => {
  const { startDate, endDate } = req.query;

  if (!startDate || !endDate) {
    const response = errorResponse({
      message: "Harap masukkan parameter ?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD",
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

    const response = successResponse({ data: laporan, message: "Laporan berhasil diambil" });
    return res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching report by date range:", error); // Debug log
    const response = errorResponse({ message: "Terjadi kesalahan saat mengambil data laporan." });
    return res.status(500).json(response);
  }
};

const getReportByDateRangeAndTimeCondition = async (req, res) => {
  const { startDate, endDate, timeCondition, timeValue } = req.query;

  if (!startDate || !endDate || !timeCondition || !timeValue) {
    const response = errorResponse({
      message: "Harap masukkan parameter ?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD&timeCondition=<condition>&timeValue=HH:MM:SS",
    });
    return res.status(400).json(response);
  }
  
  try {
    const laporan = await reportModel.getReportByDateRangeAndTimeCondition(
      startDate,
      endDate,
      timeCondition,
      timeValue
    );

    if (laporan.length === 0) {
      const response = errorResponse({
        message: `Tidak ada data absensi antara tanggal ${startDate} dan ${endDate} dengan kondisi waktu ${timeCondition} ${timeValue}`,
      });
      return res.status(404).json(response);
    }

    const response = successResponse({ data: laporan, message: "Laporan berhasil diambil" });
    return res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching report by date range and time condition:", error); // Debug log
    const response = errorResponse({ message: "Terjadi kesalahan saat mengambil data laporan." });
    return res.status(500).json(response);
  }
};

const getLateScans = async (req, res) => {
  try {
    const laporan = await reportModel.getLateScans();

    if (laporan.length === 0) {
      const response = errorResponse({ message: "Tidak ada data yang telat" });
      return res.status(404).json(response);
    }

    const response = successResponse({ data: laporan, message: "Laporan berhasil diambil" });
    return res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching late scans:", error); // Debug log
    const response = errorResponse({ message: "Terjadi kesalahan saat mengambil data laporan." });
    return res.status(500).json(response);
  }
};

const getLateScansTeacher = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    const response = errorResponse({ message: "id harus diisi." });
    return res.status(400).json(response);
  }
  try {
    const laporan = await reportModel.getLateScansTeacher(id);

    if (laporan.length === 0) {
      const response = errorResponse({ message: "Tidak ada data yang telat" });
      return res.status(404).json(response);
    }

    const response = successResponse({ data: laporan, message: "Laporan berhasil diambil" });
    return res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching late scans:", error); // Debug log
    const response = errorResponse({ message: "Terjadi kesalahan saat mengambil data laporan." });
    return res.status(500).json(response);
  }
};

const getScansByTeacherDateRange = async (req, res) => {
  const { id } = req.params;
  const { startDate, endDate } = req.query;

  if (!id || !startDate || !endDate) {
    const response = errorResponse({
      message: "Harap masukkan parameter ?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD",
    });
    return res.status(400).json(response);
  }

  try {
    const laporan = await reportModel.getReportByTeacherDateRange(id, startDate, endDate);

    if (laporan.length === 0) {
      const response = errorResponse({
        message: `Tidak ada data absensi untuk id ${id} antara tanggal ${startDate} dan ${endDate}`,
      });
      return res.status(404).json(response);
    }

    const response = successResponse({ data: laporan, message: "Laporan berhasil diambil" });
    return res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching report by id and date range:", error); // Debug log
    const response = errorResponse({ message: "Terjadi kesalahan saat mengambil data laporan." });
    return res.status(500).json(response);
  }
}

const getReportForLateAndAbsentUsers = async (req, res) => {
  try {
    const laporan = await reportModel.getReportForLateAndAbsentUsers();

    if (laporan.length === 0) {
      const response = errorResponse({ message: "Tidak ada data" });
      return res.status(404).json(response);
    }

    const response = successResponse({ data: laporan, message: "Laporan berhasil diambil" });
    return res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching all reports:", error); // Debug log
    const response = errorResponse({ message: "Terjadi kesalahan saat mengambil data laporan." });
    return res.status(500).json(response);
  }
};

module.exports = {
  getAllReport,
  getReportByTeacher,
  getReportByType,
  getReportByDateRange,
  getReportByDateRangeAndTimeCondition,
  getLateScans,
  getLateScansTeacher,
  getScansByTeacherDateRange,
  getReportForLateAndAbsentUsers,
};

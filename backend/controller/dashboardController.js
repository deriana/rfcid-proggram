const { getDashboard, getDashboardHadir,getDashboardFullHadir,getDashboardFullTerlambat } = require("../model/dashboardModel");
const { successResponse, errorResponse } = require("../providers/response");

const getDashboardController = async (req, res) => {
  const { type } = req.body;  // Mengambil 'type' dari request body

  if (!type) {
    return res.status(400).json(errorResponse({ message: "Data tidak ada" })); // Memperbaiki status dan komanya
  }

  try {
    const response = await getDashboard(type);
    
    if (response.length === 0) {
      return res.status(404).json(errorResponse({ message: "Data Kosong" })); // Memperbaiki status dan komanya
    }

    return res.status(200).json(successResponse({ data: response, message: "Fetching successful" }));

  } catch (error) {
    console.error(error);
    return res.status(500).json(errorResponse({ message: "Internal Server Error" }));
  }
};

const getDashboardHadirController = async (req, res) => {
  try {
    const response = await getDashboardHadir();
    
    if (response.length === 0) {
      return res.status(404).json(errorResponse({ message: "Data Kosong" })); // Memperbaiki status dan komanya
    }

    return res.status(200).json(successResponse({ data: response, message: "Fetching successful" }));

  } catch (error) {
    console.error(error);
    return res.status(500).json(errorResponse({ message: "Internal Server Error" }));
  }
}
const getDashboardFullHadirController = async (req, res) => {
  try {
    const response = await getDashboardFullHadir();
    
    if (response.length === 0) {
      return res.status(404).json(errorResponse({ message: "Data Kosong" })); // Memperbaiki status dan komanya
    }

    return res.status(200).json(successResponse({ data: response, message: "Fetching successful" }));

  } catch (error) {
    console.error(error);
    return res.status(500).json(errorResponse({ message: "Internal Server Error" }));
  }
}
const getDashboardFullTerlambatController = async (req, res) => {
  try {
    const response = await getDashboardFullTerlambat();
    
    if (response.length === 0) {
      return res.status(404).json(errorResponse({ message: "Data Kosong" })); // Memperbaiki status dan komanya
    }

    return res.status(200).json(successResponse({ data: response, message: "Fetching successful" }));

  } catch (error) {
    console.error(error);
    return res.status(500).json(errorResponse({ message: "Internal Server Error" }));
  }
}

module.exports = {
  getDashboardController,
  getDashboardHadirController,
  getDashboardFullHadirController,
  getDashboardFullTerlambatController
};

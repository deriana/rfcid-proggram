const e = require("express");
const mobileModel = require("../model/mobileModel");
const { successResponse, errorResponse } = require("../providers/response");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const getAbsent = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "Id tidak boleh kosong" });
  }

  try {
    const result = await mobileModel.getAbsent(id);
    const response = successResponse({
      data: result,
      message: "Fetching absent success",
    });
    return res.status(200).json(response);
  } catch (error) {
    console.error(error);
    const response = errorResponse({ message: "Internal Server Error" });
    return res.status(500).json(response);
  }
};

const getCountByType = async (req, res) => {
  const { id } = req.params;
  const { type } = req.body;
  if (!id) {
    return res.status(400).json({ message: "Id tidak boleh kosong" });
  }
  if (!type) {
    return res.status(400).json({ message: "Type tidak boleh kosong" });
  }
  try {
    const result = await mobileModel.getCountByType(id, type);
    const response = successResponse({
      data: result,
      message: "Fetching count by type success",
    });
    return res.status(200).json(response);
  } catch (error) {
    console.error(error);
    const response = errorResponse({ message: "Internal Server Error" });
    return res.status(500).json(response);
  }
};

const getReportDate = async (req, res) => {
  const { id } = req.params;
  const { startDate, endDate } = req.query;

  if (!id) {
    return res.status(400).json({ message: "Id tidak boleh kosong" });
  }

  if (!startDate || !endDate) {
    return res.status(400).json({
      message:
        "Harap masukkan parameter ?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD",
    });
  }
  try {
    const result = await mobileModel.getReportDate(id, startDate, endDate);
    const response = successResponse({
      data: result,
      message: "Fetching report date success",
    });
    return res.status(200).json(response);
  } catch (error) {
    console.error(error);
    const response = errorResponse({ message: "Internal Server Error" });
    return res.status(500).json(response);
  }
};

const getReportCount = async (req, res) => {
  const { id } = req.params;
  const { startDate, endDate } = req.query;

  if (!id) {
    return res.status(400).json({ message: "Id tidak boleh kosong" });
  }

  if (!startDate || !endDate) {
    return res.status(400).json({
      message:
        "Harap masukkan parameter ?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD",
    });
  }
  try {
    const result = await mobileModel.getReportCount(id, startDate, endDate);
    const response = successResponse({
      data: result,
      message: "Fetching report count success",
    });
    return res.status(200).json(response);
  } catch (error) {
    console.error(error);
    const response = errorResponse({ message: "Internal Server Error" });
    return res.status(500).json(response);
  }
};

module.exports = {
  getAbsent,
  getCountByType,
  getReportDate,
  getReportCount,
};

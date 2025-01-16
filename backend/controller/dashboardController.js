const dashboardModel = require("../model/dashboardModel");
const { successResponse, errorResponse } = require("../providers/response");

const totalTeachersPresentToday = async (req, res) => {
  try {
    const results = await dashboardModel.totalTeachersPresentToday();

    if (!results || results.total_teachers_present === 0) {
      return res.status(404).json({ message: "No teachers present today." });
    }

    const response = successResponse({
      data: results,
      message: "Successfully fetched teachers' attendance for today.",
    });
    return res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching teachers' attendance", error);
    const response = errorResponse({ message: error.message });
    return res.status(500).json(response);
  }
};

const totalTeachersAbsentToday = async (req, res) => {
  try {
    const results = await dashboardModel.totalTeachersAbsentToday();

    if (!results || results.total_teachers_absent === 0) {
      return res
        .status(404)
        .json({ message: "All teachers are present today." });
    }

    const response = successResponse({
      data: results,
      message: "Successfully fetched absent teachers' data for today.",
    });
    return res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching teachers' absences", error);
    const response = errorResponse({ message: error.message });
    return res.status(500).json(response);
  }
};

const totalTeachersOnSickLeaveToday = async (req, res) => {
  try {
    const results = await dashboardModel.totalTeachersOnSickLeaveToday();

    if (!results || results.total_teachers_sick_leave === 0) {
      return res
        .status(404)
        .json({ message: "No teachers on sick leave today." });
    }

    const response = successResponse({
      data: results,
      message: "Successfully fetched teachers on sick leave for today.",
    });
    return res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching teachers' sick leave", error);
    const response = errorResponse({ message: error.message });
    return res.status(500).json(response);
  }
};

const teachersPresentPerMonth = async (req, res) => {
  try {
    const results = await dashboardModel.teachersPresentPerMonth();

    if (!results || results.length === 0) {
      return res
        .status(404)
        .json({ message: "No data available for monthly attendance." });
    }

    const response = successResponse({
      data: results,
      message: "Successfully fetched teachers' monthly attendance data.",
    });
    return res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching monthly teachers' attendance", error);
    const response = errorResponse({ message: error.message });
    return res.status(500).json(response);
  }
};

const totalTeachersArrivedLateToday = async (req, res) => {
  try {
    const results = await dashboardModel.totalTeachersArrivedLateToday();

    if (!results || results.total_teachers_late === 0) {
      return res
        .status(404)
        .json({ message: "No teachers arrived late today." });
    }

    const response = successResponse({
      data: results,
      message: "Successfully fetched late teachers' data for today.",
    });
    return res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching late teachers' attendance", error);
    const response = errorResponse({ message: error.message });
    return res.status(500).json(response);
  }
};

const totalAttendancePerTeacherLast30Days = async (req, res) => {
  try {
    const results = await dashboardModel.totalAttendancePerTeacherLast30Days();

    if (!results || results.length === 0) {
      return res
        .status(404)
        .json({ message: "No attendance data for the last 30 days." });
    }

    const response = successResponse({
      data: results,
      message:
        "Successfully fetched attendance per teacher for the last 30 days.",
    });
    return res.status(200).json(response);
  } catch (error) {
    console.error(
      "Error fetching teachers' attendance for the last 30 days",
      error
    );
    const response = errorResponse({ message: error.message });
    return res.status(500).json(response);
  }
};

const teachersAbsentLast30Days = async (req, res) => {
  try {
    const results = await dashboardModel.teachersAbsentLast30Days();

    if (!results || results.length === 0) {
      return res
        .status(404)
        .json({ message: "No teachers were absent in the last 30 days." });
    }

    const response = successResponse({
      data: results,
      message:
        "Successfully fetched teachers who were absent in the last 30 days.",
    });
    return res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching absent teachers for the last 30 days", error);
    const response = errorResponse({ message: error.message });
    return res.status(500).json(response);
  }
};

const teachersPresentPerWeek = async (req, res) => {
  try {
    const results = await dashboardModel.teachersPresentPerWeek();

    if (!results || results.length === 0) {
      return res
        .status(404)
        .json({ message: "No data available for weekly attendance." });
    }

    const response = successResponse({
      data: results,
      message: "Successfully fetched teachers' weekly attendance data.",
    });
    return res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching weekly teachers' attendance", error);
    const response = errorResponse({ message: error.message });
    return res.status(500).json(response);
  }
};

const averageMonthlyAttendance = async (req, res) => {
  try {
    const results = await dashboardModel.averageMonthlyAttendance();

    if (!results || results.average_monthly_attendance === null) {
      return res
        .status(404)
        .json({ message: "No data available for average monthly attendance." });
    }

    const response = successResponse({
      data: results,
      message:
        "Successfully fetched average teachers' monthly attendance data.",
    });
    return res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching average monthly attendance", error);
    const response = errorResponse({ message: error.message });
    return res.status(500).json(response);
  }
};

module.exports = {
  averageMonthlyAttendance,
  teachersAbsentLast30Days,
  teachersPresentPerMonth,
  teachersPresentPerWeek,
  totalAttendancePerTeacherLast30Days,
  totalTeachersAbsentToday,
  totalTeachersArrivedLateToday,
  totalTeachersOnSickLeaveToday,
  totalTeachersPresentToday,
};

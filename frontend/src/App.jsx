import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./component/middleware/protectedRoute";

import Login from "./component/Login";
import Dashboard from "./component/Dashboard";
import Report from "./component/Report";
import Users from "./component/Users";
import Admin from "./component/Admin";
import NotFound from "./component/404";

import "./App.css";
import LoginRfcid from "./component/LoginRfcid";
import EditUsers from "./component/EditUsers";
import EditAdmin from "./component/EditAdmin";
import Logout from "./component/Logout";
import RegisterUsers from "./component/RegisterUsers"
import UsersAbsent from "./component/UsersAbsent";
import ReportDate from "./component/Reportdate";
import RecapReport from "./component/RecapReport";
import ReportLate from "./component/ReportLate";
import ReportTeacher from "./component/ReportTeacher";
import RegisterAdmin from "./component/AdminRegister";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Rute terbuka */}
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/" element={<LoginRfcid />} />
        <Route path="*" element={<NotFound />} />

        {/* Rute yang dilindungi */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/absent-users"
          element={
            <ProtectedRoute>
              <UsersAbsent />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/register"
          element={
            <ProtectedRoute>
              <RegisterAdmin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <Users />
            </ProtectedRoute>
          }
        />
        <Route
          path="/register"
          element={
            <ProtectedRoute>
              <RegisterUsers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/report"
          element={
            <ProtectedRoute>
              <Report />
            </ProtectedRoute>
          }
        />
        <Route
          path="/report-recap"
          element={
            <ProtectedRoute>
              <RecapReport />
            </ProtectedRoute>
          }
        />
        <Route
          path="/report-late"
          element={
            <ProtectedRoute>
              <ReportLate />
            </ProtectedRoute>
          }
        />
        <Route
          path="/report-date"
          element={
            <ProtectedRoute>
              <ReportDate />
            </ProtectedRoute>
          }
        />
        <Route
          path="/report-teacher"
          element={
            <ProtectedRoute>
              <ReportTeacher />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users/edit/:id"
          element={
            <ProtectedRoute>
              <EditUsers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/edit/:id"
          element={
            <ProtectedRoute>
              <EditAdmin />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;

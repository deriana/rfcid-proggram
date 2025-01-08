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

const App = () => {
  return (
    <Router>
      <Routes>

        <Route path="/logout" element={<Logout />} />

        <Route path="*" element={<NotFound />} />
        
        <Route path="/" element={<Dashboard />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <Users />
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
        <Route path="/rfcid-scans" element={<LoginRfcid />} />
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

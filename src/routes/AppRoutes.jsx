
import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { useAuth } from "../context/AuthContext";

/* =====================================================
   AUTHENTICATION
===================================================== */

import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";

/* =====================================================
   DASHBOARDS
===================================================== */

import Dashboard from "../pages/Dashboard/Dashboard";
import PatientDashboard from "../pages/PatientDashboard/PatientDashboard";
import DoctorDashboard from "../pages/DoctorDashboard/DoctorDashboard";
import AdminDashboard from "../pages/AdminDashboard/AdminDashboard";
import LaboratoryDashboard from "../pages/LaboratoryDashboard/LaboratoryDashboard";

/* =====================================================
   MANAGEMENT
===================================================== */

import Patients from "../pages/Patients/Patients";
import Doctors from "../pages/Doctors/Doctors";
import Appointments from "../pages/Appointments/Appointments";
import MedicalRecords from "../pages/MedicalRecords/MedicalRecords";
import Prescriptions from "../pages/Prescriptions/Prescriptions";
import LaboratoryReports from "../pages/LaboratoryReports/LaboratoryReports";
import Notifications from "../pages/Notifications/Notifications";
import AIAnalysis from "../pages/AIAnalysis/AIAnalysis";
import Reports from "../pages/Reports/Reports";
import Profile from "../pages/Profile/Profile";


/* =====================================================
   PROTECTED ROUTE
===================================================== */

/*
  Protects routes from users who are not logged in.

  If the user is not logged in:
      -> Redirect to Login

  If the user is logged in:
      -> Allow access
*/

function ProtectedRoute({ children }) {

  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
}


/* =====================================================
   ROLE PROTECTED ROUTE
===================================================== */

/*
  Allows access only to specific roles.

  Example:

  <RoleRoute allowedRoles={["Patient"]}>
      <PatientDashboard />
  </RoleRoute>

*/

function RoleRoute({
  allowedRoles,
  children,
}) {

  const { user } = useAuth();

  /* USER NOT LOGGED IN */

  if (!user) {
    return <Navigate to="/" replace />;
  }


  /* USER ROLE NOT ALLOWED */

  if (
    !allowedRoles.includes(user.role)
  ) {

    return (
      <Navigate
        to="/dashboard"
        replace
      />
    );

  }


  return children;
}


/* =====================================================
   APP ROUTES
===================================================== */

function AppRoutes() {

  return (

    <BrowserRouter>

      <Routes>


        {/* =================================================
            AUTHENTICATION ROUTES
        ================================================= */}

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />


        {/* =================================================
            GENERAL DASHBOARD
        ================================================= */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />


        {/* =================================================
            PATIENT DASHBOARD
        ================================================= */}

        <Route
          path="/patient-dashboard"
          element={
            <RoleRoute
              allowedRoles={[
                "Patient",
              ]}
            >
              <PatientDashboard />
            </RoleRoute>
          }
        />


        {/* =================================================
            DOCTOR DASHBOARD
        ================================================= */}

        <Route
          path="/doctor-dashboard"
          element={
            <RoleRoute
              allowedRoles={[
                "Doctor",
              ]}
            >
              <DoctorDashboard />
            </RoleRoute>
          }
        />


        {/* =================================================
            ADMIN DASHBOARD
        ================================================= */}

        <Route
          path="/admin-dashboard"
          element={
            <RoleRoute
              allowedRoles={[
                "Hospital Administrator",
              ]}
            >
              <AdminDashboard />
            </RoleRoute>
          }
        />


        {/* =================================================
            LABORATORY DASHBOARD
        ================================================= */}

        <Route
          path="/lab-dashboard"
          element={
            <RoleRoute
              allowedRoles={[
                "Laboratory Staff",
              ]}
            >
              <LaboratoryDashboard />
            </RoleRoute>
          }
        />


        {/* =================================================
            PATIENTS
        ================================================= */}

        <Route
          path="/patients"
          element={
            <ProtectedRoute>
              <Patients />
            </ProtectedRoute>
          }
        />


        {/* =================================================
            DOCTORS
        ================================================= */}

        <Route
          path="/doctors"
          element={
            <ProtectedRoute>
              <Doctors />
            </ProtectedRoute>
          }
        />


        {/* =================================================
            APPOINTMENTS
        ================================================= */}

        <Route
          path="/appointments"
          element={
            <ProtectedRoute>
              <Appointments />
            </ProtectedRoute>
          }
        />


        {/* =================================================
            MEDICAL RECORDS
        ================================================= */}

        <Route
          path="/medical-records"
          element={
            <ProtectedRoute>
              <MedicalRecords />
            </ProtectedRoute>
          }
        />


        {/* =================================================
            PRESCRIPTIONS
        ================================================= */}

        <Route
          path="/prescriptions"
          element={
            <ProtectedRoute>
              <Prescriptions />
            </ProtectedRoute>
          }
        />


        {/* =================================================
            LABORATORY REPORTS
        ================================================= */}

        <Route
          path="/laboratory-reports"
          element={
            <ProtectedRoute>
              <LaboratoryReports />
            </ProtectedRoute>
          }
        />


        {/* =================================================
            NOTIFICATIONS
        ================================================= */}

        <Route
          path="/notifications"
          element={
            <ProtectedRoute>
              <Notifications />
            </ProtectedRoute>
          }
        />


        {/* =================================================
            AI ANALYSIS
        ================================================= */}

        <Route
          path="/ai-analysis"
          element={
            <ProtectedRoute>
              <AIAnalysis />
            </ProtectedRoute>
          }
        />


        {/* =================================================
            REPORTS
        ================================================= */}

        <Route
          path="/reports"
          element={
            <ProtectedRoute>
              <Reports />
            </ProtectedRoute>
          }
        />


        {/* =================================================
            PROFILE
        ================================================= */}

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />


        {/* =================================================
            FALLBACK
        ================================================= */}

        <Route
          path="*"
          element={
            <Navigate
              to="/"
              replace
            />
          }
        />

      </Routes>

    </BrowserRouter>

  );
}

export default AppRoutes;

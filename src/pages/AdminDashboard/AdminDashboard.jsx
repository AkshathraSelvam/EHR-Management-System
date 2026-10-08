
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./AdminDashboard.css";

function AdminDashboard() {

  const navigate = useNavigate();

  const { user } = useAuth();


  /* =====================================================
     ROLE
  ===================================================== */

  const isAdmin =
    user?.role ===
    "Hospital Administrator";


  /* =====================================================
     ACCESS CONTROL
  ===================================================== */

  if (!isAdmin) {

    return (

      <div className="admin-dashboard">

        <div className="admin-dashboard-header">

          <div>

            <h1>
              Access Denied
            </h1>

            <p>
              Only Hospital Administrators can access this dashboard.
            </p>

          </div>

          <button
            className="admin-profile-btn"
            onClick={() =>
              navigate("/dashboard")
            }
          >
            Go to Dashboard
          </button>

        </div>

      </div>

    );

  }


  /* =====================================================
     GET PATIENT DATA
  ===================================================== */

  let patients = [];

  const savedPatients =
    localStorage.getItem(
      "ehrPatients"
    );

  if (savedPatients) {

    try {

      patients =
        JSON.parse(
          savedPatients
        );

    } catch (error) {

      patients = [];

    }

  }


  /* =====================================================
     GET DOCTOR DATA
  ===================================================== */

  let doctors = [];

  const savedDoctors =
    localStorage.getItem(
      "ehrDoctors"
    );

  if (savedDoctors) {

    try {

      doctors =
        JSON.parse(
          savedDoctors
        );

    } catch (error) {

      doctors = [];

    }

  }


  /* =====================================================
     GET LAB REPORT DATA
  ===================================================== */

  let laboratoryReports = [];

  const savedLabReports =
    localStorage.getItem(
      "ehrLaboratoryReports"
    );

  if (savedLabReports) {

    try {

      laboratoryReports =
        JSON.parse(
          savedLabReports
        );

    } catch (error) {

      laboratoryReports = [];

    }

  }


  /* =====================================================
     GET APPOINTMENT DATA
  ===================================================== */

  let appointments = [];

  const savedAppointments =
    localStorage.getItem(
      "ehrAppointments"
    );

  if (savedAppointments) {

    try {

      appointments =
        JSON.parse(
          savedAppointments
        );

    } catch (error) {

      appointments = [];

    }

  }


  /* =====================================================
     GET MEDICAL RECORD DATA
  ===================================================== */

  let medicalRecords = [];

  const savedMedicalRecords =
    localStorage.getItem(
      "ehrMedicalRecords"
    );

  if (savedMedicalRecords) {

    try {

      medicalRecords =
        JSON.parse(
          savedMedicalRecords
        );

    } catch (error) {

      medicalRecords = [];

    }

  }


  /* =====================================================
     COUNTS
  ===================================================== */

  const totalPatients =
    patients.length;


  const totalDoctors =
    doctors.length;


  const totalAppointments =
    appointments.length;


  const totalMedicalRecords =
    medicalRecords.length;


  /* =====================================================
     APPOINTMENT STATUS
  ===================================================== */

  const completedAppointments =
    appointments.filter(
      (appointment) =>
        appointment.status ===
        "Completed"
    ).length;


  const pendingAppointments =
    appointments.filter(
      (appointment) =>
        appointment.status ===
        "Pending"
    ).length;


  const cancelledAppointments =
    appointments.filter(
      (appointment) =>
        appointment.status ===
        "Cancelled"
    ).length;


  /* =====================================================
     PAGE
  ===================================================== */

  return (

    <div className="admin-dashboard">


      {/* =================================================
          HEADER
      ================================================= */}

      <div className="admin-dashboard-header">

        <div>

          <h1>
            Hospital Administrator Dashboard
          </h1>

          <p>
            Manage users, healthcare records and system activities
          </p>

        </div>


        <button
          className="admin-profile-btn"
          onClick={() =>
            navigate("/profile")
          }
        >
          👤 My Profile
        </button>

      </div>


      {/* =================================================
          SUMMARY CARDS
      ================================================= */}

      <div className="admin-summary-grid">


        <div className="admin-summary-card">

          <div className="admin-card-icon">
            👥
          </div>

          <div>

            <h3>
              Total Patients
            </h3>

            <p>
              {totalPatients}
            </p>

            <span>
              Registered patients
            </span>

          </div>

        </div>


        <div className="admin-summary-card">

          <div className="admin-card-icon">
            👨‍⚕️
          </div>

          <div>

            <h3>
              Total Doctors
            </h3>

            <p>
              {totalDoctors}
            </p>

            <span>
              Registered doctors
            </span>

          </div>

        </div>


        <div className="admin-summary-card">

          <div className="admin-card-icon">
            📅
          </div>

          <div>

            <h3>
              Appointments
            </h3>

            <p>
              {totalAppointments}
            </p>

            <span>
              Total appointments
            </span>

          </div>

        </div>


        <div className="admin-summary-card">

          <div className="admin-card-icon">
            📁
          </div>

          <div>

            <h3>
              Medical Records
            </h3>

            <p>
              {totalMedicalRecords}
            </p>

            <span>
              Stored records
            </span>

          </div>

        </div>

      </div>


      {/* =================================================
          MANAGEMENT
      ================================================= */}

      <div className="admin-section">

        <h2>
          Management
        </h2>


        <div className="admin-actions-grid">


          <button
            className="admin-action-card"
            onClick={() =>
              navigate("/patients")
            }
          >

            <span>
              👥
            </span>

            <h3>
              Manage Patients
            </h3>

            <p>
              View, add, edit and manage patient accounts
            </p>

          </button>


          <button
            className="admin-action-card"
            onClick={() =>
              navigate("/doctors")
            }
          >

            <span>
              👨‍⚕️
            </span>

            <h3>
              Manage Doctors
            </h3>

            <p>
              View, add, edit and manage doctor information
            </p>

          </button>


          <button
            className="admin-action-card"
            onClick={() =>
              navigate("/appointments")
            }
          >

            <span>
              📅
            </span>

            <h3>
              Appointments
            </h3>

            <p>
              Monitor hospital appointments
            </p>

          </button>


          <button
            className="admin-action-card"
            onClick={() =>
              navigate("/medical-records")
            }
          >

            <span>
              📁
            </span>

            <h3>
              Medical Records
            </h3>

            <p>
              Monitor healthcare records
            </p>

          </button>


          <button
            className="admin-action-card"
            onClick={() =>
              navigate("/laboratory-reports")
            }
          >

            <span>
              🧪
            </span>

            <h3>
              Laboratory Reports
            </h3>

            <p>
              Monitor and manage laboratory reports
            </p>

          </button>


          <button
            className="admin-action-card"
            onClick={() =>
              navigate("/reports")
            }
          >

            <span>
              📊
            </span>

            <h3>
              System Reports
            </h3>

            <p>
              View hospital reports and analytics
            </p>

          </button>


          <button
            className="admin-action-card"
            onClick={() =>
              navigate("/notifications")
            }
          >

            <span>
              🔔
            </span>

            <h3>
              Notifications
            </h3>

            <p>
              Monitor system notifications
            </p>

          </button>

        </div>

      </div>


      {/* =================================================
          SYSTEM OVERVIEW
      ================================================= */}

      <div className="admin-section">


        <div className="admin-section-title">

          <h2>
            System Overview
          </h2>

          <button
            className="admin-view-all-btn"
            onClick={() =>
              navigate("/reports")
            }
          >
            View Reports
          </button>

        </div>


        <div className="admin-overview-grid">


          <div className="admin-overview-card">

            <h3>
              Completed Appointments
            </h3>

            <strong>
              {completedAppointments}
            </strong>

            <span>
              appointments completed
            </span>

          </div>


          <div className="admin-overview-card">

            <h3>
              Pending Appointments
            </h3>

            <strong>
              {pendingAppointments}
            </strong>

            <span>
              appointments pending
            </span>

          </div>


          <div className="admin-overview-card">

            <h3>
              Cancelled Appointments
            </h3>

            <strong>
              {cancelledAppointments}
            </strong>

            <span>
              appointments cancelled
            </span>

          </div>


        </div>

      </div>


      {/* =================================================
          LABORATORY OVERVIEW
      ================================================= */}

      <div className="admin-section">

        <div className="admin-section-title">

          <h2>
            Laboratory Overview
          </h2>

          <button
            className="admin-view-all-btn"
            onClick={() =>
              navigate(
                "/laboratory-reports"
              )
            }
          >
            View Reports
          </button>

        </div>


        <div className="admin-overview-grid">


          <div className="admin-overview-card">

            <h3>
              Total Laboratory Reports
            </h3>

            <strong>
              {laboratoryReports.length}
            </strong>

            <span>
              laboratory reports
            </span>

          </div>


          <div className="admin-overview-card">

            <h3>
              Completed Laboratory Reports
            </h3>

            <strong>

              {
                laboratoryReports.filter(
                  (report) =>
                    report.status ===
                    "Completed"
                ).length
              }

            </strong>

            <span>
              reports completed
            </span>

          </div>


          <div className="admin-overview-card">

            <h3>
              Pending Laboratory Reports
            </h3>

            <strong>

              {
                laboratoryReports.filter(
                  (report) =>
                    report.status ===
                    "Pending"
                ).length
              }

            </strong>

            <span>
              reports pending
            </span>

          </div>


        </div>

      </div>


      {/* =================================================
          RECENT ACTIVITIES
      ================================================= */}

      <div className="admin-section">


        <div className="admin-section-title">

          <h2>
            Recent System Activities
          </h2>

          <button
            className="admin-view-all-btn"
            onClick={() =>
              navigate("/reports")
            }
          >
            View All
          </button>

        </div>


        <div className="admin-activity-table">


          <div className="admin-activity-row admin-activity-header">

            <span>
              User
            </span>

            <span>
              Activity
            </span>

            <span>
              Date
            </span>

            <span>
              Status
            </span>

          </div>


          <div className="admin-activity-row">

            <span>
              Hospital Administrator
            </span>

            <span>
              System dashboard accessed
            </span>

            <span>
              Today
            </span>

            <span className="activity-success">
              Completed
            </span>

          </div>


          <div className="admin-activity-row">

            <span>
              Laboratory Staff
            </span>

            <span>
              Laboratory reports managed
            </span>

            <span>
              Today
            </span>

            <span className="activity-success">
              Completed
            </span>

          </div>


          <div className="admin-activity-row">

            <span>
              Hospital System
            </span>

            <span>
              Patient records monitored
            </span>

            <span>
              Today
            </span>

            <span className="activity-success">
              Completed
            </span>

          </div>


          <div className="admin-activity-row">

            <span>
              Hospital System
            </span>

            <span>
              Appointment status monitored
            </span>

            <span>
              Today
            </span>

            <span className="activity-pending">
              Active
            </span>

          </div>


        </div>

      </div>


    </div>

  );
}

export default AdminDashboard;

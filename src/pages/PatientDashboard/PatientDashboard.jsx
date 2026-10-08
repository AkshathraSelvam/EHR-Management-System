

import React from "react";
import { useNavigate } from "react-router-dom";
import "./PatientDashboard.css";

function PatientDashboard() {
  const navigate = useNavigate();

  return (
    <div className="patient-dashboard">

      {/* HEADER */}
      <div className="patient-dashboard-header">
        <div>
          <h1>Patient Dashboard</h1>
          <p>Welcome to your Electronic Health Record</p>
        </div>

        <button
          className="patient-profile-btn"
          onClick={() => navigate("/profile")}
        >
          👤 My Profile
        </button>
      </div>

      {/* SUMMARY CARDS */}
      <div className="patient-summary-grid">

        <div className="patient-summary-card">
          <div className="patient-card-icon">📅</div>
          <div>
            <h3>Upcoming Appointment</h3>
            <p>25 Sep 2026</p>
            <span>10:30 AM</span>
          </div>
        </div>

        <div className="patient-summary-card">
          <div className="patient-card-icon">👨‍⚕️</div>
          <div>
            <h3>My Doctors</h3>
            <p>3</p>
            <span>Assigned Doctors</span>
          </div>
        </div>

        <div className="patient-summary-card">
          <div className="patient-card-icon">📁</div>
          <div>
            <h3>Medical Records</h3>
            <p>8</p>
            <span>Available Records</span>
          </div>
        </div>

        <div className="patient-summary-card">
          <div className="patient-card-icon">💊</div>
          <div>
            <h3>Prescriptions</h3>
            <p>4</p>
            <span>Active Prescriptions</span>
          </div>
        </div>

      </div>

      {/* QUICK ACTIONS */}
      <div className="patient-section">

        <h2>Quick Actions</h2>

        <div className="patient-actions-grid">

          <button
            onClick={() => navigate("/appointments")}
            className="patient-action-card"
          >
            <span>📅</span>
            <h3>Book Appointment</h3>
            <p>Schedule an appointment with a doctor</p>
          </button>

          <button
            onClick={() => navigate("/medical-records")}
            className="patient-action-card"
          >
            <span>📁</span>
            <h3>Medical Records</h3>
            <p>View your healthcare records</p>
          </button>

          <button
            onClick={() => navigate("/prescriptions")}
            className="patient-action-card"
          >
            <span>💊</span>
            <h3>Prescriptions</h3>
            <p>View your prescribed medicines</p>
          </button>

          <button
            onClick={() => navigate("/laboratory-reports")}
            className="patient-action-card"
          >
            <span>🧪</span>
            <h3>Laboratory Reports</h3>
            <p>View your laboratory test reports</p>
          </button>

          <button
            onClick={() => navigate("/notifications")}
            className="patient-action-card"
          >
            <span>🔔</span>
            <h3>Notifications</h3>
            <p>Check your latest notifications</p>
          </button>

          <button
            onClick={() => navigate("/profile")}
            className="patient-action-card"
          >
            <span>👤</span>
            <h3>My Profile</h3>
            <p>View and update your personal information</p>
          </button>

        </div>

      </div>

      {/* APPOINTMENT */}
      <div className="patient-section">

        <div className="patient-section-title">
          <h2>Upcoming Appointment</h2>

          <button
            onClick={() => navigate("/appointments")}
            className="view-all-btn"
          >
            View All
          </button>
        </div>

        <div className="patient-appointment-card">

          <div className="appointment-date">
            <strong>25</strong>
            <span>SEP</span>
          </div>

          <div className="appointment-details">
            <h3>Doctor Consultation</h3>
            <p>👨‍⚕️ General Medicine</p>
            <p>🕐 10:30 AM</p>
          </div>

          <div className="appointment-status">
            <span>Scheduled</span>
          </div>

        </div>

      </div>

      {/* RECENT RECORDS */}
      <div className="patient-section">

        <div className="patient-section-title">
          <h2>Recent Medical Records</h2>

          <button
            onClick={() => navigate("/medical-records")}
            className="view-all-btn"
          >
            View All
          </button>
        </div>

        <div className="patient-record-table">

          <div className="record-row record-header">
            <span>Date</span>
            <span>Doctor</span>
            <span>Diagnosis</span>
            <span>Status</span>
          </div>

          <div className="record-row">
            <span>18 Sep 2026</span>
            <span>Dr. Sharma</span>
            <span>General Checkup</span>
            <span className="record-completed">Completed</span>
          </div>

          <div className="record-row">
            <span>10 Sep 2026</span>
            <span>Dr. Kumar</span>
            <span>Blood Pressure</span>
            <span className="record-completed">Completed</span>
          </div>

          <div className="record-row">
            <span>02 Sep 2026</span>
            <span>Dr. Priya</span>
            <span>Routine Consultation</span>
            <span className="record-completed">Completed</span>
          </div>

        </div>

      </div>

    </div>
  );
}

export default PatientDashboard;

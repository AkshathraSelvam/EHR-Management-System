
import React from "react";
import { useNavigate } from "react-router-dom";
import "./DoctorDashboard.css";

function DoctorDashboard() {
  const navigate = useNavigate();

  return (
    <div className="doctor-dashboard">

      {/* HEADER */}
      <div className="doctor-dashboard-header">
        <div>
          <h1>Doctor Dashboard</h1>
          <p>Welcome to the Electronic Health Record System</p>
        </div>

        <button
          className="doctor-profile-btn"
          onClick={() => navigate("/profile")}
        >
          👤 My Profile
        </button>
      </div>

      {/* SUMMARY CARDS */}
      <div className="doctor-summary-grid">

        <div className="doctor-summary-card">
          <div className="doctor-card-icon">📅</div>
          <div>
            <h3>Today's Appointments</h3>
            <p>6</p>
            <span>Appointments today</span>
          </div>
        </div>

        <div className="doctor-summary-card">
          <div className="doctor-card-icon">👥</div>
          <div>
            <h3>My Patients</h3>
            <p>42</p>
            <span>Assigned patients</span>
          </div>
        </div>

        <div className="doctor-summary-card">
          <div className="doctor-card-icon">📁</div>
          <div>
            <h3>Medical Records</h3>
            <p>18</p>
            <span>Recent records</span>
          </div>
        </div>

        <div className="doctor-summary-card">
          <div className="doctor-card-icon">🧪</div>
          <div>
            <h3>Laboratory Reports</h3>
            <p>5</p>
            <span>Pending review</span>
          </div>
        </div>

      </div>

      {/* QUICK ACTIONS */}
      <div className="doctor-section">

        <h2>Quick Actions</h2>

        <div className="doctor-actions-grid">

          <button
            className="doctor-action-card"
            onClick={() => navigate("/patients")}
          >
            <span>👥</span>
            <h3>Search Patients</h3>
            <p>Search and view patient information</p>
          </button>

          <button
            className="doctor-action-card"
            onClick={() => navigate("/medical-records")}
          >
            <span>📁</span>
            <h3>Medical Records</h3>
            <p>View and update patient medical records</p>
          </button>

          <button
            className="doctor-action-card"
            onClick={() => navigate("/prescriptions")}
          >
            <span>💊</span>
            <h3>Prescriptions</h3>
            <p>Create and manage prescriptions</p>
          </button>

          <button
            className="doctor-action-card"
            onClick={() => navigate("/laboratory-reports")}
          >
            <span>🧪</span>
            <h3>Laboratory Reports</h3>
            <p>Review laboratory test reports</p>
          </button>

          <button
            className="doctor-action-card"
            onClick={() => navigate("/ai-analysis")}
          >
            <span>🤖</span>
            <h3>AI Health Summary</h3>
            <p>Review AI-assisted medical report analysis</p>
          </button>

          <button
            className="doctor-action-card"
            onClick={() => navigate("/appointments")}
          >
            <span>📅</span>
            <h3>Appointments</h3>
            <p>View and manage appointment schedules</p>
          </button>

        </div>

      </div>

      {/* TODAY'S APPOINTMENTS */}
      <div className="doctor-section">

        <div className="doctor-section-title">
          <h2>Today's Appointments</h2>

          <button
            className="doctor-view-all-btn"
            onClick={() => navigate("/appointments")}
          >
            View All
          </button>
        </div>

        <div className="doctor-appointment-table">

          <div className="doctor-table-row doctor-table-header">
            <span>Time</span>
            <span>Patient</span>
            <span>Purpose</span>
            <span>Status</span>
          </div>

          <div className="doctor-table-row">
            <span>09:00 AM</span>
            <span>Arun Kumar</span>
            <span>General Checkup</span>
            <span className="doctor-status completed">
              Completed
            </span>
          </div>

          <div className="doctor-table-row">
            <span>10:30 AM</span>
            <span>Priya Sharma</span>
            <span>Follow-up</span>
            <span className="doctor-status scheduled">
              Scheduled
            </span>
          </div>

          <div className="doctor-table-row">
            <span>12:00 PM</span>
            <span>Rahul Raj</span>
            <span>Blood Pressure Review</span>
            <span className="doctor-status scheduled">
              Scheduled
            </span>
          </div>

          <div className="doctor-table-row">
            <span>03:30 PM</span>
            <span>Meena Devi</span>
            <span>Routine Consultation</span>
            <span className="doctor-status pending">
              Pending
            </span>
          </div>

        </div>

      </div>

      {/* PATIENT RECORDS */}
      <div className="doctor-section">

        <div className="doctor-section-title">
          <h2>Recent Patient Records</h2>

          <button
            className="doctor-view-all-btn"
            onClick={() => navigate("/medical-records")}
          >
            View All
          </button>
        </div>

        <div className="doctor-record-list">

          <div className="doctor-record-item">
            <div>
              <strong>Arun Kumar</strong>
              <p>General Checkup</p>
            </div>

            <span>Today</span>
          </div>

          <div className="doctor-record-item">
            <div>
              <strong>Priya Sharma</strong>
              <p>Follow-up Consultation</p>
            </div>

            <span>Yesterday</span>
          </div>

          <div className="doctor-record-item">
            <div>
              <strong>Rahul Raj</strong>
              <p>Blood Pressure Review</p>
            </div>

            <span>2 days ago</span>
          </div>

        </div>

      </div>

    </div>
  );
}

export default DoctorDashboard;

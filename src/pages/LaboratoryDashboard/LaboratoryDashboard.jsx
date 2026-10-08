
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./LaboratoryDashboard.css";

function LaboratoryDashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const currentRole = user?.role || "";

  /* =====================================================
     ACCESS CONTROL
  ===================================================== */

  const isLabStaff =
    currentRole === "Laboratory Staff";

  /*
    This dashboard is intended only for Laboratory Staff.
    AppRoutes should also protect this route.
  */

  if (!isLabStaff) {
    return (
      <div className="laboratory-dashboard">
        <div className="laboratory-dashboard-header">
          <div>
            <h1>Access Denied</h1>

            <p>
              You do not have permission to access the
              Laboratory Staff Dashboard.
            </p>
          </div>

          <button
            className="laboratory-profile-btn"
            onClick={() => navigate("/dashboard")}
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  /* =====================================================
     GET LAB REPORT DATA
  ===================================================== */

  const savedReports =
    localStorage.getItem("ehrLaboratoryReports");

  let reports = [];

  if (savedReports) {
    try {
      reports = JSON.parse(savedReports);
    } catch (error) {
      reports = [];
    }
  }

  /* =====================================================
     CALCULATIONS
  ===================================================== */

  const completedReports =
    reports.filter(
      (report) =>
        report.status === "Completed"
    ).length;

  const pendingReports =
    reports.filter(
      (report) =>
        report.status === "Pending"
    ).length;

  const uniquePatients =
    new Set(
      reports.map(
        (report) => report.patient
      )
    ).size;

  /* =====================================================
     RECENT REPORTS
  ===================================================== */

  const pendingReportList =
    reports
      .filter(
        (report) =>
          report.status === "Pending"
      )
      .slice(0, 4);

  const completedReportList =
    reports
      .filter(
        (report) =>
          report.status === "Completed"
      )
      .slice(0, 3);

  /* =====================================================
     PAGE
  ===================================================== */

  return (
    <div className="laboratory-dashboard">

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="laboratory-dashboard-header">

        <div>

          <h1>
            Laboratory Staff Dashboard
          </h1>

          <p>
            Manage laboratory reports and assigned patients
          </p>

        </div>

        <button
          className="laboratory-profile-btn"
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

      <div className="laboratory-summary-grid">

        <div className="laboratory-summary-card">

          <div className="laboratory-card-icon">
            👥
          </div>

          <div>

            <h3>
              Assigned Patients
            </h3>

            <p>
              {uniquePatients}
            </p>

            <span>
              Patients with laboratory reports
            </span>

          </div>

        </div>


        <div className="laboratory-summary-card">

          <div className="laboratory-card-icon">
            ⏳
          </div>

          <div>

            <h3>
              Pending Reports
            </h3>

            <p>
              {pendingReports}
            </p>

            <span>
              Reports awaiting completion
            </span>

          </div>

        </div>


        <div className="laboratory-summary-card">

          <div className="laboratory-card-icon">
            📄
          </div>

          <div>

            <h3>
              Total Reports
            </h3>

            <p>
              {reports.length}
            </p>

            <span>
              Laboratory reports
            </span>

          </div>

        </div>


        <div className="laboratory-summary-card">

          <div className="laboratory-card-icon">
            ✅
          </div>

          <div>

            <h3>
              Completed Reports
            </h3>

            <p>
              {completedReports}
            </p>

            <span>
              Reports completed
            </span>

          </div>

        </div>

      </div>


      {/* =================================================
          QUICK ACTIONS
      ================================================= */}

      <div className="laboratory-section">

        <h2>
          Quick Actions
        </h2>

        <div className="laboratory-actions-grid">


          <button
            className="laboratory-action-card"
            onClick={() =>
              navigate("/patients")
            }
          >

            <span>
              👥
            </span>

            <h3>
              Assigned Patients
            </h3>

            <p>
              View patients assigned for laboratory tests
            </p>

          </button>


          <button
            className="laboratory-action-card"
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
              Upload and manage laboratory test reports
            </p>

          </button>


          <button
            className="laboratory-action-card"
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
              Check laboratory notifications
            </p>

          </button>


          <button
            className="laboratory-action-card"
            onClick={() =>
              navigate("/profile")
            }
          >

            <span>
              👤
            </span>

            <h3>
              My Profile
            </h3>

            <p>
              View and update your profile information
            </p>

          </button>

        </div>

      </div>


      {/* =================================================
          PENDING REPORTS
      ================================================= */}

      <div className="laboratory-section">

        <div className="laboratory-section-title">

          <h2>
            Pending Laboratory Reports
          </h2>

          <button
            className="laboratory-view-all-btn"
            onClick={() =>
              navigate("/laboratory-reports")
            }
          >
            View All
          </button>

        </div>


        <div className="laboratory-report-table">

          <div className="laboratory-table-row laboratory-table-header">

            <span>
              Patient
            </span>

            <span>
              Test
            </span>

            <span>
              Date
            </span>

            <span>
              Status
            </span>

          </div>


          {pendingReportList.length > 0 ? (

            pendingReportList.map(
              (report) => (

                <div
                  className="laboratory-table-row"
                  key={report.id}
                >

                  <span>
                    {report.patient}
                  </span>

                  <span>
                    {report.testName}
                  </span>

                  <span>
                    {report.reportDate}
                  </span>

                  <span className="laboratory-status pending">
                    Pending
                  </span>

                </div>

              )
            )

          ) : (

            <div className="laboratory-table-row">

              <span>
                No pending reports
              </span>

              <span>
                -
              </span>

              <span>
                -
              </span>

              <span className="laboratory-status completed">
                Completed
              </span>

            </div>

          )}

        </div>

      </div>


      {/* =================================================
          RECENTLY COMPLETED REPORTS
      ================================================= */}

      <div className="laboratory-section">

        <div className="laboratory-section-title">

          <h2>
            Recently Completed Reports
          </h2>

          <button
            className="laboratory-view-all-btn"
            onClick={() =>
              navigate("/laboratory-reports")
            }
          >
            View All
          </button>

        </div>


        <div className="laboratory-completed-list">

          {completedReportList.length > 0 ? (

            completedReportList.map(
              (report) => (

                <div
                  className="laboratory-completed-item"
                  key={report.id}
                >

                  <div>

                    <strong>
                      {report.patient}
                    </strong>

                    <p>
                      {report.testName}
                    </p>

                  </div>

                  <span>
                    {report.reportDate}
                  </span>

                </div>

              )
            )

          ) : (

            <div className="laboratory-completed-item">

              <div>

                <strong>
                  No completed reports
                </strong>

                <p>
                  Completed laboratory reports will appear here.
                </p>

              </div>

            </div>

          )}

        </div>

      </div>

    </div>
  );
}

export default LaboratoryDashboard;

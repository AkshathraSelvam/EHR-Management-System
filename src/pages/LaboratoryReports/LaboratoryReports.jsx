
import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import "./LaboratoryReports.css";

function LaboratoryReports() {

  const { user } = useAuth();

  /* =====================================================
     ROLE
  ===================================================== */

  const currentRole =
    user?.role || "";

  const isPatient =
    currentRole === "Patient";

  const isDoctor =
    currentRole === "Doctor";

  const isAdmin =
    currentRole === "Hospital Administrator";

  const isLabStaff =
    currentRole === "Laboratory Staff";


  /* =====================================================
     PERMISSIONS
  ===================================================== */

  const canUpload =
    isAdmin || isLabStaff;

  const canUpdate =
    isLabStaff;

  const canDelete =
    isAdmin;

  const canDownload =
    isPatient || isDoctor;


  /* =====================================================
     REPORT DATA
  ===================================================== */

  const defaultReports = [

    {
      id: "LAB001",
      patient: "Arun Kumar",
      testName: "Complete Blood Count",
      result: "Normal",
      reportDate: "18 Sep 2026",
      status: "Completed",
    },

    {
      id: "LAB002",
      patient: "Priya Sharma",
      testName: "Blood Sugar",
      result: "High",
      reportDate: "17 Sep 2026",
      status: "Completed",
    },

    {
      id: "LAB003",
      patient: "Rahul Raj",
      testName: "Urine Test",
      result: "Normal",
      reportDate: "17 Sep 2026",
      status: "Completed",
    },

    {
      id: "LAB004",
      patient: "Meena Devi",
      testName: "Cholesterol Test",
      result: "Pending",
      reportDate: "16 Sep 2026",
      status: "Pending",
    },

  ];


  /* =====================================================
     INITIAL REPORTS
  ===================================================== */

  const [reports, setReports] =
    useState(() => {

      const savedReports =
        localStorage.getItem(
          "ehrLaboratoryReports"
        );

      if (savedReports) {

        try {

          return JSON.parse(
            savedReports
          );

        } catch (error) {

          return defaultReports;

        }

      }

      localStorage.setItem(
        "ehrLaboratoryReports",
        JSON.stringify(
          defaultReports
        )
      );

      return defaultReports;

    });


  /* =====================================================
     STATES
  ===================================================== */

  const [searchTerm, setSearchTerm] =
    useState("");

  const [showForm, setShowForm] =
    useState(false);

  const [isEditing, setIsEditing] =
    useState(false);

  const [editingId, setEditingId] =
    useState(null);


  const [formData, setFormData] =
    useState({

      patient: "",
      testName: "",
      result: "",
      reportDate: "",

    });


  /* =====================================================
     SAVE REPORTS
  ===================================================== */

  const saveReports = (
    updatedReports
  ) => {

    setReports(
      updatedReports
    );

    localStorage.setItem(
      "ehrLaboratoryReports",
      JSON.stringify(
        updatedReports
      )
    );

  };


  /* =====================================================
     RESET FORM
  ===================================================== */

  const resetForm = () => {

    setFormData({

      patient: "",
      testName: "",
      result: "",
      reportDate: "",

    });

    setIsEditing(false);

    setEditingId(null);

  };


  /* =====================================================
     INPUT CHANGE
  ===================================================== */

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value,

    });

  };


  /* =====================================================
     OPEN ADD FORM
  ===================================================== */

  const handleAddReport = () => {

    if (!canUpload) {

      alert(
        "You do not have permission to upload laboratory reports."
      );

      return;

    }

    resetForm();

    setShowForm(true);

  };


  /* =====================================================
     OPEN UPDATE FORM
  ===================================================== */

  const handleUpdate = (report) => {

    if (!canUpdate) {

      alert(
        "Only Laboratory Staff can update laboratory reports."
      );

      return;

    }

    setFormData({

      patient:
        report.patient,

      testName:
        report.testName,

      result:
        report.result,

      reportDate:
        report.reportDate,

    });

    setEditingId(
      report.id
    );

    setIsEditing(true);

    setShowForm(true);

  };


  /* =====================================================
     SAVE / UPDATE REPORT
  ===================================================== */

  const handleSubmit = (e) => {

    e.preventDefault();


    /* =================================================
       PERMISSION
    ================================================= */

    if (!canUpload) {

      alert(
        "You do not have permission to upload laboratory reports."
      );

      return;

    }


    /* =================================================
       VALIDATION
    ================================================= */

    if (
      !formData.patient.trim() ||
      !formData.testName.trim() ||
      !formData.result.trim() ||
      !formData.reportDate
    ) {

      alert(
        "Please fill in all laboratory report details."
      );

      return;

    }


    /* =================================================
       UPDATE
    ================================================= */

    if (isEditing) {

      if (!isLabStaff) {

        alert(
          "Only Laboratory Staff can update laboratory reports."
        );

        return;

      }


      const updatedReports =
        reports.map(
          (report) =>
            report.id === editingId
              ? {

                  ...report,

                  patient:
                    formData.patient.trim(),

                  testName:
                    formData.testName.trim(),

                  result:
                    formData.result.trim(),

                  reportDate:
                    formData.reportDate,

                  status:
                    "Completed",

                }
              : report
        );


      saveReports(
        updatedReports
      );


      alert(
        "Laboratory report updated successfully."
      );

    }


    /* =================================================
       ADD
    ================================================= */

    else {

      const nextNumber =
        reports.reduce(
          (
            highest,
            report
          ) => {

            const number =
              parseInt(
                report.id.replace(
                  "LAB",
                  ""
                ),
                10
              ) || 0;

            return Math.max(
              highest,
              number
            );

          },
          0
        ) + 1;


      const newReport = {

        id:
          `LAB${String(
            nextNumber
          ).padStart(3, "0")}`,

        patient:
          formData.patient.trim(),

        testName:
          formData.testName.trim(),

        result:
          formData.result.trim(),

        reportDate:
          formData.reportDate,

        status:
          "Completed",

      };


      const updatedReports = [

        ...reports,

        newReport,

      ];


      saveReports(
        updatedReports
      );


      alert(
        "Laboratory report uploaded successfully."
      );

    }


    resetForm();

    setShowForm(false);

  };


  /* =====================================================
     VIEW
  ===================================================== */

  const handleView = (report) => {

    alert(

      `Laboratory Report\n\n` +

      `Report ID: ${report.id}\n` +

      `Patient: ${report.patient}\n` +

      `Test: ${report.testName}\n` +

      `Result: ${report.result}\n` +

      `Date: ${report.reportDate}\n` +

      `Status: ${report.status}`

    );

  };


  /* =====================================================
     DOWNLOAD
  ===================================================== */

  const handleDownload = (report) => {

    if (!canDownload) {

      alert(
        "Only Patients and Doctors can download laboratory reports."
      );

      return;

    }


    alert(
      `Downloading laboratory report ${report.id}`
    );

  };


  /* =====================================================
     DELETE
  ===================================================== */

  const handleDelete = (
    reportId
  ) => {

    if (!canDelete) {

      alert(
        "Only Hospital Administrators can delete laboratory reports."
      );

      return;

    }


    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this laboratory report?"
      );


    if (!confirmDelete) {

      return;

    }


    const updatedReports =
      reports.filter(
        (report) =>
          report.id !== reportId
      );


    saveReports(
      updatedReports
    );


    alert(
      "Laboratory report deleted successfully."
    );

  };


  /* =====================================================
     SEARCH
  ===================================================== */

  const filteredReports =
    reports.filter(
      (report) => {

        const search =
          searchTerm.toLowerCase();


        return (

          report.patient
            .toLowerCase()
            .includes(search)

          ||

          report.testName
            .toLowerCase()
            .includes(search)

          ||

          report.status
            .toLowerCase()
            .includes(search)

          ||

          report.id
            .toLowerCase()
            .includes(search)

        );

      }
    );


  /* =====================================================
     SUMMARY
  ===================================================== */

  const completedReports =
    reports.filter(
      (report) =>
        report.status ===
        "Completed"
    ).length;


  const pendingReports =
    reports.filter(
      (report) =>
        report.status ===
        "Pending"
    ).length;


  const uniquePatients =
    new Set(
      reports.map(
        (report) =>
          report.patient
      )
    ).size;


  /* =====================================================
     ACCESS DENIED
  ===================================================== */

  if (
    !isPatient &&
    !isDoctor &&
    !isAdmin &&
    !isLabStaff
  ) {

    return (

      <div className="laboratory-reports-page">

        <div className="laboratory-reports-header">

          <div>

            <h1>
              Access Denied
            </h1>

            <p>
              You do not have permission to access laboratory reports.
            </p>

          </div>

        </div>

      </div>

    );

  }


  /* =====================================================
     PAGE
  ===================================================== */

  return (

    <div className="laboratory-reports-page">


      {/* =================================================
          HEADER
      ================================================= */}

      <div className="laboratory-reports-header">

        <div>

          <h1>
            Laboratory Reports
          </h1>

          <p>
            Upload, manage and review patient laboratory reports
          </p>

        </div>


        {canUpload && (

          <button
            className="add-lab-report-btn"
            onClick={
              showForm
                ? () => {

                    setShowForm(false);

                    resetForm();

                  }
                : handleAddReport
            }
          >

            {showForm
              ? "✕ Close Form"
              : "+ Upload Report"}

          </button>

        )}

      </div>


      {/* =================================================
          ACCESS LEVEL
      ================================================= */}

      <div className="lab-report-role-info">

        <strong>
          Access Level:
        </strong>{" "}

        {currentRole}

      </div>


      {/* =================================================
          SUMMARY
      ================================================= */}

      <div className="lab-report-summary-grid">


        <div className="lab-report-summary-card">

          <div className="lab-report-icon">
            🧪
          </div>

          <div>

            <h3>
              Total Reports
            </h3>

            <strong>
              {reports.length}
            </strong>

            <span>
              Laboratory reports
            </span>

          </div>

        </div>


        <div className="lab-report-summary-card">

          <div className="lab-report-icon">
            ✅
          </div>

          <div>

            <h3>
              Completed Reports
            </h3>

            <strong>
              {completedReports}
            </strong>

            <span>
              Reports completed
            </span>

          </div>

        </div>


        <div className="lab-report-summary-card">

          <div className="lab-report-icon">
            ⏳
          </div>

          <div>

            <h3>
              Pending Reports
            </h3>

            <strong>
              {pendingReports}
            </strong>

            <span>
              Awaiting results
            </span>

          </div>

        </div>


        <div className="lab-report-summary-card">

          <div className="lab-report-icon">
            👥
          </div>

          <div>

            <h3>
              Patients
            </h3>

            <strong>
              {uniquePatients}
            </strong>

            <span>
              Patients with reports
            </span>

          </div>

        </div>

      </div>


      {/* =================================================
          FORM
      ================================================= */}

      {showForm &&
        canUpload && (

        <div className="lab-report-form-card">

          <h2>

            {isEditing
              ? "Update Laboratory Report"
              : "Upload Laboratory Report"}

          </h2>


          <form
            onSubmit={
              handleSubmit
            }
          >

            <div className="lab-report-form-grid">


              {/* PATIENT */}

              <div className="lab-report-form-group">

                <label>
                  Patient Name
                </label>

                <input
                  type="text"
                  name="patient"
                  placeholder="Enter patient name"
                  value={
                    formData.patient
                  }
                  onChange={
                    handleChange
                  }
                />

              </div>


              {/* TEST */}

              <div className="lab-report-form-group">

                <label>
                  Test Name
                </label>

                <input
                  type="text"
                  name="testName"
                  placeholder="Enter laboratory test"
                  value={
                    formData.testName
                  }
                  onChange={
                    handleChange
                  }
                />

              </div>


              {/* RESULT */}

              <div className="lab-report-form-group">

                <label>
                  Result
                </label>

                <input
                  type="text"
                  name="result"
                  placeholder="Enter test result"
                  value={
                    formData.result
                  }
                  onChange={
                    handleChange
                  }
                />

              </div>


              {/* DATE */}

              <div className="lab-report-form-group">

                <label>
                  Report Date
                </label>

                <input
                  type="date"
                  name="reportDate"
                  value={
                    formData.reportDate
                  }
                  onChange={
                    handleChange
                  }
                />

              </div>

            </div>


            <div className="lab-report-form-actions">


              <button
                type="button"
                className="cancel-lab-report-btn"
                onClick={() => {

                  setShowForm(
                    false
                  );

                  resetForm();

                }}
              >
                Cancel
              </button>


              <button
                type="submit"
                className="save-lab-report-btn"
              >

                {isEditing
                  ? "Update Report"
                  : "Upload Report"}

              </button>

            </div>

          </form>

        </div>

      )}


      {/* =================================================
          SEARCH
      ================================================= */}

      <div className="lab-report-search-section">

        <input
          type="text"
          placeholder="Search by ID, patient, test or status..."
          value={
            searchTerm
          }
          onChange={(e) =>
            setSearchTerm(
              e.target.value
            )
          }
        />

      </div>


      {/* =================================================
          TABLE
      ================================================= */}

      <div className="lab-report-table-card">


        <div className="lab-report-table-header">

          <h2>
            Laboratory Reports
          </h2>

          <span>
            {filteredReports.length} records
          </span>

        </div>


        <div className="lab-report-table-wrapper">

          <table>

            <thead>

              <tr>

                <th>
                  Report ID
                </th>

                <th>
                  Patient
                </th>

                <th>
                  Test Name
                </th>

                <th>
                  Result
                </th>

                <th>
                  Report Date
                </th>

                <th>
                  Status
                </th>

                <th>
                  Action
                </th>

              </tr>

            </thead>


            <tbody>

              {filteredReports.length >
              0 ? (

                filteredReports.map(
                  (report) => (

                    <tr
                      key={
                        report.id
                      }
                    >

                      <td>
                        {report.id}
                      </td>


                      <td>
                        {report.patient}
                      </td>


                      <td>
                        {report.testName}
                      </td>


                      <td>

                        <span
                          className={

                            report.result ===
                            "High"

                              ? "lab-result-high"

                              : report.result ===
                                "Pending"

                              ? "lab-result-pending"

                              : "lab-result-normal"

                          }
                        >
                          {report.result}
                        </span>

                      </td>


                      <td>
                        {report.reportDate}
                      </td>


                      <td>

                        <span
                          className={

                            `lab-report-status ${
                              report.status ===
                              "Completed"
                                ? "completed"
                                : "pending"
                            }`

                          }
                        >

                          {report.status}

                        </span>

                      </td>


                      <td>

                        <div className="lab-report-action-buttons">


                          {/* VIEW */}

                          <button
                            className="view-lab-report-btn"
                            onClick={() =>
                              handleView(
                                report
                              )
                            }
                          >
                            View
                          </button>


                          {/* DOWNLOAD */}

                          {canDownload && (

                            <button
                              className="download-lab-report-btn"
                              onClick={() =>
                                handleDownload(
                                  report
                                )
                              }
                            >
                              Download
                            </button>

                          )}


                          {/* UPDATE */}

                          {canUpdate && (

                            <button
                              className="update-lab-report-btn"
                              onClick={() =>
                                handleUpdate(
                                  report
                                )
                              }
                            >
                              Update
                            </button>

                          )}


                          {/* DELETE */}

                          {canDelete && (

                            <button
                              className="delete-lab-report-btn"
                              onClick={() =>
                                handleDelete(
                                  report.id
                                )
                              }
                            >
                              Delete
                            </button>

                          )}

                        </div>

                      </td>

                    </tr>

                  )
                )

              ) : (

                <tr>

                  <td
                    colSpan="7"
                    className="no-lab-reports"
                  >
                    No laboratory reports found.
                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>

  );
}

export default LaboratoryReports;

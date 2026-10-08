
import React, { useState } from "react";
import "./MedicalRecords.css";
import { useAuth } from "../../context/AuthContext.jsx";

function MedicalRecords() {
  const { user } = useAuth();

  const currentRole = user?.role || "Hospital Administrator";

  const isPatient = currentRole === "Patient";
  const isDoctor = currentRole === "Doctor";
  const isAdmin = currentRole === "Hospital Administrator";
  const isLabStaff = currentRole === "Laboratory Staff";

  const canAddRecord = isDoctor || isAdmin;
  const canDeleteRecord = isAdmin;

  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);

  const [records, setRecords] = useState([
    {
      id: "REC001",
      patient: "Arun Kumar",
      doctor: "Dr. Sharma",
      diagnosis: "Fever",
      medicalHistory: "No major previous illness",
      fileName: "Arun_Blood_Report.pdf",
      date: "18 Sep 2026",
    },
    {
      id: "REC002",
      patient: "Priya Sharma",
      doctor: "Dr. Kumar",
      diagnosis: "Diabetes",
      medicalHistory: "Type 2 diabetes under monitoring",
      fileName: "Priya_Diabetes_Report.pdf",
      date: "17 Sep 2026",
    },
    {
      id: "REC003",
      patient: "Rahul Raj",
      doctor: "Dr. Wilson",
      diagnosis: "Urinary Infection",
      medicalHistory: "Previous urinary infection",
      fileName: "Rahul_Urine_Report.pdf",
      date: "17 Sep 2026",
    },
    {
      id: "REC004",
      patient: "Meena Devi",
      doctor: "Dr. James",
      diagnosis: "High Cholesterol",
      medicalHistory: "Under regular cholesterol monitoring",
      fileName: "Meena_Cholesterol_Report.pdf",
      date: "16 Sep 2026",
    },
  ]);

  const [formData, setFormData] = useState({
    patient: "",
    doctor: "",
    diagnosis: "",
    medicalHistory: "",
    fileName: "",
    date: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!canAddRecord) {
      alert("You do not have permission to add medical records.");
      return;
    }

    if (
      !formData.patient ||
      !formData.doctor ||
      !formData.diagnosis ||
      !formData.medicalHistory ||
      !formData.fileName ||
      !formData.date
    ) {
      alert("Please fill in all medical record details.");
      return;
    }

    const newRecord = {
      id: `REC00${records.length + 1}`,
      patient: formData.patient,
      doctor: formData.doctor,
      diagnosis: formData.diagnosis,
      medicalHistory: formData.medicalHistory,
      fileName: formData.fileName,
      date: formData.date,
    };

    setRecords([...records, newRecord]);

    setFormData({
      patient: "",
      doctor: "",
      diagnosis: "",
      medicalHistory: "",
      fileName: "",
      date: "",
    });

    setShowForm(false);

    alert("Medical record added successfully.");
  };

  const handleView = (record) => {
    alert(
      `Medical Record\n\n` +
        `Record ID: ${record.id}\n` +
        `Patient: ${record.patient}\n` +
        `Doctor: ${record.doctor}\n` +
        `Diagnosis: ${record.diagnosis}\n` +
        `Medical History: ${record.medicalHistory}\n` +
        `File: ${record.fileName}\n` +
        `Date: ${record.date}`
    );
  };

  const handleDownload = (record) => {
    alert(`Downloading ${record.fileName}`);
  };

  const handleDelete = (id) => {
    if (!canDeleteRecord) {
      alert("You do not have permission to delete medical records.");
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to delete this medical record?"
    );

    if (!confirmed) {
      return;
    }

    setRecords(records.filter((record) => record.id !== id));

    alert("Medical record deleted successfully.");
  };

  const filteredRecords = records.filter(
    (record) =>
      record.patient
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      record.doctor
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      record.diagnosis
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      record.fileName
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="medical-records-page">

      {/* HEADER */}

      <div className="medical-records-header">
        <div>
          <h1>Medical Records</h1>
          <p>
            Securely manage and access patient healthcare records
          </p>
        </div>

        {canAddRecord && (
          <button
            className="add-medical-record-btn"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm
              ? "✕ Close Form"
              : "+ Add Medical Record"}
          </button>
        )}
      </div>


      {/* ROLE INFORMATION */}

      <div className="medical-record-role-info">
        <strong>Access Level:</strong> {currentRole}
      </div>


      {/* SUMMARY */}

      <div className="medical-record-summary-grid">

        <div className="medical-record-summary-card">
          <div className="medical-record-icon">
            📁
          </div>

          <div>
            <h3>Total Records</h3>
            <strong>{records.length}</strong>
            <span>Stored medical records</span>
          </div>
        </div>


        <div className="medical-record-summary-card">
          <div className="medical-record-icon">
            👥
          </div>

          <div>
            <h3>Patients</h3>
            <strong>28</strong>
            <span>Patients with records</span>
          </div>
        </div>


        <div className="medical-record-summary-card">
          <div className="medical-record-icon">
            👨‍⚕️
          </div>

          <div>
            <h3>Doctors</h3>
            <strong>12</strong>
            <span>Doctors managing records</span>
          </div>
        </div>


        <div className="medical-record-summary-card">
          <div className="medical-record-icon">
            ☁️
          </div>

          <div>
            <h3>Cloud Storage</h3>
            <strong>Active</strong>
            <span>Azure storage ready</span>
          </div>
        </div>

      </div>


      {/* ADD RECORD FORM */}

      {showForm && canAddRecord && (
        <div className="medical-record-form-card">

          <h2>Add Medical Record</h2>

          <form onSubmit={handleSubmit}>

            <div className="medical-record-form-grid">

              <div className="medical-record-form-group">
                <label>Patient Name</label>

                <input
                  type="text"
                  name="patient"
                  placeholder="Enter patient name"
                  value={formData.patient}
                  onChange={handleChange}
                />
              </div>


              <div className="medical-record-form-group">
                <label>Doctor Name</label>

                <input
                  type="text"
                  name="doctor"
                  placeholder="Enter doctor name"
                  value={formData.doctor}
                  onChange={handleChange}
                />
              </div>


              <div className="medical-record-form-group">
                <label>Diagnosis</label>

                <input
                  type="text"
                  name="diagnosis"
                  placeholder="Enter diagnosis"
                  value={formData.diagnosis}
                  onChange={handleChange}
                />
              </div>


              <div className="medical-record-form-group">
                <label>Record Date</label>

                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                />
              </div>


              <div className="medical-record-form-group full-width">
                <label>Medical History</label>

                <textarea
                  name="medicalHistory"
                  placeholder="Enter relevant medical history"
                  value={formData.medicalHistory}
                  onChange={handleChange}
                  rows="4"
                />
              </div>


              <div className="medical-record-form-group full-width">
                <label>Medical Record File</label>

                <input
                  type="file"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      fileName:
                        e.target.files[0]?.name || "",
                    })
                  }
                />

                {formData.fileName && (
                  <span className="selected-file-name">
                    Selected: {formData.fileName}
                  </span>
                )}
              </div>

            </div>


            <div className="medical-record-form-actions">

              <button
                type="button"
                className="cancel-medical-record-btn"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="save-medical-record-btn"
              >
                Save Medical Record
              </button>

            </div>

          </form>

        </div>
      )}


      {/* SEARCH */}

      <div className="medical-record-search-section">

        <input
          type="text"
          placeholder="Search by patient, doctor, diagnosis or file..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

      </div>


      {/* TABLE */}

      <div className="medical-record-table-card">

        <div className="medical-record-table-header">

          <h2>Patient Medical Records</h2>

          <span>
            {filteredRecords.length} records
          </span>

        </div>


        <div className="medical-record-table-wrapper">

          <table>

            <thead>

              <tr>
                <th>Record ID</th>
                <th>Patient</th>
                <th>Doctor</th>
                <th>Diagnosis</th>
                <th>Medical History</th>
                <th>File</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>

            </thead>


            <tbody>

              {filteredRecords.length > 0 ? (

                filteredRecords.map((record) => (

                  <tr key={record.id}>

                    <td>{record.id}</td>

                    <td>{record.patient}</td>

                    <td>{record.doctor}</td>

                    <td>{record.diagnosis}</td>

                    <td className="medical-history-cell">
                      {record.medicalHistory}
                    </td>

                    <td>
                      <span className="record-file">
                        📄 {record.fileName}
                      </span>
                    </td>

                    <td>{record.date}</td>

                    <td>

                      <div className="record-action-buttons">

                        {/* VIEW */}

                        <button
                          className="view-record-btn"
                          onClick={() =>
                            handleView(record)
                          }
                        >
                          View
                        </button>


                        {/* DOWNLOAD */}

                        <button
                          className="download-record-btn"
                          onClick={() =>
                            handleDownload(record)
                          }
                        >
                          Download
                        </button>


                        {/* DELETE — ADMIN ONLY */}

                        {canDeleteRecord && (
                          <button
                            className="delete-record-btn"
                            onClick={() =>
                              handleDelete(record.id)
                            }
                          >
                            Delete
                          </button>
                        )}

                      </div>

                    </td>

                  </tr>

                ))

              ) : (

                <tr>

                  <td
                    colSpan="8"
                    className="no-medical-records"
                  >
                    No medical records found.
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

export default MedicalRecords;

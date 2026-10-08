
import React, { useState } from "react";
import "./Prescriptions.css";
import { useAuth } from "../../context/AuthContext.jsx";

function Prescriptions() {
  const { user } = useAuth();

  const currentRole = user?.role || "Hospital Administrator";

  const isPatient = currentRole === "Patient";
  const isDoctor = currentRole === "Doctor";
  const isAdmin = currentRole === "Hospital Administrator";
  const isLabStaff = currentRole === "Laboratory Staff";

  const canAddPrescription = isDoctor || isAdmin;
  const canDeletePrescription = isAdmin;

  const [searchTerm, setSearchTerm] = useState("");

  const [prescriptions, setPrescriptions] = useState([
    {
      id: "RX001",
      patient: "Arun Kumar",
      doctor: "Dr. Sharma",
      medicine: "Paracetamol 500mg",
      dosage: "1 tablet",
      frequency: "Twice a day",
      duration: "5 days",
      date: "18 Sep 2026",
      status: "Active",
    },
    {
      id: "RX002",
      patient: "Priya Sharma",
      doctor: "Dr. Kumar",
      medicine: "Amoxicillin 500mg",
      dosage: "1 capsule",
      frequency: "Three times a day",
      duration: "7 days",
      date: "17 Sep 2026",
      status: "Active",
    },
    {
      id: "RX003",
      patient: "Rahul Raj",
      doctor: "Dr. Wilson",
      medicine: "Cetirizine 10mg",
      dosage: "1 tablet",
      frequency: "Once a day",
      duration: "10 days",
      date: "15 Sep 2026",
      status: "Completed",
    },
    {
      id: "RX004",
      patient: "Meena Devi",
      doctor: "Dr. James",
      medicine: "Metformin 500mg",
      dosage: "1 tablet",
      frequency: "Twice a day",
      duration: "30 days",
      date: "14 Sep 2026",
      status: "Active",
    },
  ]);

  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    patient: "",
    doctor: "",
    medicine: "",
    dosage: "",
    frequency: "",
    duration: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!canAddPrescription) {
      alert("You do not have permission to add prescriptions.");
      return;
    }

    if (
      !formData.patient ||
      !formData.doctor ||
      !formData.medicine ||
      !formData.dosage ||
      !formData.frequency ||
      !formData.duration
    ) {
      alert("Please fill in all prescription details.");
      return;
    }

    const newPrescription = {
      id: `RX00${prescriptions.length + 1}`,
      patient: formData.patient,
      doctor: formData.doctor,
      medicine: formData.medicine,
      dosage: formData.dosage,
      frequency: formData.frequency,
      duration: formData.duration,
      date: "Today",
      status: "Active",
    };

    setPrescriptions([
      ...prescriptions,
      newPrescription,
    ]);

    setFormData({
      patient: "",
      doctor: "",
      medicine: "",
      dosage: "",
      frequency: "",
      duration: "",
    });

    setShowForm(false);

    alert("Prescription added successfully.");
  };

  const handleView = (prescription) => {
    alert(
      `Prescription\n\n` +
        `Prescription ID: ${prescription.id}\n` +
        `Patient: ${prescription.patient}\n` +
        `Doctor: ${prescription.doctor}\n` +
        `Medicine: ${prescription.medicine}\n` +
        `Dosage: ${prescription.dosage}\n` +
        `Frequency: ${prescription.frequency}\n` +
        `Duration: ${prescription.duration}\n` +
        `Date: ${prescription.date}\n` +
        `Status: ${prescription.status}`
    );
  };

  const handleDownload = (prescription) => {
    alert(
      `Downloading prescription ${prescription.id}`
    );
  };

  const handleDelete = (id) => {
    if (!canDeletePrescription) {
      alert(
        "You do not have permission to delete prescriptions."
      );
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to delete this prescription?"
    );

    if (!confirmed) {
      return;
    }

    setPrescriptions(
      prescriptions.filter(
        (prescription) => prescription.id !== id
      )
    );

    alert("Prescription deleted successfully.");
  };

  const filteredPrescriptions = prescriptions.filter(
    (prescription) =>
      prescription.patient
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      prescription.doctor
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      prescription.medicine
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="prescriptions-page">

      {/* HEADER */}

      <div className="prescriptions-header">

        <div>
          <h1>Prescription Management</h1>

          <p>
            Create, view and manage patient prescriptions
          </p>
        </div>

        {canAddPrescription && (
          <button
            className="add-prescription-btn"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm
              ? "✕ Close Form"
              : "+ Add Prescription"}
          </button>
        )}

      </div>


      {/* ACCESS LEVEL */}

      <div className="prescription-role-info">
        <strong>Access Level:</strong> {currentRole}
      </div>


      {/* SUMMARY CARDS */}

      <div className="prescription-summary-grid">

        <div className="prescription-summary-card">
          <h3>Total Prescriptions</h3>
          <strong>{prescriptions.length}</strong>
          <span>All prescriptions</span>
        </div>

        <div className="prescription-summary-card">
          <h3>Active</h3>
          <strong>
            {
              prescriptions.filter(
                (item) => item.status === "Active"
              ).length
            }
          </strong>
          <span>Currently active</span>
        </div>

        <div className="prescription-summary-card">
          <h3>Completed</h3>
          <strong>
            {
              prescriptions.filter(
                (item) => item.status === "Completed"
              ).length
            }
          </strong>
          <span>Completed prescriptions</span>
        </div>

      </div>


      {/* ADD PRESCRIPTION FORM */}

      {showForm && canAddPrescription && (
        <div className="prescription-form-card">

          <h2>Add New Prescription</h2>

          <form onSubmit={handleSubmit}>

            <div className="prescription-form-grid">

              <div className="prescription-form-group">
                <label>Patient Name</label>

                <input
                  type="text"
                  name="patient"
                  placeholder="Enter patient name"
                  value={formData.patient}
                  onChange={handleChange}
                />
              </div>


              <div className="prescription-form-group">
                <label>Doctor Name</label>

                <input
                  type="text"
                  name="doctor"
                  placeholder="Enter doctor name"
                  value={formData.doctor}
                  onChange={handleChange}
                />
              </div>


              <div className="prescription-form-group">
                <label>Medicine</label>

                <input
                  type="text"
                  name="medicine"
                  placeholder="Enter medicine name"
                  value={formData.medicine}
                  onChange={handleChange}
                />
              </div>


              <div className="prescription-form-group">
                <label>Dosage</label>

                <input
                  type="text"
                  name="dosage"
                  placeholder="Example: 1 tablet"
                  value={formData.dosage}
                  onChange={handleChange}
                />
              </div>


              <div className="prescription-form-group">
                <label>Frequency</label>

                <select
                  name="frequency"
                  value={formData.frequency}
                  onChange={handleChange}
                >
                  <option value="">
                    Select frequency
                  </option>

                  <option value="Once a day">
                    Once a day
                  </option>

                  <option value="Twice a day">
                    Twice a day
                  </option>

                  <option value="Three times a day">
                    Three times a day
                  </option>

                  <option value="Four times a day">
                    Four times a day
                  </option>
                </select>
              </div>


              <div className="prescription-form-group">
                <label>Duration</label>

                <input
                  type="text"
                  name="duration"
                  placeholder="Example: 5 days"
                  value={formData.duration}
                  onChange={handleChange}
                />
              </div>

            </div>


            <div className="prescription-form-actions">

              <button
                type="button"
                className="cancel-prescription-btn"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="save-prescription-btn"
              >
                Save Prescription
              </button>

            </div>

          </form>

        </div>
      )}


      {/* SEARCH */}

      <div className="prescription-search-section">

        <input
          type="text"
          placeholder="Search by patient, doctor or medicine..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

      </div>


      {/* PRESCRIPTION TABLE */}

      <div className="prescription-table-card">

        <div className="prescription-table-header">

          <h2>Prescriptions</h2>

          <span>
            {filteredPrescriptions.length} records
          </span>

        </div>


        <div className="prescription-table-wrapper">

          <table>

            <thead>

              <tr>
                <th>ID</th>
                <th>Patient</th>
                <th>Doctor</th>
                <th>Medicine</th>
                <th>Dosage</th>
                <th>Frequency</th>
                <th>Duration</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>

            </thead>


            <tbody>

              {filteredPrescriptions.length > 0 ? (

                filteredPrescriptions.map((prescription) => (

                  <tr key={prescription.id}>

                    <td>{prescription.id}</td>

                    <td>{prescription.patient}</td>

                    <td>{prescription.doctor}</td>

                    <td>{prescription.medicine}</td>

                    <td>{prescription.dosage}</td>

                    <td>{prescription.frequency}</td>

                    <td>{prescription.duration}</td>

                    <td>{prescription.date}</td>

                    <td>

                      <span
                        className={`prescription-status ${
                          prescription.status === "Active"
                            ? "active"
                            : "completed"
                        }`}
                      >
                        {prescription.status}
                      </span>

                    </td>

                    <td>

                      <div className="prescription-action-buttons">

                        {/* VIEW */}

                        <button
                          className="view-prescription-btn"
                          onClick={() =>
                            handleView(prescription)
                          }
                        >
                          View
                        </button>


                        {/* DOWNLOAD */}

                        <button
                          className="download-prescription-btn"
                          onClick={() =>
                            handleDownload(prescription)
                          }
                        >
                          Download
                        </button>


                        {/* DELETE — ADMIN ONLY */}

                        {canDeletePrescription && (
                          <button
                            className="delete-prescription-btn"
                            onClick={() =>
                              handleDelete(
                                prescription.id
                              )
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
                    colSpan="10"
                    className="no-prescriptions"
                  >
                    No prescriptions found.
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

export default Prescriptions;

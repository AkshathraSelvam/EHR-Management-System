
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Appointments.css";

function Appointments() {
  const { user } = useAuth();
  const location = useLocation();

  // =========================================================
  // ROLE
  // =========================================================

  const currentRole = user?.role || "Hospital Administrator";

  const isPatient = currentRole === "Patient";
  const isDoctor = currentRole === "Doctor";
  const isAdmin = currentRole === "Hospital Administrator";
  const isLabStaff = currentRole === "Laboratory Staff";

  const canBookAppointment = isPatient;
  const canCancelAppointment = isPatient;

  // =========================================================
  // DOCTOR DATA
  // Same doctors used in Doctors.jsx
  // =========================================================

  const doctors = [
    {
      id: 1,
      name: "Dr. David",
      specialization: "Cardiology",
      department: "Cardiology Department",
      experience: 12,
      phone: "9876543210",
      availability: "Available",
    },

    {
      id: 2,
      name: "Dr. Sarah",
      specialization: "Neurology",
      department: "Neurology Department",
      experience: 8,
      phone: "9876501234",
      availability: "Available",
    },

    {
      id: 3,
      name: "Dr. James",
      specialization: "Orthopedics",
      department: "Orthopedics Department",
      experience: 15,
      phone: "9123456789",
      availability: "Available",
    },
  ];

  // =========================================================
  // APPOINTMENTS
  // Load from localStorage
  // =========================================================

  const [appointments, setAppointments] = useState(() => {
    const savedAppointments =
      localStorage.getItem("ehrAppointments");

    if (savedAppointments) {
      return JSON.parse(savedAppointments);
    }

    return [
      {
        id: 1,
        patient: "Arun Kumar",
        doctor: "Dr. David",
        department: "Cardiology Department",
        date: "2026-09-15",
        time: "10:00 AM",
        status: "Confirmed",
      },

      {
        id: 2,
        patient: "Priya Kumar",
        doctor: "Dr. Sarah",
        department: "Neurology Department",
        date: "2026-09-17",
        time: "11:30 AM",
        status: "Pending",
      },

      {
        id: 3,
        patient: "Rahul Kumar",
        doctor: "Dr. James",
        department: "Orthopedics Department",
        date: "2026-09-18",
        time: "02:00 PM",
        status: "Completed",
      },

      {
        id: 4,
        patient: "Meena Devi",
        doctor: "Dr. David",
        department: "Cardiology Department",
        date: "2026-09-20",
        time: "09:30 AM",
        status: "Confirmed",
      },
    ];
  });

  // =========================================================
  // SAVE APPOINTMENTS
  // =========================================================

  useEffect(() => {
    localStorage.setItem(
      "ehrAppointments",
      JSON.stringify(appointments)
    );
  }, [appointments]);

  // =========================================================
  // SEARCH
  // =========================================================

  const [searchTerm, setSearchTerm] = useState("");

  // =========================================================
  // FORM DATA
  // =========================================================

  const [formData, setFormData] = useState({
    patient: user?.name || "",
    doctor: "",
    department: "",
    date: "",
    time: "",
  });

  // =========================================================
  // FORM STATE
  // =========================================================

  const [showForm, setShowForm] = useState(false);

  const [availabilityChecked, setAvailabilityChecked] =
    useState(false);

  const [availabilityStatus, setAvailabilityStatus] =
    useState("");

  const [confirmationStatus, setConfirmationStatus] =
    useState("");

  // =========================================================
  // RECEIVE DOCTOR FROM DOCTORS PAGE
  // =========================================================

  useEffect(() => {
    if (
      isPatient &&
      location.state?.doctor
    ) {
      const selectedDoctor = doctors.find(
        (doctor) =>
          doctor.name === location.state.doctor
      );

      if (selectedDoctor) {
        setFormData({
          patient: user?.name || "",
          doctor: selectedDoctor.name,
          department: selectedDoctor.department,
          date: "",
          time: "",
        });

        setAvailabilityChecked(false);
        setAvailabilityStatus("");
        setConfirmationStatus("");
        setShowForm(true);
      }
    }
  }, [location.state, user, isPatient]);

  // =========================================================
  // HANDLE FORM CHANGE
  // =========================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    // -------------------------------------------------------
    // If doctor changes, automatically select department
    // -------------------------------------------------------

    if (name === "doctor") {
      const selectedDoctor = doctors.find(
        (doctor) => doctor.name === value
      );

      setFormData((prev) => ({
        ...prev,
        doctor: value,
        department:
          selectedDoctor?.department || "",
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    // -------------------------------------------------------
    // Reset availability
    // -------------------------------------------------------

    if (
      name === "doctor" ||
      name === "department" ||
      name === "date" ||
      name === "time"
    ) {
      setAvailabilityChecked(false);
      setAvailabilityStatus("");
      setConfirmationStatus("");
    }
  };

  // =========================================================
  // OPEN FORM
  // =========================================================

  const handleOpenForm = () => {
    if (!canBookAppointment) {
      alert(
        "Only patients can book appointments."
      );
      return;
    }

    setFormData({
      patient: user?.name || "",
      doctor: "",
      department: "",
      date: "",
      time: "",
    });

    setAvailabilityChecked(false);
    setAvailabilityStatus("");
    setConfirmationStatus("");

    setShowForm(true);
  };

  // =========================================================
  // CLOSE FORM
  // =========================================================

  const handleCloseForm = () => {
    setShowForm(false);

    setFormData({
      patient: user?.name || "",
      doctor: "",
      department: "",
      date: "",
      time: "",
    });

    setAvailabilityChecked(false);
    setAvailabilityStatus("");
    setConfirmationStatus("");
  };

  // =========================================================
  // CHECK AVAILABILITY
  // =========================================================

  const checkAvailability = () => {
    if (!formData.doctor) {
      alert("Please select a doctor.");
      return;
    }

    if (!formData.department) {
      alert("Please select a department.");
      return;
    }

    if (!formData.date) {
      alert(
        "Please select an appointment date."
      );
      return;
    }

    if (!formData.time) {
      alert(
        "Please select an appointment time."
      );
      return;
    }

    // -------------------------------------------------------
    // Find selected doctor
    // -------------------------------------------------------

    const selectedDoctor = doctors.find(
      (doctor) =>
        doctor.name === formData.doctor
    );

    // -------------------------------------------------------
    // Check doctor availability
    // -------------------------------------------------------

    if (
      !selectedDoctor ||
      selectedDoctor.availability !==
        "Available"
    ) {
      setAvailabilityChecked(true);
      setAvailabilityStatus("Unavailable");

      alert(
        "The selected doctor is currently unavailable."
      );

      return;
    }

    // -------------------------------------------------------
    // Check if same doctor already has appointment
    // at same date and time
    // -------------------------------------------------------

    const alreadyBooked = appointments.some(
      (appointment) =>
        appointment.doctor === formData.doctor &&
        appointment.date === formData.date &&
        appointment.time === formData.time &&
        appointment.status !== "Cancelled"
    );

    if (alreadyBooked) {
      setAvailabilityChecked(true);
      setAvailabilityStatus("Unavailable");

      alert(
        "This doctor already has an appointment at the selected date and time."
      );

      return;
    }

    // -------------------------------------------------------
    // Available
    // -------------------------------------------------------

    setAvailabilityChecked(true);
    setAvailabilityStatus("Available");
    setConfirmationStatus("");
  };

  // =========================================================
  // CONFIRM APPOINTMENT
  // =========================================================

  const confirmAppointment = () => {
    if (!isPatient) {
      alert(
        "Only patients can confirm appointments."
      );
      return;
    }

    if (
      !availabilityChecked ||
      availabilityStatus !== "Available"
    ) {
      alert(
        "Please check doctor availability first."
      );
      return;
    }

    if (
      !formData.patient ||
      !formData.doctor ||
      !formData.department ||
      !formData.date ||
      !formData.time
    ) {
      alert(
        "Please complete all appointment details."
      );
      return;
    }

    // =======================================================
    // GENERATE NEW ID
    // =======================================================

    const newId =
      appointments.length > 0
        ? Math.max(
            ...appointments.map(
              (appointment) =>
                appointment.id
            )
          ) + 1
        : 1;

    // =======================================================
    // CREATE APPOINTMENT
    // =======================================================

    const newAppointment = {
      id: newId,

      patient: formData.patient,

      doctor: formData.doctor,

      department: formData.department,

      date: formData.date,

      time: formData.time,

      status: "Confirmed",
    };

    // =======================================================
    // SAVE
    // =======================================================

    setAppointments((prev) => [
      ...prev,
      newAppointment,
    ]);

    setConfirmationStatus(
      "Appointment Confirmed"
    );

    alert(
      `Appointment confirmed successfully for ${formData.patient}.`
    );

    // =======================================================
    // CLOSE FORM
    // =======================================================

    setTimeout(() => {
      handleCloseForm();
    }, 1000);
  };

  // =========================================================
  // CANCEL APPOINTMENT
  // =========================================================

  const cancelAppointment = (id) => {
    if (!canCancelAppointment) {
      alert(
        "Only patients can cancel appointments."
      );
      return;
    }

    const appointment =
      appointments.find(
        (item) => item.id === id
      );

    if (!appointment) {
      return;
    }

    // -------------------------------------------------------
    // Only own appointment
    // -------------------------------------------------------

    if (
      appointment.patient !== user?.name
    ) {
      alert(
        "You can only cancel your own appointments."
      );
      return;
    }

    // -------------------------------------------------------
    // Cannot cancel completed
    // -------------------------------------------------------

    if (
      appointment.status === "Completed"
    ) {
      alert(
        "Completed appointments cannot be cancelled."
      );
      return;
    }

    // -------------------------------------------------------
    // Already cancelled
    // -------------------------------------------------------

    if (
      appointment.status === "Cancelled"
    ) {
      return;
    }

    // -------------------------------------------------------
    // Confirmation
    // -------------------------------------------------------

    const confirmed = window.confirm(
      "Are you sure you want to cancel this appointment?"
    );

    if (!confirmed) {
      return;
    }

    // -------------------------------------------------------
    // Update status
    // -------------------------------------------------------

    setAppointments((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status: "Cancelled",
            }
          : item
      )
    );

    alert(
      "Appointment cancelled successfully."
    );
  };

  // =========================================================
  // SEARCH FILTER
  // =========================================================

  const filteredAppointments =
    appointments.filter((appointment) => {
      // -----------------------------------------------------
      // Patient sees ONLY their appointments
      // -----------------------------------------------------

      if (
        isPatient &&
        appointment.patient !== user?.name
      ) {
        return false;
      }

      const search =
        searchTerm.toLowerCase();

      return (
        appointment.patient
          .toLowerCase()
          .includes(search) ||
        appointment.doctor
          .toLowerCase()
          .includes(search) ||
        appointment.department
          .toLowerCase()
          .includes(search) ||
        appointment.status
          .toLowerCase()
          .includes(search) ||
        appointment.date
          .toLowerCase()
          .includes(search)
      );
    });

  // =========================================================
  // SUMMARY COUNTS
  // =========================================================

  const visibleAppointments =
    isPatient
      ? appointments.filter(
          (appointment) =>
            appointment.patient ===
            user?.name
        )
      : appointments;

  const totalAppointments =
    visibleAppointments.length;

  const pendingAppointments =
    visibleAppointments.filter(
      (appointment) =>
        appointment.status === "Pending"
    ).length;

  const confirmedAppointments =
    visibleAppointments.filter(
      (appointment) =>
        appointment.status === "Confirmed"
    ).length;

  const completedAppointments =
    visibleAppointments.filter(
      (appointment) =>
        appointment.status === "Completed"
    ).length;

  const cancelledAppointments =
    visibleAppointments.filter(
      (appointment) =>
        appointment.status === "Cancelled"
    ).length;

  // =========================================================
  // LAB STAFF ACCESS RESTRICTION
  // =========================================================

  if (isLabStaff) {
    return (
      <div className="appointments-page">

        <div className="appointments-header">

          <div>

            <h1>
              Appointment Management
            </h1>

            <p>
              Request, schedule and manage
              patient appointments
            </p>

          </div>

        </div>

        <div className="appointment-access-denied">

          <div className="appointment-access-icon">
            🔒
          </div>

          <h2>
            Access Restricted
          </h2>

          <p>
            Laboratory Staff do not have
            access to appointment management.
          </p>

          <span>
            Current Role: Laboratory Staff
          </span>

        </div>

      </div>
    );
  }

  // =========================================================
  // MAIN UI
  // =========================================================

  return (
    <div className="appointments-page">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="appointments-header">

        <div>

          <h1>
            Appointment Management
          </h1>

          <p>
            Request, schedule and manage
            patient appointments
          </p>

        </div>

        {/* BOOK BUTTON */}

        {canBookAppointment &&
          !showForm && (

            <button
              className="add-appointment-btn"
              onClick={handleOpenForm}
            >
              + Book New Appointment
            </button>

          )}

        {/* CLOSE BUTTON */}

        {showForm &&
          canBookAppointment && (

            <button
              className="add-appointment-btn"
              onClick={handleCloseForm}
            >
              ✕ Close
            </button>

          )}

      </div>


      {/* =====================================================
          ACCESS LEVEL
      ===================================================== */}

      <div className="appointment-role-info">

        <strong>
          Access Level:
        </strong>{" "}

        {isPatient && (
          <>
            Patient – You can view, book
            and cancel your appointments.
          </>
        )}

        {isDoctor && (
          <>
            Doctor – View appointments only.
          </>
        )}

        {isAdmin && (
          <>
            Hospital Administrator –
            View appointments only.
          </>
        )}

      </div>


      {/* =====================================================
          SUMMARY CARDS
      ===================================================== */}

      <div className="appointment-summary-grid">

        {/* TOTAL */}

        <div className="appointment-summary-card">

          <div className="appointment-icon">
            📅
          </div>

          <div>

            <h3>
              {totalAppointments}
            </h3>

            <p>
              Total Appointments
            </p>

          </div>

        </div>


        {/* PENDING */}

        <div className="appointment-summary-card">

          <div className="appointment-icon">
            ⏳
          </div>

          <div>

            <h3>
              {pendingAppointments}
            </h3>

            <p>
              Pending
            </p>

          </div>

        </div>


        {/* CONFIRMED */}

        <div className="appointment-summary-card">

          <div className="appointment-icon">
            ✅
          </div>

          <div>

            <h3>
              {confirmedAppointments}
            </h3>

            <p>
              Confirmed
            </p>

          </div>

        </div>


        {/* COMPLETED */}

        <div className="appointment-summary-card">

          <div className="appointment-icon">
            ✔️
          </div>

          <div>

            <h3>
              {completedAppointments}
            </h3>

            <p>
              Completed
            </p>

          </div>

        </div>

      </div>


      {/* =====================================================
          BOOK APPOINTMENT FORM
      ===================================================== */}

      {showForm &&
        canBookAppointment && (

          <div className="appointment-form-card">

            {/* FORM HEADER */}

            <div className="appointment-form-header">

              <div>

                <h2>
                  Book New Appointment
                </h2>

                <p>
                  Schedule a new medical
                  appointment
                </p>

              </div>

              <button
                className="close-form-btn"
                onClick={handleCloseForm}
              >
                ✕
              </button>

            </div>


            {/* =================================================
                APPOINTMENT FLOW
            ================================================= */}

            <div className="appointment-flow">

              {/* STEP 1 */}

              <div
                className={`appointment-flow-step ${
                  !availabilityChecked
                    ? "active"
                    : "completed"
                }`}
              >

                <div className="appointment-flow-number">
                  1
                </div>

                <div>

                  <strong>
                    Request
                  </strong>

                  <span>
                    Enter appointment details
                  </span>

                </div>

              </div>


              <div className="appointment-flow-line"></div>


              {/* STEP 2 */}

              <div
                className={`appointment-flow-step ${
                  availabilityChecked
                    ? "completed"
                    : ""
                }`}
              >

                <div className="appointment-flow-number">
                  2
                </div>

                <div>

                  <strong>
                    Availability
                  </strong>

                  <span>
                    Check doctor availability
                  </span>

                </div>

              </div>


              <div className="appointment-flow-line"></div>


              {/* STEP 3 */}

              <div
                className={`appointment-flow-step ${
                  confirmationStatus
                    ? "completed"
                    : ""
                }`}
              >

                <div className="appointment-flow-number">
                  3
                </div>

                <div>

                  <strong>
                    Confirmation
                  </strong>

                  <span>
                    Confirm appointment
                  </span>

                </div>

              </div>

            </div>


            {/* =================================================
                REQUEST SECTION
            ================================================= */}

            <div className="appointment-form-section">

              <h3>
                Request Appointment
              </h3>


              <div className="appointment-form-grid">

                {/* PATIENT */}

                <div className="appointment-form-group">

                  <label>
                    Patient Name
                  </label>

                  <input
                    type="text"
                    name="patient"
                    value={
                      user?.name || ""
                    }
                    readOnly
                  />

                </div>


                {/* DOCTOR */}

                <div className="appointment-form-group">

                  <label>
                    Doctor <span>*</span>
                  </label>

                  <select
                    name="doctor"
                    value={formData.doctor}
                    onChange={handleChange}
                  >

                    <option value="">
                      Select Doctor
                    </option>

                    {doctors.map(
                      (doctor) => (

                        <option
                          key={doctor.id}
                          value={doctor.name}
                        >
                          {doctor.name}
                        </option>

                      )
                    )}

                  </select>

                </div>


                {/* DEPARTMENT */}

                <div className="appointment-form-group">

                  <label>
                    Department <span>*</span>
                  </label>

                  <input
                    type="text"
                    name="department"
                    value={
                      formData.department
                    }
                    readOnly
                    placeholder="Select doctor first"
                  />

                </div>


                {/* DATE */}

                <div className="appointment-form-group">

                  <label>
                    Appointment Date{" "}
                    <span>*</span>
                  </label>

                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    min={
                      new Date()
                        .toISOString()
                        .split("T")[0]
                    }
                  />

                </div>


                {/* TIME */}

                <div className="appointment-form-group">

                  <label>
                    Appointment Time{" "}
                    <span>*</span>
                  </label>

                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                  />

                </div>

              </div>


              {/* =================================================
                  AVAILABILITY
              ================================================= */}

              <div className="availability-section">

                <button
                  className="check-availability-btn"
                  onClick={
                    checkAvailability
                  }
                >
                  Check Doctor Availability
                </button>


                {/* AVAILABLE */}

                {availabilityChecked &&
                  availabilityStatus ===
                    "Available" && (

                    <div className="availability-success">

                      <span>
                        ✓
                      </span>

                      <div>

                        <strong>
                          Doctor Available
                        </strong>

                        <p>
                          {formData.doctor} is
                          available on{" "}
                          {formData.date} at{" "}
                          {formData.time}.
                        </p>

                      </div>

                    </div>

                  )}


                {/* UNAVAILABLE */}

                {availabilityChecked &&
                  availabilityStatus ===
                    "Unavailable" && (

                    <div className="availability-error">

                      <span>
                        ✕
                      </span>

                      <div>

                        <strong>
                          Doctor Unavailable
                        </strong>

                        <p>
                          Please select another
                          time or doctor.
                        </p>

                      </div>

                    </div>

                  )}

              </div>

            </div>


            {/* =================================================
                CONFIRMATION
            ================================================= */}

            {availabilityChecked &&
              availabilityStatus ===
                "Available" && (

                <div className="appointment-confirmation-section">

                  <h3>
                    Confirmation
                  </h3>


                  <div className="confirmation-box">

                    <h4>
                      Appointment Details
                    </h4>


                    <div className="confirmation-details">

                      <p>
                        <strong>
                          Patient:
                        </strong>{" "}
                        {formData.patient}
                      </p>

                      <p>
                        <strong>
                          Doctor:
                        </strong>{" "}
                        {formData.doctor}
                      </p>

                      <p>
                        <strong>
                          Department:
                        </strong>{" "}
                        {formData.department}
                      </p>

                      <p>
                        <strong>
                          Date:
                        </strong>{" "}
                        {formData.date}
                      </p>

                      <p>
                        <strong>
                          Time:
                        </strong>{" "}
                        {formData.time}
                      </p>

                    </div>

                  </div>


                  {/* CONFIRMATION SUCCESS */}

                  {confirmationStatus && (

                    <div className="confirmation-success">

                      ✓{" "}
                      {confirmationStatus}

                    </div>

                  )}


                  {/* ACTION BUTTONS */}

                  <div className="appointment-form-actions">

                    <button
                      className="cancel-form-btn"
                      onClick={
                        handleCloseForm
                      }
                    >
                      Cancel
                    </button>


                    <button
                      className="confirm-appointment-btn"
                      onClick={
                        confirmAppointment
                      }
                    >
                      Confirm Appointment
                    </button>

                  </div>

                </div>

              )}

          </div>

        )}


      {/* =====================================================
          SEARCH
      ===================================================== */}

      <div className="appointment-search-section">

        <div className="appointment-search-box">

          <span className="search-icon">
            🔍
          </span>

          <input
            type="text"
            placeholder="Search appointments..."
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(
                e.target.value
              )
            }
          />

        </div>

      </div>


      {/* =====================================================
          APPOINTMENT TABLE
      ===================================================== */}

      <div className="appointment-table-card">

        <div className="appointment-table-header">

          <div>

            <h2>
              Appointment List
            </h2>

            <p>
              View scheduled appointments
            </p>

          </div>


          {!isPatient && (

            <span className="appointment-view-label">
              View Only
            </span>

          )}

        </div>


        <div className="appointment-table-wrapper">

          <table>

            <thead>

              <tr>

                <th>
                  Patient
                </th>

                <th>
                  Doctor
                </th>

                <th>
                  Department
                </th>

                <th>
                  Date
                </th>

                <th>
                  Time
                </th>

                <th>
                  Status
                </th>

                {isPatient && (
                  <th>
                    Action
                  </th>
                )}

              </tr>

            </thead>


            <tbody>

              {filteredAppointments.length >
              0 ? (

                filteredAppointments.map(
                  (appointment) => (

                    <tr
                      key={
                        appointment.id
                      }
                    >

                      <td>
                        {appointment.patient}
                      </td>

                      <td>
                        {appointment.doctor}
                      </td>

                      <td>
                        {appointment.department}
                      </td>

                      <td>
                        {appointment.date}
                      </td>

                      <td>
                        {appointment.time}
                      </td>

                      <td>

                        <span
                          className={`appointment-status ${appointment.status
                            .toLowerCase()
                            .replace(
                              /\s+/g,
                              "-"
                            )}`}
                        >
                          {
                            appointment.status
                          }
                        </span>

                      </td>


                      {/* PATIENT ACTION */}

                      {isPatient && (

                        <td>

                          {appointment.patient ===
                            user?.name &&
                          appointment.status !==
                            "Cancelled" &&
                          appointment.status !==
                            "Completed" ? (

                            <button
                              className="cancel-appointment-btn"
                              onClick={() =>
                                cancelAppointment(
                                  appointment.id
                                )
                              }
                            >
                              Cancel
                            </button>

                          ) : (

                            <span className="appointment-no-action">
                              —
                            </span>

                          )}

                        </td>

                      )}

                    </tr>

                  )
                )

              ) : (

                <tr>

                  <td
                    colSpan={
                      isPatient
                        ? 7
                        : 6
                    }
                    className="no-appointments"
                  >
                    No appointments found.
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

export default Appointments;

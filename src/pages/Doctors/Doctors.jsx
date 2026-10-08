
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

import "./Doctors.css";

import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";

function Doctors() {

  const navigate = useNavigate();

  const { user } = useAuth();


  /* =====================================================
     ROLE
  ===================================================== */

  const isAdmin =
    user?.role === "Hospital Administrator";

  const isPatient =
    user?.role === "Patient";


  /* =====================================================
     DOCTOR DATA
     LOAD FROM LOCAL STORAGE
  ===================================================== */

  const [doctors, setDoctors] = useState(() => {

    const savedDoctors =
      localStorage.getItem("ehrDoctors");


    if (savedDoctors) {

      return JSON.parse(savedDoctors);

    }


    const defaultDoctors = [

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


    localStorage.setItem(
      "ehrDoctors",
      JSON.stringify(defaultDoctors)
    );


    return defaultDoctors;

  });


  /* =====================================================
     STATES
  ===================================================== */

  const [search, setSearch] =
    useState("");

  const [showModal, setShowModal] =
    useState(false);

  const [isEditing, setIsEditing] =
    useState(false);

  const [editingId, setEditingId] =
    useState(null);


  const [newDoctor, setNewDoctor] =
    useState({

      id: "",
      name: "",
      specialization: "",
      department: "",
      experience: "",
      phone: "",
      availability: "Available",

    });


  /* =====================================================
     SAVE DOCTORS
  ===================================================== */

  const saveDoctors = (updatedDoctors) => {

    setDoctors(updatedDoctors);

    localStorage.setItem(
      "ehrDoctors",
      JSON.stringify(updatedDoctors)
    );

  };


  /* =====================================================
     RESET FORM
  ===================================================== */

  const resetForm = () => {

    setNewDoctor({

      id: "",
      name: "",
      specialization: "",
      department: "",
      experience: "",
      phone: "",
      availability: "Available",

    });

    setIsEditing(false);

    setEditingId(null);

  };


  /* =====================================================
     CHANGE
  ===================================================== */

  const handleChange = (e) => {

    setNewDoctor({

      ...newDoctor,

      [e.target.name]:
        e.target.value,

    });

  };


  /* =====================================================
     SAVE DOCTOR
  ===================================================== */

  const handleSaveDoctor = () => {

    /* =================================================
       ADMIN CHECK
    ================================================= */

    if (!isAdmin) {

      alert(
        "Only Hospital Administrators can manage doctors."
      );

      return;

    }


    /* =================================================
       VALIDATION
    ================================================= */

    if (
      !newDoctor.id ||
      !newDoctor.name.trim() ||
      !newDoctor.specialization.trim() ||
      !newDoctor.department.trim() ||
      !newDoctor.experience ||
      !newDoctor.phone.trim()
    ) {

      alert(
        "Please fill all fields."
      );

      return;

    }


    /* =================================================
       EXPERIENCE VALIDATION
    ================================================= */

    const experience =
      Number(newDoctor.experience);


    if (
      experience < 0 ||
      experience > 70
    ) {

      alert(
        "Please enter a valid experience between 0 and 70 years."
      );

      return;

    }


    /* =================================================
       PHONE VALIDATION
    ================================================= */

    if (
      !/^[0-9]{10}$/.test(
        newDoctor.phone
      )
    ) {

      alert(
        "Please enter a valid 10-digit phone number."
      );

      return;

    }


    /* =================================================
       DOCTOR DATA
    ================================================= */

    const doctorData = {

      id:
        Number(newDoctor.id),

      name:
        newDoctor.name.trim(),

      specialization:
        newDoctor.specialization.trim(),

      department:
        newDoctor.department.trim(),

      experience,

      phone:
        newDoctor.phone.trim(),

      availability:
        newDoctor.availability,

    };


    /* =================================================
       UPDATE
    ================================================= */

    if (isEditing) {

      const updatedDoctors =
        doctors.map(
          (doctor) =>
            doctor.id === editingId
              ? {
                  ...doctorData,
                  id: editingId,
                }
              : doctor
        );


      saveDoctors(
        updatedDoctors
      );


      alert(
        "Doctor details updated successfully."
      );

    }


    /* =================================================
       ADD
    ================================================= */

    else {

      const idExists =
        doctors.some(
          (doctor) =>
            doctor.id ===
            doctorData.id
        );


      if (idExists) {

        alert(
          "A doctor with this ID already exists."
        );

        return;

      }


      const updatedDoctors = [

        ...doctors,

        doctorData,

      ];


      saveDoctors(
        updatedDoctors
      );


      alert(
        "Doctor added successfully."
      );

    }


    /* =================================================
       CLOSE MODAL
    ================================================= */

    resetForm();

    setShowModal(false);

  };


  /* =====================================================
     DELETE
  ===================================================== */

  const handleDelete = (id) => {

    /* =================================================
       ADMIN CHECK
    ================================================= */

    if (!isAdmin) {

      alert(
        "Only Hospital Administrators can delete doctors."
      );

      return;

    }


    /* =================================================
       CONFIRMATION
    ================================================= */

    const confirmed =
      window.confirm(
        "Are you sure you want to delete this doctor?"
      );


    if (!confirmed) {

      return;

    }


    /* =================================================
       DELETE DOCTOR
    ================================================= */

    const updatedDoctors =
      doctors.filter(
        (doctor) =>
          doctor.id !== id
      );


    saveDoctors(
      updatedDoctors
    );


    alert(
      "Doctor deleted successfully."
    );

  };


  /* =====================================================
     EDIT
  ===================================================== */

  const handleEdit = (doctor) => {

    /* =================================================
       ADMIN CHECK
    ================================================= */

    if (!isAdmin) {

      alert(
        "Only Hospital Administrators can edit doctors."
      );

      return;

    }


    /* =================================================
       LOAD DOCTOR
    ================================================= */

    setNewDoctor({

      ...doctor,

      id: doctor.id,

      experience:
        doctor.experience,

    });


    setEditingId(
      doctor.id
    );

    setIsEditing(true);

    setShowModal(true);

  };


  /* =====================================================
     ADD
  ===================================================== */

  const handleAddDoctor = () => {

    /* =================================================
       ADMIN CHECK
    ================================================= */

    if (!isAdmin) {

      alert(
        "Only Hospital Administrators can add doctors."
      );

      return;

    }


    resetForm();

    setShowModal(true);

  };


  /* =====================================================
     BOOK APPOINTMENT
  ===================================================== */

  const handleBookAppointment = (
    doctor
  ) => {

    navigate(
      "/appointments",
      {
        state: {
          doctor:
            doctor.name,
        },
      }
    );

  };


  /* =====================================================
     SEARCH
  ===================================================== */

  const filteredDoctors =
    doctors.filter(
      (doctor) => {

        const searchText =
          search.toLowerCase().trim();


        return (

          doctor.name
            .toLowerCase()
            .includes(searchText)

          ||

          doctor.specialization
            .toLowerCase()
            .includes(searchText)

          ||

          doctor.department
            .toLowerCase()
            .includes(searchText)

        );

      }
    );


  /* =====================================================
     PAGE
  ===================================================== */

  return (

    <div className="dashboard">

      {/* =================================================
          SIDEBAR
      ================================================= */}

      <Sidebar />


      <div className="main-content">

        {/* =================================================
            NAVBAR
        ================================================= */}

        <Navbar />


        {/* =================================================
            HEADER
        ================================================= */}

        <div className="patients-header">

          <div>

            <h2>

              {isPatient
                ? "Available Doctors"
                : "Doctor Management"}

            </h2>


            <p className="page-subtitle">

              {isPatient
                ? "View doctors and book an appointment."
                : "View and manage hospital doctors."}

            </p>

          </div>


          {/* =================================================
              ADD DOCTOR
          ================================================= */}

          {isAdmin && (

            <button
              className="add-btn"
              onClick={
                handleAddDoctor
              }
            >

              + Add Doctor

            </button>

          )}

        </div>


        {/* =================================================
            SEARCH
        ================================================= */}

        <div className="search-box">

          <input

            type="text"

            placeholder="Search Doctor, Specialization or Department..."

            value={search}

            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }

          />

        </div>


        {/* =================================================
            TABLE
        ================================================= */}

        <table>

          <thead>

            <tr>

              {/* ADMIN → ID */}

              {isAdmin && (

                <th>
                  ID
                </th>

              )}


              {/* NAME */}

              <th>
                Name
              </th>


              {/* SPECIALIZATION */}

              <th>
                Specialization
              </th>


              {/* DEPARTMENT */}

              <th>
                Department
              </th>


              {/* EXPERIENCE */}

              {!isPatient && (

                <th>
                  Experience
                </th>

              )}


              {/* PHONE */}

              {isAdmin && (

                <th>
                  Phone
                </th>

              )}


              {/* AVAILABILITY */}

              <th>
                Availability
              </th>


              {/* ACTION */}

              <th>

                {isPatient
                  ? "Appointment"
                  : "Actions"}

              </th>

            </tr>

          </thead>


          <tbody>

            {filteredDoctors.length > 0 ? (

              filteredDoctors.map(
                (doctor) => (

                  <tr
                    key={doctor.id}
                  >

                    {/* =================================================
                        ID
                    ================================================= */}

                    {isAdmin && (

                      <td>
                        {doctor.id}
                      </td>

                    )}


                    {/* =================================================
                        NAME
                    ================================================= */}

                    <td>

                      <strong>
                        {doctor.name}
                      </strong>

                    </td>


                    {/* =================================================
                        SPECIALIZATION
                    ================================================= */}

                    <td>

                      {
                        doctor.specialization
                      }

                    </td>


                    {/* =================================================
                        DEPARTMENT
                    ================================================= */}

                    <td>

                      {
                        doctor.department
                      }

                    </td>


                    {/* =================================================
                        EXPERIENCE
                    ================================================= */}

                    {!isPatient && (

                      <td>

                        {
                          doctor.experience
                        }{" "}

                        Years

                      </td>

                    )}


                    {/* =================================================
                        PHONE
                    ================================================= */}

                    {isAdmin && (

                      <td>

                        {
                          doctor.phone
                        }

                      </td>

                    )}


                    {/* =================================================
                        AVAILABILITY
                    ================================================= */}

                    <td>

                      <span

                        className={
                          doctor.availability ===
                          "Available"

                            ? "availability available"

                            : "availability unavailable"
                        }

                      >

                        {
                          doctor.availability
                        }

                      </span>

                    </td>


                    {/* =================================================
                        PATIENT
                    ================================================= */}

                    {isPatient ? (

                      <td>

                        <button

                          className="appointment-btn"

                          onClick={() =>
                            handleBookAppointment(
                              doctor
                            )
                          }

                          disabled={
                            doctor.availability !==
                            "Available"
                          }

                        >

                          {
                            doctor.availability ===
                            "Available"

                              ? "Book Appointment"

                              : "Not Available"
                          }

                        </button>

                      </td>

                    ) : (

                      /* =================================================
                         ADMIN / OTHER STAFF
                      ================================================= */

                      <td>

                        {isAdmin ? (

                          <>

                            {/* EDIT */}

                            <button

                              className="edit-btn"

                              onClick={() =>
                                handleEdit(
                                  doctor
                                )
                              }

                            >

                              Edit

                            </button>


                            {/* DELETE */}

                            <button

                              className="delete-btn"

                              onClick={() =>
                                handleDelete(
                                  doctor.id
                                )
                              }

                            >

                              Delete

                            </button>

                          </>

                        ) : (

                          <span className="view-only">

                            View Only

                          </span>

                        )}

                      </td>

                    )}

                  </tr>

                )

              )

            ) : (

              /* =================================================
                 NO DOCTORS
              ================================================= */

              <tr>

                <td

                  colSpan={
                    isAdmin
                      ? 7
                      : isPatient
                      ? 6
                      : 6
                  }

                  className="no-doctors"

                >

                  No doctors found.

                </td>

              </tr>

            )}

          </tbody>

        </table>


        {/* =====================================================
            MODAL
        ===================================================== */}

        {isAdmin &&
          showModal && (

          <div className="modal">

            <div className="modal-content">

              {/* =================================================
                  MODAL TITLE
              ================================================= */}

              <h2>

                {isEditing
                  ? "Edit Doctor"
                  : "Add Doctor"}

              </h2>


              {/* =================================================
                  DOCTOR ID
              ================================================= */}

              <input

                type="number"

                name="id"

                placeholder="Doctor ID"

                value={
                  newDoctor.id
                }

                onChange={
                  handleChange
                }

                disabled={
                  isEditing
                }

              />


              {/* =================================================
                  NAME
              ================================================= */}

              <input

                type="text"

                name="name"

                placeholder="Doctor Name"

                value={
                  newDoctor.name
                }

                onChange={
                  handleChange
                }

              />


              {/* =================================================
                  SPECIALIZATION
              ================================================= */}

              <input

                type="text"

                name="specialization"

                placeholder="Specialization"

                value={
                  newDoctor.specialization
                }

                onChange={
                  handleChange
                }

              />


              {/* =================================================
                  DEPARTMENT
              ================================================= */}

              <input

                type="text"

                name="department"

                placeholder="Department"

                value={
                  newDoctor.department
                }

                onChange={
                  handleChange
                }

              />


              {/* =================================================
                  EXPERIENCE
              ================================================= */}

              <input

                type="number"

                name="experience"

                placeholder="Experience (Years)"

                min="0"

                max="70"

                value={
                  newDoctor.experience
                }

                onChange={
                  handleChange
                }

              />


              {/* =================================================
                  PHONE
              ================================================= */}

              <input

                type="tel"

                name="phone"

                placeholder="Phone Number"

                maxLength="10"

                value={
                  newDoctor.phone
                }

                onChange={
                  handleChange
                }

              />


              {/* =================================================
                  AVAILABILITY
              ================================================= */}

              <select

                name="availability"

                value={
                  newDoctor.availability
                }

                onChange={
                  handleChange
                }

              >

                <option value="Available">
                  Available
                </option>

                <option value="Unavailable">
                  Unavailable
                </option>

              </select>


              {/* =================================================
                  MODAL BUTTONS
              ================================================= */}

              <div className="modal-buttons">

                {/* SAVE / UPDATE */}

                <button

                  className="save-btn"

                  onClick={
                    handleSaveDoctor
                  }

                >

                  {isEditing
                    ? "Update"
                    : "Save"}

                </button>


                {/* CANCEL */}

                <button

                  className="cancel-btn"

                  onClick={() => {

                    setShowModal(false);

                    resetForm();

                  }}

                >

                  Cancel

                </button>

              </div>

            </div>

          </div>

        )}

      </div>

    </div>

  );

}

export default Doctors;

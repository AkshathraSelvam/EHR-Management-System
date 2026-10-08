
import { useState } from "react";

import "./Patients.css";

import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";

import { useAuth } from "../../context/AuthContext";


function Patients() {

  const { user } = useAuth();


  // =====================================================
  // ROLE
  // =====================================================

  const isAdmin =
    user?.role ===
    "Hospital Administrator";

  const isPatient =
    user?.role === "Patient";


  // =====================================================
  // PATIENT DATA
  // =====================================================

  const [patients, setPatients] = useState(
    () => {

      const savedPatients =
        localStorage.getItem(
          "ehrPatients"
        );


      if (savedPatients) {

        return JSON.parse(
          savedPatients
        );

      }


      const defaultPatients = [

        {
          id: 101,
          name: "John Smith",
          age: 28,
          gender: "Male",
          phone: "9876543210",
        },

        {
          id: 102,
          name: "Emma Watson",
          age: 31,
          gender: "Female",
          phone: "9123456780",
        },

        {
          id: 103,
          name: "Sophia Brown",
          age: 24,
          gender: "Female",
          phone: "9988776655",
        },

        {
          id: 104,
          name: "David Wilson",
          age: 40,
          gender: "Male",
          phone: "9876123456",
        },

      ];


      localStorage.setItem(
        "ehrPatients",
        JSON.stringify(
          defaultPatients
        )
      );


      return defaultPatients;

    }
  );


  // =====================================================
  // STATES
  // =====================================================

  const [search, setSearch] =
    useState("");

  const [showModal, setShowModal] =
    useState(false);

  const [isEditing, setIsEditing] =
    useState(false);

  const [editingId, setEditingId] =
    useState(null);


  const [newPatient, setNewPatient] =
    useState({

      id: "",
      name: "",
      age: "",
      gender: "",
      phone: "",

    });


  // =====================================================
  // SAVE PATIENTS
  // =====================================================

  const savePatients = (
    updatedPatients
  ) => {

    setPatients(
      updatedPatients
    );

    localStorage.setItem(
      "ehrPatients",
      JSON.stringify(
        updatedPatients
      )
    );

  };


  // =====================================================
  // RESET FORM
  // =====================================================

  const resetForm = () => {

    setNewPatient({

      id: "",
      name: "",
      age: "",
      gender: "",
      phone: "",

    });

    setIsEditing(false);
    setEditingId(null);

  };


  // =====================================================
  // INPUT CHANGE
  // =====================================================

  const handleChange = (e) => {

    setNewPatient({

      ...newPatient,

      [e.target.name]:
        e.target.value,

    });

  };


  // =====================================================
  // ADD / UPDATE
  // =====================================================

  const handleSavePatient = () => {

    if (!isAdmin) {

      alert(
        "Only Hospital Administrators can manage patients."
      );

      return;

    }


    if (
      !newPatient.id ||
      !newPatient.name.trim() ||
      !newPatient.age ||
      !newPatient.gender ||
      !newPatient.phone.trim()
    ) {

      alert(
        "Please fill all fields."
      );

      return;

    }


    const age =
      Number(newPatient.age);


    if (
      age < 1 ||
      age > 120
    ) {

      alert(
        "Please enter a valid age between 1 and 120."
      );

      return;

    }


    if (
      !/^[0-9]{10}$/.test(
        newPatient.phone
      )
    ) {

      alert(
        "Please enter a valid 10-digit phone number."
      );

      return;

    }


    const patientData = {

      id:
        Number(newPatient.id),

      name:
        newPatient.name.trim(),

      age,

      gender:
        newPatient.gender,

      phone:
        newPatient.phone.trim(),

    };


    // ===================================================
    // UPDATE
    // ===================================================

    if (isEditing) {

      const updatedPatients =
        patients.map(
          (patient) =>
            patient.id === editingId
              ? {
                  ...patientData,
                  id: editingId,
                }
              : patient
        );


      savePatients(
        updatedPatients
      );


      alert(
        "Patient details updated successfully."
      );

    }


    // ===================================================
    // ADD
    // ===================================================

    else {

      const idExists =
        patients.some(
          (patient) =>
            patient.id ===
            patientData.id
        );


      if (idExists) {

        alert(
          "A patient with this ID already exists."
        );

        return;

      }


      const updatedPatients = [

        ...patients,
        patientData,

      ];


      savePatients(
        updatedPatients
      );


      alert(
        "Patient added successfully."
      );

    }


    resetForm();

    setShowModal(false);

  };


  // =====================================================
  // DELETE
  // =====================================================

  const handleDeletePatient = (
    id
  ) => {

    if (!isAdmin) {

      alert(
        "Only Hospital Administrators can delete patients."
      );

      return;

    }


    const confirmed =
      window.confirm(
        "Are you sure you want to delete this patient?"
      );


    if (!confirmed) {
      return;
    }


    const updatedPatients =
      patients.filter(
        (patient) =>
          patient.id !== id
      );


    savePatients(
      updatedPatients
    );


    alert(
      "Patient deleted successfully."
    );

  };


  // =====================================================
  // EDIT
  // =====================================================

  const handleEdit = (
    patient
  ) => {

    if (!isAdmin) {

      alert(
        "Only Hospital Administrators can edit patients."
      );

      return;

    }


    setNewPatient({
      ...patient,
      id: patient.id,
      age: patient.age,
    });

    setEditingId(
      patient.id
    );

    setIsEditing(true);

    setShowModal(true);

  };


  // =====================================================
  // ADD
  // =====================================================

  const handleAddPatient = () => {

    if (!isAdmin) {

      alert(
        "Only Hospital Administrators can add patients."
      );

      return;

    }


    resetForm();

    setShowModal(true);

  };


  // =====================================================
  // FILTER
  // =====================================================

  const filteredPatients =
    patients.filter(
      (patient) => {

        const searchText =
          search.toLowerCase();

        return (

          patient.name
            .toLowerCase()
            .includes(searchText)

          ||

          String(patient.id)
            .includes(searchText)

          ||

          patient.phone
            .includes(searchText)

        );

      }
    );


  // =====================================================
  // PAGE
  // =====================================================

  return (

    <div className="patients-page">

      <Sidebar />


      <div className="patients-content">

        <Navbar />


        {/* HEADER */}

        <div className="patients-header">

          <div>

            <h2>
              {isPatient
                ? "My Patient Information"
                : "Patient Management"}
            </h2>

            <p className="page-subtitle">

              {isPatient
                ? "View patient information."
                : "View and manage patient information."}

            </p>

          </div>


          {isAdmin && (

            <button
              className="add-btn"
              onClick={
                handleAddPatient
              }
            >
              + Add Patient
            </button>

          )}

        </div>


        {/* SEARCH */}

        <div className="search-box">

          <input
            type="text"
            placeholder="Search Patient..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
          />

        </div>


        {/* TABLE */}

        <table>

          <thead>

            <tr>

              {isAdmin && (
                <th>ID</th>
              )}

              <th>Name</th>

              <th>Age</th>

              <th>Gender</th>

              {isAdmin && (
                <th>Phone</th>
              )}

              {isAdmin && (
                <th>Actions</th>
              )}

            </tr>

          </thead>


          <tbody>

            {filteredPatients.length >
            0 ? (

              filteredPatients.map(
                (patient) => (

                  <tr
                    key={
                      patient.id
                    }
                  >

                    {isAdmin && (
                      <td>
                        {patient.id}
                      </td>
                    )}


                    <td>
                      <strong>
                        {patient.name}
                      </strong>
                    </td>


                    <td>
                      {patient.age}
                    </td>


                    <td>
                      {patient.gender}
                    </td>


                    {isAdmin && (
                      <td>
                        {patient.phone}
                      </td>
                    )}


                    {isAdmin && (

                      <td>

                        <button
                          className="edit-btn"
                          onClick={() =>
                            handleEdit(
                              patient
                            )
                          }
                        >
                          Edit
                        </button>


                        <button
                          className="delete-btn"
                          onClick={() =>
                            handleDeletePatient(
                              patient.id
                            )
                          }
                        >
                          Delete
                        </button>

                      </td>

                    )}

                  </tr>

                )
              )

            ) : (

              <tr>

                <td
                  colSpan={
                    isAdmin
                      ? 6
                      : 3
                  }
                  className="no-patients"
                >
                  No patients found.
                </td>

              </tr>

            )}

          </tbody>

        </table>


        {/* =================================================
            MODAL
        ================================================= */}

        {isAdmin &&
          showModal && (

          <div className="modal">

            <div className="modal-content">

              <h2>

                {isEditing
                  ? "Edit Patient"
                  : "Add Patient"}

              </h2>


              <input
                type="number"
                name="id"
                placeholder="Patient ID"
                value={
                  newPatient.id
                }
                onChange={
                  handleChange
                }
                disabled={
                  isEditing
                }
              />


              <input
                type="text"
                name="name"
                placeholder="Patient Name"
                value={
                  newPatient.name
                }
                onChange={
                  handleChange
                }
              />


              <input
                type="number"
                name="age"
                placeholder="Age"
                min="1"
                max="120"
                value={
                  newPatient.age
                }
                onChange={
                  handleChange
                }
              />


              <select
                name="gender"
                value={
                  newPatient.gender
                }
                onChange={
                  handleChange
                }
              >

                <option value="">
                  Select Gender
                </option>

                <option value="Male">
                  Male
                </option>

                <option value="Female">
                  Female
                </option>

                <option value="Other">
                  Other
                </option>

              </select>


              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                maxLength="10"
                value={
                  newPatient.phone
                }
                onChange={
                  handleChange
                }
              />


              <div className="modal-buttons">

                <button
                  className="save-btn"
                  onClick={
                    handleSavePatient
                  }
                >
                  {isEditing
                    ? "Update"
                    : "Save"}
                </button>


                <button
                  className="cancel-btn"
                  onClick={() => {

                    setShowModal(
                      false
                    );

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

export default Patients;

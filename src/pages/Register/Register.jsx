import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Register.css";

function Register() {

  const navigate = useNavigate();

  const { register } = useAuth();


  // =====================================================
  // FORM DATA
  // =====================================================

  const [formData, setFormData] = useState({

    fullName: "",
    email: "",
    phone: "",
    age: "",

    role: "Patient",

    gender: "",
    bloodGroup: "",
    address: "",

    specialization: "",
    department: "",

    password: "",
    confirmPassword: "",

  });


  // =====================================================
  // HANDLE CHANGE
  // =====================================================

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });

  };


  // =====================================================
  // SUBMIT
  // =====================================================

  const handleSubmit = (e) => {

    e.preventDefault();


    // ===================================================
    // BASIC VALIDATION
    // ===================================================

    if (
      !formData.fullName.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim() ||
      !formData.age ||
      !formData.password ||
      !formData.confirmPassword
    ) {

      alert(
        "Please fill in all required fields."
      );

      return;

    }


    // ===================================================
    // AGE
    // ===================================================

    const age =
      Number(formData.age);

    if (
      age < 1 ||
      age > 120
    ) {

      alert(
        "Please enter a valid age between 1 and 120."
      );

      return;

    }


    // ===================================================
    // PHONE
    // ===================================================

    if (
      !/^[0-9]{10}$/.test(
        formData.phone
      )
    ) {

      alert(
        "Please enter a valid 10-digit phone number."
      );

      return;

    }


    // ===================================================
    // PASSWORD
    // ===================================================

    if (
      formData.password !==
      formData.confirmPassword
    ) {

      alert(
        "Passwords do not match."
      );

      return;

    }


    // ===================================================
    // PATIENT VALIDATION
    // ===================================================

    if (
      formData.role ===
      "Patient"
    ) {

      if (!formData.gender) {

        alert(
          "Please select your gender."
        );

        return;

      }

      if (
        !formData.bloodGroup
      ) {

        alert(
          "Please select your blood group."
        );

        return;

      }

      if (
        !formData.address.trim()
      ) {

        alert(
          "Please enter your address."
        );

        return;

      }

    }


    // ===================================================
    // DOCTOR VALIDATION
    // ===================================================

    if (
      formData.role ===
      "Doctor"
    ) {

      if (
        !formData.specialization.trim()
      ) {

        alert(
          "Please enter your specialization."
        );

        return;

      }

      if (
        !formData.department.trim()
      ) {

        alert(
          "Please enter your department."
        );

        return;

      }

    }


    // ===================================================
    // LAB STAFF
    // ===================================================

    if (
      formData.role ===
      "Laboratory Staff"
    ) {

      if (
        !formData.department.trim()
      ) {

        alert(
          "Please enter your laboratory department."
        );

        return;

      }

    }


    // ===================================================
    // ADMIN
    // ===================================================

    if (
      formData.role ===
      "Hospital Administrator"
    ) {

      if (
        !formData.department.trim()
      ) {

        alert(
          "Please enter your department."
        );

        return;

      }

    }


    // ===================================================
    // USER OBJECT
    // ===================================================

    const userData = {

      name:
        formData.fullName.trim(),

      email:
        formData.email.trim(),

      phone:
        formData.phone.trim(),

      age: age,

      role:
        formData.role,

      gender:
        formData.role === "Patient"
          ? formData.gender
          : "",

      bloodGroup:
        formData.role === "Patient"
          ? formData.bloodGroup
          : "",

      address:
        formData.role === "Patient"
          ? formData.address.trim()
          : "",

      specialization:
        formData.role === "Doctor"
          ? formData.specialization.trim()
          : "",

      department:
        formData.role === "Doctor" ||
        formData.role ===
          "Laboratory Staff" ||
        formData.role ===
          "Hospital Administrator"
          ? formData.department.trim()
          : "",

      password:
        formData.password,

    };


    // ===================================================
    // REGISTER
    // ===================================================

    const result =
      register(userData);


    if (!result.success) {

      alert(
        result.message
      );

      return;

    }


    alert(
      "Registration successful! Please login."
    );

    navigate("/");

  };


  // =====================================================
  // UI
  // =====================================================

  return (

    <div className="register-page">

      <div className="register-container">

        <div className="register-info">

          <div className="ehr-logo">
            🏥
          </div>

          <h1>
            EHR System
          </h1>

          <h2>
            Electronic Health Record
          </h2>

          <p>
            Securely manage patient records,
            appointments, prescriptions and
            healthcare information.
          </p>

        </div>


        <div className="register-card">

          <h2>
            Create Account
          </h2>

          <p className="register-subtitle">
            Register to access the EHR System
          </p>


          <form
            onSubmit={handleSubmit}
          >

            <div className="form-group">

              <label>
                Full Name
              </label>

              <input
                type="text"
                name="fullName"
                placeholder="Enter full name"
                value={formData.fullName}
                onChange={handleChange}
              />

            </div>


            <div className="form-group">

              <label>
                Email Address
              </label>

              <input
                type="email"
                name="email"
                placeholder="Enter email"
                value={formData.email}
                onChange={handleChange}
              />

            </div>


            <div className="form-group">

              <label>
                Phone Number
              </label>

              <input
                type="tel"
                name="phone"
                placeholder="Enter 10-digit phone number"
                maxLength="10"
                value={formData.phone}
                onChange={handleChange}
              />

            </div>


            <div className="form-group">

              <label>
                Age
              </label>

              <input
                type="number"
                name="age"
                placeholder="Enter age"
                min="1"
                max="120"
                value={formData.age}
                onChange={handleChange}
              />

            </div>


            <div className="form-group">

              <label>
                Role
              </label>

              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="role-select"
              >

                <option value="Patient">
                  Patient
                </option>

                <option value="Doctor">
                  Doctor
                </option>

                <option value="Hospital Administrator">
                  Hospital Administrator
                </option>

                <option value="Laboratory Staff">
                  Laboratory Staff
                </option>

              </select>

            </div>


            {/* PATIENT */}

            {formData.role ===
              "Patient" && (
              <>

                <div className="form-group">

                  <label>
                    Gender
                  </label>

                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="role-select"
                  >

                    <option value="">
                      Select gender
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

                </div>


                <div className="form-group">

                  <label>
                    Blood Group
                  </label>

                  <select
                    name="bloodGroup"
                    value={
                      formData.bloodGroup
                    }
                    onChange={
                      handleChange
                    }
                    className="role-select"
                  >

                    <option value="">
                      Select blood group
                    </option>

                    <option>A+</option>
                    <option>A-</option>
                    <option>B+</option>
                    <option>B-</option>
                    <option>AB+</option>
                    <option>AB-</option>
                    <option>O+</option>
                    <option>O-</option>

                  </select>

                </div>


                <div className="form-group">

                  <label>
                    Address
                  </label>

                  <textarea
                    name="address"
                    placeholder="Enter your address"
                    rows="3"
                    value={
                      formData.address
                    }
                    onChange={
                      handleChange
                    }
                  />

                </div>

              </>
            )}


            {/* DOCTOR */}

            {formData.role ===
              "Doctor" && (
              <>

                <div className="form-group">

                  <label>
                    Specialization
                  </label>

                  <input
                    type="text"
                    name="specialization"
                    placeholder="e.g. Cardiology"
                    value={
                      formData.specialization
                    }
                    onChange={
                      handleChange
                    }
                  />

                </div>


                <div className="form-group">

                  <label>
                    Department
                  </label>

                  <input
                    type="text"
                    name="department"
                    placeholder="e.g. Cardiology Department"
                    value={
                      formData.department
                    }
                    onChange={
                      handleChange
                    }
                  />

                </div>

              </>
            )}


            {/* LAB */}

            {formData.role ===
              "Laboratory Staff" && (

              <div className="form-group">

                <label>
                  Laboratory Department
                </label>

                <input
                  type="text"
                  name="department"
                  placeholder="e.g. Pathology"
                  value={
                    formData.department
                  }
                  onChange={
                    handleChange
                  }
                />

              </div>

            )}


            {/* ADMIN */}

            {formData.role ===
              "Hospital Administrator" && (

              <div className="form-group">

                <label>
                  Department
                </label>

                <input
                  type="text"
                  name="department"
                  placeholder="e.g. Administration"
                  value={
                    formData.department
                  }
                  onChange={
                    handleChange
                  }
                />

              </div>

            )}


            <div className="form-group">

              <label>
                Password
              </label>

              <input
                type="password"
                name="password"
                placeholder="Create password"
                value={
                  formData.password
                }
                onChange={
                  handleChange
                }
              />

            </div>


            <div className="form-group">

              <label>
                Confirm Password
              </label>

              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm password"
                value={
                  formData.confirmPassword
                }
                onChange={
                  handleChange
                }
              />

            </div>


            <button
              type="submit"
              className="register-button"
            >
              Register
            </button>

          </form>


          <p className="login-link">

            Already have an account?{" "}

            <span
              onClick={() =>
                navigate("/")
              }
            >
              Login
            </span>

          </p>

        </div>

      </div>

    </div>

  );

}

export default Register;
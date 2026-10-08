
import React, { useEffect, useState } from "react";
import "./Profile.css";

import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import { useAuth } from "../../context/AuthContext";

function Profile() {
  const {
    user,
    updateProfile,
    updatePassword,
  } = useAuth();

  /* =====================================================
     PROFILE STATE
  ===================================================== */

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    role: "",

    gender: "",
    bloodGroup: "",
    address: "",

    specialization: "",
    department: "",
  });

  const [edit, setEdit] = useState(false);

  /* =====================================================
     PASSWORD STATE
  ===================================================== */

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  /* =====================================================
     LOAD USER DATA
  ===================================================== */

  useEffect(() => {
    if (user) {
      setProfile({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        age: user.age || "",
        role: user.role || "",

        gender: user.gender || "",
        bloodGroup: user.bloodGroup || "",
        address: user.address || "",

        specialization:
          user.specialization || "",

        department:
          user.department || "",
      });
    }
  }, [user]);

  /* =====================================================
     HANDLE PROFILE CHANGE
  ===================================================== */

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  /* =====================================================
     HANDLE PASSWORD CHANGE
  ===================================================== */

  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    });
  };

  /* =====================================================
     SAVE PROFILE
  ===================================================== */

  const handleSaveProfile = () => {
    /* ---------------------------------------------------
       BASIC VALIDATION
    --------------------------------------------------- */

    if (
      !profile.name.trim() ||
      !profile.phone.trim() ||
      !profile.age
    ) {
      alert("Please fill all required fields.");
      return;
    }

    /* ---------------------------------------------------
       AGE VALIDATION
    --------------------------------------------------- */

    const age = Number(profile.age);

    if (age < 1 || age > 120) {
      alert("Please enter a valid age between 1 and 120.");
      return;
    }

    /* ---------------------------------------------------
       PHONE VALIDATION
    --------------------------------------------------- */

    if (!/^[0-9]{10}$/.test(profile.phone)) {
      alert(
        "Please enter a valid 10-digit phone number."
      );
      return;
    }

    /* ---------------------------------------------------
       PATIENT VALIDATION
    --------------------------------------------------- */

    if (profile.role === "Patient") {
      if (!profile.gender) {
        alert("Please select your gender.");
        return;
      }

      if (!profile.bloodGroup) {
        alert("Please select your blood group.");
        return;
      }

      if (!profile.address.trim()) {
        alert("Please enter your address.");
        return;
      }
    }

    /* ---------------------------------------------------
       DATA TO UPDATE
    --------------------------------------------------- */

    const updatedProfile = {
      name: profile.name.trim(),

      phone: profile.phone.trim(),

      age: age,

      gender:
        profile.role === "Patient"
          ? profile.gender
          : profile.gender || "",

      bloodGroup:
        profile.role === "Patient"
          ? profile.bloodGroup
          : profile.bloodGroup || "",

      address:
        profile.role === "Patient"
          ? profile.address.trim()
          : profile.address || "",

      specialization:
        profile.role === "Doctor"
          ? profile.specialization.trim()
          : profile.specialization || "",

      department:
        profile.role === "Doctor" ||
        profile.role === "Laboratory Staff" ||
        profile.role === "Hospital Administrator"
          ? profile.department.trim()
          : profile.department || "",
    };

    /* ---------------------------------------------------
       UPDATE THROUGH AUTH CONTEXT
    --------------------------------------------------- */

    const result = updateProfile(updatedProfile);

    if (!result.success) {
      alert(result.message);
      return;
    }

    /* ---------------------------------------------------
       UPDATE LOCAL PROFILE STATE
    --------------------------------------------------- */

    setProfile({
      name: result.user.name || "",
      email: result.user.email || "",
      phone: result.user.phone || "",
      age: result.user.age || "",
      role: result.user.role || "",

      gender: result.user.gender || "",
      bloodGroup: result.user.bloodGroup || "",
      address: result.user.address || "",

      specialization:
        result.user.specialization || "",

      department:
        result.user.department || "",
    });

    setEdit(false);

    alert("Profile updated successfully.");
  };

  /* =====================================================
     UPDATE PASSWORD
  ===================================================== */

  const handleUpdatePassword = () => {
    /* ---------------------------------------------------
       BASIC VALIDATION
    --------------------------------------------------- */

    if (
      !passwordData.currentPassword ||
      !passwordData.newPassword ||
      !passwordData.confirmPassword
    ) {
      alert("Please fill all password fields.");
      return;
    }

    /* ---------------------------------------------------
       PASSWORD MATCH
    --------------------------------------------------- */

    if (
      passwordData.newPassword !==
      passwordData.confirmPassword
    ) {
      alert("New passwords do not match.");
      return;
    }

    /* ---------------------------------------------------
       PASSWORD LENGTH
    --------------------------------------------------- */

    if (passwordData.newPassword.length < 6) {
      alert(
        "New password must contain at least 6 characters."
      );
      return;
    }

    /* ---------------------------------------------------
       UPDATE THROUGH AUTH CONTEXT
    --------------------------------------------------- */

    const result = updatePassword(
      passwordData.currentPassword,
      passwordData.newPassword
    );

    /* ---------------------------------------------------
       CHECK RESULT
    --------------------------------------------------- */

    if (!result.success) {
      alert(result.message);
      return;
    }

    /* ---------------------------------------------------
       CLEAR PASSWORD FIELDS
    --------------------------------------------------- */

    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

    alert("Password updated successfully.");
  };

  /* =====================================================
     USER NOT FOUND
  ===================================================== */

  if (!user) {
    return (
      <div className="dashboard">
        <Sidebar />

        <div className="main-content">
          <Navbar />

          <div className="profile-container">
            <h2>My Profile</h2>

            <div className="profile-card">
              <h3>
                No user is currently logged in.
              </h3>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* =====================================================
     RENDER
  ===================================================== */

  return (
    <div className="dashboard">

      {/* =================================================
          SIDEBAR
      ================================================= */}

      <Sidebar />

      {/* =================================================
          MAIN CONTENT
      ================================================= */}

      <div className="main-content">

        <Navbar />

        <div className="profile-container">

          {/* =================================================
              PAGE TITLE
          ================================================= */}

          <h2>My Profile</h2>

          {/* =================================================
              PROFILE CARD
          ================================================= */}

          <div className="profile-card">

            {/* =================================================
                PROFILE IMAGE
            ================================================= */}

            <div className="profile-image">
              👤
            </div>

            {/* =================================================
                PROFILE INFORMATION
            ================================================= */}

            <div className="profile-information">

              <h3>Personal Information</h3>

              {/* =================================================
                  FULL NAME
              ================================================= */}

              <div className="profile-field">

                <label>
                  Full Name
                </label>

                {edit ? (
                  <input
                    type="text"
                    name="name"
                    value={profile.name}
                    onChange={handleChange}
                  />
                ) : (
                  <p>
                    {profile.name ||
                      "Not provided"}
                  </p>
                )}

              </div>

              {/* =================================================
                  EMAIL
              ================================================= */}

              <div className="profile-field">

                <label>
                  Email Address
                </label>

                <p>
                  {profile.email ||
                    "Not provided"}
                </p>

              </div>

              {/* =================================================
                  PHONE
              ================================================= */}

              <div className="profile-field">

                <label>
                  Phone Number
                </label>

                {edit ? (
                  <input
                    type="tel"
                    name="phone"
                    value={profile.phone}
                    onChange={handleChange}
                    maxLength="10"
                  />
                ) : (
                  <p>
                    {profile.phone ||
                      "Not provided"}
                  </p>
                )}

              </div>

              {/* =================================================
                  ROLE
              ================================================= */}

              <div className="profile-field">

                <label>
                  Role
                </label>

                <p className="role-value">
                  {profile.role ||
                    "Not provided"}
                </p>

              </div>

              {/* =================================================
                  AGE
              ================================================= */}

              <div className="profile-field">

                <label>
                  Age
                </label>

                {edit ? (
                  <input
                    type="number"
                    name="age"
                    value={profile.age}
                    onChange={handleChange}
                    min="1"
                    max="120"
                  />
                ) : (
                  <p>
                    {profile.age
                      ? `${profile.age} years`
                      : "Not provided"}
                  </p>
                )}

              </div>

              {/* =================================================
                  PATIENT DETAILS
              ================================================= */}

              {profile.role === "Patient" && (
                <>

                  {/* GENDER */}

                  <div className="profile-field">

                    <label>
                      Gender
                    </label>

                    {edit ? (
                      <select
                        name="gender"
                        value={profile.gender}
                        onChange={handleChange}
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
                    ) : (
                      <p>
                        {profile.gender ||
                          "Not provided"}
                      </p>
                    )}

                  </div>

                  {/* BLOOD GROUP */}

                  <div className="profile-field">

                    <label>
                      Blood Group
                    </label>

                    {edit ? (
                      <select
                        name="bloodGroup"
                        value={profile.bloodGroup}
                        onChange={handleChange}
                      >

                        <option value="">
                          Select blood group
                        </option>

                        <option value="A+">
                          A+
                        </option>

                        <option value="A-">
                          A-
                        </option>

                        <option value="B+">
                          B+
                        </option>

                        <option value="B-">
                          B-
                        </option>

                        <option value="AB+">
                          AB+
                        </option>

                        <option value="AB-">
                          AB-
                        </option>

                        <option value="O+">
                          O+
                        </option>

                        <option value="O-">
                          O-
                        </option>

                      </select>
                    ) : (
                      <p>
                        {profile.bloodGroup ||
                          "Not provided"}
                      </p>
                    )}

                  </div>

                  {/* ADDRESS */}

                  <div className="profile-field">

                    <label>
                      Address
                    </label>

                    {edit ? (
                      <textarea
                        name="address"
                        value={profile.address}
                        onChange={handleChange}
                        rows="3"
                      />
                    ) : (
                      <p>
                        {profile.address ||
                          "Not provided"}
                      </p>
                    )}

                  </div>

                </>
              )}

              {/* =================================================
                  DOCTOR DETAILS
              ================================================= */}

              {profile.role === "Doctor" && (
                <>

                  <div className="profile-field">

                    <label>
                      Specialization
                    </label>

                    <p>
                      {profile.specialization ||
                        "Not provided"}
                    </p>

                  </div>

                  <div className="profile-field">

                    <label>
                      Department
                    </label>

                    <p>
                      {profile.department ||
                        "Not provided"}
                    </p>

                  </div>

                </>
              )}

              {/* =================================================
                  LAB STAFF DETAILS
              ================================================= */}

              {profile.role === "Laboratory Staff" && (

                <div className="profile-field">

                  <label>
                    Laboratory Department
                  </label>

                  <p>
                    {profile.department ||
                      "Not provided"}
                  </p>

                </div>

              )}

              {/* =================================================
                  ADMIN DETAILS
              ================================================= */}

              {profile.role ===
                "Hospital Administrator" && (

                <div className="profile-field">

                  <label>
                    Department
                  </label>

                  <p>
                    {profile.department ||
                      "Administration"}
                  </p>

                </div>

              )}

              {/* =================================================
                  EDIT / SAVE BUTTON
              ================================================= */}

              <button
                className="edit-profile-btn"
                onClick={() => {

                  if (edit) {
                    handleSaveProfile();
                  } else {
                    setEdit(true);
                  }

                }}
              >

                {edit
                  ? "Save Profile"
                  : "Edit Profile"}

              </button>

            </div>

          </div>

          {/* =================================================
              CHANGE PASSWORD
          ================================================= */}

          <div className="password-card">

            <h3>
              Change Password
            </h3>

            <p className="password-description">
              Update your password to keep
              your account secure.
            </p>

            {/* CURRENT PASSWORD */}

            <input
              type="password"
              name="currentPassword"
              placeholder="Current Password"
              value={
                passwordData.currentPassword
              }
              onChange={
                handlePasswordChange
              }
            />

            {/* NEW PASSWORD */}

            <input
              type="password"
              name="newPassword"
              placeholder="New Password"
              value={
                passwordData.newPassword
              }
              onChange={
                handlePasswordChange
              }
            />

            {/* CONFIRM PASSWORD */}

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm New Password"
              value={
                passwordData.confirmPassword
              }
              onChange={
                handlePasswordChange
              }
            />

            {/* UPDATE PASSWORD */}

            <button
              onClick={
                handleUpdatePassword
              }
            >
              Update Password
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Profile;

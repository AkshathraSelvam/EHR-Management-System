
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Login.css";

import doctorBg from "../../assets/ehr-doctor-bg.png";

function Login() {

  const navigate = useNavigate();

  const { login } = useAuth();


  /* =====================================================
     STATES
  ===================================================== */

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");


  /* =====================================================
     ROLE DASHBOARD
  ===================================================== */

  const navigateToDashboard = (selectedRole) => {

    switch (selectedRole) {

      case "Patient":
        navigate("/patient-dashboard");
        break;

      case "Doctor":
        navigate("/doctor-dashboard");
        break;

      case "Hospital Administrator":
        navigate("/admin-dashboard");
        break;

      case "Laboratory Staff":
        navigate("/lab-dashboard");
        break;

      default:
        navigate("/dashboard");
    }
  };


  /* =====================================================
     LOGIN
  ===================================================== */

  const handleLogin = (e) => {

    e.preventDefault();

    setError("");


    /* =================================================
       VALIDATION
    ================================================= */

    if (
      !email.trim() ||
      !password ||
      !role
    ) {

      setError(
        "Please enter email, password and select your role."
      );

      return;
    }


    /* =================================================
       LOGIN
    ================================================= */

    const result =
      login(
        email,
        password,
        role
      );


    /* =================================================
       LOGIN FAILED
    ================================================= */

    if (!result.success) {

      setError(
        result.message ||
        "Invalid email, password or role."
      );

      return;
    }


    /* =================================================
       SUCCESS
    ================================================= */

    navigateToDashboard(
      result.user.role
    );
  };


  /* =====================================================
     UI
  ===================================================== */

  return (

    <div className="login-page">


      {/* =================================================
          BACKGROUND
      ================================================= */}

      <div className="medical-cross cross-one">
        +
      </div>

      <div className="medical-cross cross-two">
        +
      </div>

      <div className="medical-cross cross-three">
        +
      </div>

      <div className="soft-circle circle-one"></div>
      <div className="soft-circle circle-two"></div>
      <div className="soft-circle circle-three"></div>


      {/* =================================================
          NETWORK
      ================================================= */}

      <div className="network">

        <span className="node node-a"></span>
        <span className="node node-b"></span>
        <span className="node node-c"></span>
        <span className="node node-d"></span>

        <span className="network-line line-a"></span>
        <span className="network-line line-b"></span>
        <span className="network-line line-c"></span>

      </div>


      {/* =================================================
          LOGIN FRAME
      ================================================= */}

      <div className="login-frame">


        {/* =================================================
            HERO
        ================================================= */}

        <section className="login-hero">

          <div className="hero-content">

            <div className="brand-section">

              <div className="heart-logo">

                <svg
                  viewBox="0 0 100 100"
                  xmlns="http://www.w3.org/2000/svg"
                >

                  <path
                    d="
                      M50 88
                      C45 83 15 62 15 37
                      C15 22 25 13 38 13
                      C45 13 50 17 50 23
                      C50 17 55 13 62 13
                      C75 13 85 22 85 37
                      C85 62 55 83 50 88Z
                    "
                    fill="currentColor"
                  />

                  <polyline
                    points="
                      22,48
                      34,48
                      39,37
                      45,58
                      51,42
                      56,48
                      78,48
                    "
                    fill="none"
                    stroke="white"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                </svg>

              </div>


              <div className="brand-text">

                <h1>
                  EHRS
                </h1>

                <p>
                  Electronic Healthcare Record
                  <br />
                  Storage System
                </p>

              </div>

            </div>


            <div className="brand-divider"></div>


            <p className="brand-tagline">

              Secure. Connected. Intelligent
              <br />
              Healthcare.

            </p>

          </div>


          <div
            className="doctor-visual"
            style={{
              backgroundImage:
                `url(${doctorBg})`,
            }}
          ></div>

        </section>


        {/* =================================================
            FORM
        ================================================= */}

        <section className="login-form-section">

          <div className="login-card">

            <div className="login-heading">

              <h2>
                Welcome Back
              </h2>

              <p>
                Sign in to your account to continue
              </p>

            </div>


            {error && (
              <div className="login-error">
                {error}
              </div>
            )}


            <form onSubmit={handleLogin}>


              {/* EMAIL */}

              <div className="form-group">

                <label htmlFor="email">
                  Email Address
                </label>

                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                />

              </div>


              {/* PASSWORD */}

              <div className="form-group">

                <label htmlFor="password">
                  Password
                </label>

                <div className="password-wrapper">

                  <input
                    id="password"
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) =>
                      setPassword(e.target.value)
                    }
                  />

                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() =>
                      setShowPassword(
                        !showPassword
                      )
                    }
                  >
                    {showPassword
                      ? "Hide"
                      : "Show"}
                  </button>

                </div>

              </div>


              {/* ROLE */}

              <div className="form-group">

                <label htmlFor="role">
                  Role
                </label>

                <select
                  id="role"
                  value={role}
                  onChange={(e) =>
                    setRole(e.target.value)
                  }
                >

                  <option value="">
                    Select your role
                  </option>

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


              {/* OPTIONS */}

              <div className="login-options">

                <label className="remember-option">

                  <input
                    type="checkbox"
                  />

                  <span>
                    Remember me
                  </span>

                </label>


                <button
                  type="button"
                  className="forgot-password"
                  onClick={() =>
                    navigate(
                      "/forgot-password"
                    )
                  }
                >
                  Forgot Password?
                </button>

              </div>


              {/* LOGIN */}

              <button
                type="submit"
                className="login-button"
              >

                <span className="login-arrow">
                  →
                </span>

                <span>
                  Login
                </span>

              </button>

            </form>


            {/* REGISTER */}

            <div className="register-section">

              <span>
                Don't have an account?
              </span>

              <button
                type="button"
                className="register-button"
                onClick={() =>
                  navigate("/register")
                }
              >
                Create Account
              </button>

            </div>


            {/* SECURITY */}

            <div className="security-footer">

              <div className="security-icon">

                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >

                  <path
                    d="
                      M12 3
                      L20 6
                      V11
                      C20 16.2 16.7 20.1 12 21
                      C7.3 20.1 4 16.2 4 11
                      V6
                      L12 3Z
                    "
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinejoin="round"
                  />

                  <path
                    d="
                      M8.5 12
                      L10.8 14.2
                      L15.5 9.5
                    "
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                </svg>

              </div>

              <strong>
                Your health data is safe with us
              </strong>

            </div>

          </div>

        </section>

      </div>

    </div>
  );
}

export default Login;

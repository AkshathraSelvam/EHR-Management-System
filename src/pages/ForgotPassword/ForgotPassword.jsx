
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ForgotPassword.css";

function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      alert("Please enter your email address.");
      return;
    }

    setSubmitted(true);
  };

  return (
    <div className="forgot-page">
      <div className="forgot-container">

        {/* LEFT SIDE */}
        <div className="forgot-info">
          <div className="forgot-logo">🏥</div>

          <h1>EHR System</h1>

          <h2>Electronic Health Record</h2>

          <p>
            Securely manage patient records, appointments,
            prescriptions and healthcare information.
          </p>
        </div>

        {/* RIGHT SIDE */}
        <div className="forgot-card">

          {!submitted ? (
            <>
              <div className="forgot-icon">🔐</div>

              <h2>Forgot Password?</h2>

              <p className="forgot-subtitle">
                Enter your registered email address and we will
                help you reset your password.
              </p>

              <form onSubmit={handleSubmit}>

                <div className="form-group">
                  <label>Email Address</label>

                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <button
                  type="submit"
                  className="reset-button"
                >
                  Send Reset Link
                </button>

              </form>

              <p className="back-login">
                Remember your password?{" "}
                <span onClick={() => navigate("/")}>
                  Login
                </span>
              </p>
            </>
          ) : (
            <div className="success-message">

              <div className="success-icon">✓</div>

              <h2>Check Your Email</h2>

              <p>
                If an account exists for{" "}
                <strong>{email}</strong>, a password
                reset link has been sent.
              </p>

              <button
                className="reset-button"
                onClick={() => navigate("/")}
              >
                Back to Login
              </button>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;

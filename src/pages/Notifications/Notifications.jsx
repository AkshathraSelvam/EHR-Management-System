
import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import "./Notifications.css";

function Notifications() {
  const { user } = useAuth();

  const currentRole = user?.role || "Hospital Administrator";

  const isPatient = currentRole === "Patient";
  const isDoctor = currentRole === "Doctor";
  const isAdmin = currentRole === "Hospital Administrator";
  const isLabStaff = currentRole === "Laboratory Staff";

  // Only Hospital Administrator can create notifications
  const canCreateNotification = isAdmin;

  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);

  const [notifications, setNotifications] = useState([
    {
      id: "NOT001",
      recipient: "Arun Kumar",
      type: "Appointment",
      message: "Your appointment with Dr. Sharma is confirmed.",
      date: "18 Sep 2026",
      status: "Read",
    },
    {
      id: "NOT002",
      recipient: "Priya Sharma",
      type: "Laboratory Report",
      message: "Your laboratory report is ready for review.",
      date: "18 Sep 2026",
      status: "Unread",
    },
    {
      id: "NOT003",
      recipient: "Dr. Kumar",
      type: "Laboratory Report",
      message: "Laboratory report for Rahul Raj has been completed.",
      date: "17 Sep 2026",
      status: "Read",
    },
    {
      id: "NOT004",
      recipient: "Meena Devi",
      type: "Prescription",
      message:
        "A new prescription has been added to your medical records.",
      date: "16 Sep 2026",
      status: "Unread",
    },
  ]);

  const [formData, setFormData] = useState({
    recipient: "",
    type: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // CREATE NOTIFICATION
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!canCreateNotification) {
      alert(
        "You do not have permission to create notifications."
      );
      return;
    }

    if (
      !formData.recipient ||
      !formData.type ||
      !formData.message
    ) {
      alert("Please fill in all notification details.");
      return;
    }

    const newNotification = {
      id: `NOT00${notifications.length + 1}`,
      recipient: formData.recipient,
      type: formData.type,
      message: formData.message,
      date: "Today",
      status: "Unread",
    };

    setNotifications([
      ...notifications,
      newNotification,
    ]);

    setFormData({
      recipient: "",
      type: "",
      message: "",
    });

    setShowForm(false);

    alert("Notification generated successfully.");
  };

  // MARK NOTIFICATION AS READ
  const markAsRead = (id) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id
          ? {
              ...notification,
              status: "Read",
            }
          : notification
      )
    );
  };

  // SEARCH
  const filteredNotifications = notifications.filter(
    (notification) =>
      notification.recipient
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      notification.type
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      notification.message
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      notification.status
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  // SUMMARY COUNTS
  const unreadCount = notifications.filter(
    (notification) =>
      notification.status === "Unread"
  ).length;

  const readCount = notifications.filter(
    (notification) =>
      notification.status === "Read"
  ).length;

  const appointmentCount = notifications.filter(
    (notification) =>
      notification.type === "Appointment"
  ).length;

  return (
    <div className="notifications-page">

      {/* ============================= */}
      {/* HEADER */}
      {/* ============================= */}

      <div className="notifications-header">

        <div>
          <h1>Notification Management</h1>

          <p>
            Generate, manage and monitor system notifications
          </p>
        </div>

        {/* CREATE BUTTON — ADMIN ONLY */}

        {canCreateNotification && (
          <button
            className="add-notification-btn"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm
              ? "✕ Close Form"
              : "+ Create Notification"}
          </button>
        )}

      </div>


      {/* ============================= */}
      {/* ACCESS LEVEL */}
      {/* ============================= */}

      <div className="notification-role-info">

        <strong>Access Level:</strong> {currentRole}

      </div>


      {/* ============================= */}
      {/* SUMMARY */}
      {/* ============================= */}

      <div className="notification-summary-grid">

        {/* TOTAL */}

        <div className="notification-summary-card">

          <div className="notification-card-icon">
            🔔
          </div>

          <div>
            <h3>Total Notifications</h3>

            <strong>
              {notifications.length}
            </strong>

            <span>
              All notifications
            </span>
          </div>

        </div>


        {/* UNREAD */}

        <div className="notification-summary-card">

          <div className="notification-card-icon">
            📩
          </div>

          <div>
            <h3>Unread</h3>

            <strong>
              {unreadCount}
            </strong>

            <span>
              Unread notifications
            </span>
          </div>

        </div>


        {/* READ */}

        <div className="notification-summary-card">

          <div className="notification-card-icon">
            ✅
          </div>

          <div>
            <h3>Read</h3>

            <strong>
              {readCount}
            </strong>

            <span>
              Read notifications
            </span>
          </div>

        </div>


        {/* APPOINTMENT */}

        <div className="notification-summary-card">

          <div className="notification-card-icon">
            📅
          </div>

          <div>
            <h3>Appointment Alerts</h3>

            <strong>
              {appointmentCount}
            </strong>

            <span>
              Appointment notifications
            </span>
          </div>

        </div>

      </div>


      {/* ============================= */}
      {/* CREATE FORM — ADMIN ONLY */}
      {/* ============================= */}

      {showForm && canCreateNotification && (

        <div className="notification-form-card">

          <h2>
            Create Notification
          </h2>

          <form onSubmit={handleSubmit}>

            <div className="notification-form-grid">

              {/* RECIPIENT */}

              <div className="notification-form-group">

                <label>
                  Recipient
                </label>

                <input
                  type="text"
                  name="recipient"
                  placeholder="Enter recipient name"
                  value={formData.recipient}
                  onChange={handleChange}
                />

              </div>


              {/* TYPE */}

              <div className="notification-form-group">

                <label>
                  Notification Type
                </label>

                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                >

                  <option value="">
                    Select notification type
                  </option>

                  <option value="Appointment">
                    Appointment
                  </option>

                  <option value="Laboratory Report">
                    Laboratory Report
                  </option>

                  <option value="Prescription">
                    Prescription
                  </option>

                  <option value="Medical Record">
                    Medical Record
                  </option>

                  <option value="System">
                    System
                  </option>

                </select>

              </div>

            </div>


            {/* MESSAGE */}

            <div className="notification-form-group notification-message-group">

              <label>
                Message
              </label>

              <textarea
                name="message"
                placeholder="Enter notification message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
              />

            </div>


            {/* FORM BUTTONS */}

            <div className="notification-form-actions">

              <button
                type="button"
                className="cancel-notification-btn"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="save-notification-btn"
              >
                Create Notification
              </button>

            </div>

          </form>

        </div>

      )}


      {/* ============================= */}
      {/* SEARCH */}
      {/* ============================= */}

      <div className="notification-search-section">

        <input
          type="text"
          placeholder="Search by recipient, type, message or status..."
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(e.target.value)
          }
        />

      </div>


      {/* ============================= */}
      {/* TABLE */}
      {/* ============================= */}

      <div className="notification-table-card">

        <div className="notification-table-header">

          <h2>
            Notifications
          </h2>

          <span>
            {filteredNotifications.length} records
          </span>

        </div>


        <div className="notification-table-wrapper">

          <table>

            <thead>

              <tr>

                <th>ID</th>

                <th>Recipient</th>

                <th>Type</th>

                <th>Message</th>

                <th>Date</th>

                <th>Status</th>

                <th>Action</th>

              </tr>

            </thead>


            <tbody>

              {filteredNotifications.length > 0 ? (

                filteredNotifications.map(
                  (notification) => (

                    <tr key={notification.id}>

                      <td>
                        {notification.id}
                      </td>

                      <td>
                        {notification.recipient}
                      </td>

                      <td>

                        <span className="notification-type">
                          {notification.type}
                        </span>

                      </td>

                      <td className="notification-message">

                        {notification.message}

                      </td>

                      <td>
                        {notification.date}
                      </td>

                      <td>

                        <span
                          className={`notification-status ${
                            notification.status === "Read"
                              ? "read"
                              : "unread"
                          }`}
                        >
                          {notification.status}
                        </span>

                      </td>

                      <td>

                        {notification.status === "Unread" ? (

                          <button
                            className="mark-read-btn"
                            onClick={() =>
                              markAsRead(
                                notification.id
                              )
                            }
                          >
                            Mark Read
                          </button>

                        ) : (

                          <span className="read-label">
                            Viewed
                          </span>

                        )}

                      </td>

                    </tr>

                  )
                )

              ) : (

                <tr>

                  <td
                    colSpan="7"
                    className="no-notifications"
                  >
                    No notifications found.
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

export default Notifications;

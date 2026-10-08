
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Sidebar.css";

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const { user, logout } = useAuth();

  // =========================================================
  // CURRENT USER ROLE
  // =========================================================

  const userRole = user?.role || "";

  // =========================================================
  // MENU ITEMS
  // =========================================================

  const menuItems = [
    {
      label: "Dashboard",
      icon: "🏠",
      path: "/dashboard",
      roles: [
        "Patient",
        "Doctor",
        "Hospital Administrator",
        "Laboratory Staff",
      ],
    },

    {
      label: "Patients",
      icon: "👥",
      path: "/patients",
      roles: [
        "Doctor",
        "Hospital Administrator",
        "Laboratory Staff",
      ],
    },

    {
      label: "Doctors",
      icon: "👨‍⚕️",
      path: "/doctors",
      roles: [
        "Patient",
        "Doctor",
        "Hospital Administrator",
        "Laboratory Staff",
      ],
    },

    {
      label: "Appointments",
      icon: "📅",
      path: "/appointments",
      roles: [
        "Patient",
        "Doctor",
        "Hospital Administrator",
      ],
    },

    {
      label: "Medical Records",
      icon: "📁",
      path: "/medical-records",
      roles: [
        "Patient",
        "Doctor",
        "Hospital Administrator",
      ],
    },

    {
      label: "Prescriptions",
      icon: "💊",
      path: "/prescriptions",
      roles: [
        "Patient",
        "Doctor",
        "Hospital Administrator",
      ],
    },

    {
      label: "Laboratory Reports",
      icon: "🧪",
      path: "/laboratory-reports",
      roles: [
        "Patient",
        "Doctor",
        "Hospital Administrator",
        "Laboratory Staff",
      ],
    },

    {
      label: "Notifications",
      icon: "🔔",
      path: "/notifications",
      roles: [
        "Patient",
        "Doctor",
        "Hospital Administrator",
        "Laboratory Staff",
      ],
    },

    {
      label: "AI Analysis",
      icon: "🤖",
      path: "/ai-analysis",
      roles: [
        "Doctor",
        "Hospital Administrator",
      ],
    },

    {
      label: "Reports",
      icon: "📊",
      path: "/reports",
      roles: [
        "Hospital Administrator",
      ],
    },

    {
      label: "Profile",
      icon: "👤",
      path: "/profile",
      roles: [
        "Patient",
        "Doctor",
        "Hospital Administrator",
        "Laboratory Staff",
      ],
    },
  ];

  // =========================================================
  // FILTER MENU ITEMS BASED ON USER ROLE
  // =========================================================

  const visibleMenuItems = menuItems.filter((item) =>
    item.roles.includes(userRole)
  );

  // =========================================================
  // ROLE-BASED DASHBOARD
  // =========================================================

  const handleDashboard = () => {
    if (userRole === "Patient") {
      navigate("/patient-dashboard");
    } else if (userRole === "Doctor") {
      navigate("/doctor-dashboard");
    } else if (userRole === "Hospital Administrator") {
      navigate("/admin-dashboard");
    } else if (userRole === "Laboratory Staff") {
      navigate("/lab-dashboard");
    }
  };

  // =========================================================
  // MENU NAVIGATION
  // =========================================================

  const handleNavigation = (item) => {
    if (item.label === "Dashboard") {
      handleDashboard();
    } else {
      navigate(item.path);
    }
  };

  // =========================================================
  // LOGOUT
  // =========================================================

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // =========================================================
  // SIDEBAR
  // =========================================================

  return (
    <aside className="sidebar">

      {/* =====================================================
          LOGO
      ===================================================== */}

      <div className="sidebar-logo">

        <div className="sidebar-logo-icon">
          🏥
        </div>

        <div>
          <h2>EHR System</h2>

          <span>
            Healthcare Management
          </span>
        </div>

      </div>


      {/* =====================================================
          MENU
      ===================================================== */}

      <nav className="sidebar-menu">

        {visibleMenuItems.map((item) => (

          <button
            key={item.path}
            className={`sidebar-menu-item ${
              location.pathname === item.path
                ? "active"
                : ""
            }`}
            onClick={() => handleNavigation(item)}
          >

            <span className="sidebar-menu-icon">
              {item.icon}
            </span>

            <span className="sidebar-menu-label">
              {item.label}
            </span>

          </button>

        ))}

      </nav>


      {/* =====================================================
          LOGOUT
      ===================================================== */}

      <div className="sidebar-bottom">

        <button
          className="sidebar-logout"
          onClick={handleLogout}
        >

          <span className="sidebar-menu-icon">
            🚪
          </span>

          <span className="sidebar-menu-label">
            Logout
          </span>

        </button>

      </div>

    </aside>
  );
}

export default Sidebar;

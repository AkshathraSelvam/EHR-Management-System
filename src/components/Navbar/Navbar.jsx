import "./navbar.css";
import { useAuth } from "../../context/AuthContext";

function Navbar() {

  const { user } = useAuth();


  const userName =
    user?.name ||
    "User";

  const userRole =
    user?.role ||
    "User";


  const getInitial = () => {

    if (!userName) {
      return "U";
    }

    return userName
      .charAt(0)
      .toUpperCase();

  };


  return (

    <div className="navbar">

      <div className="navbar-title">

        <h2>
          Electronic Health Record System
        </h2>

      </div>


      <div className="navbar-right">

        <button
          className="notification-btn"
          type="button"
        >
          🔔
        </button>


        <div className="profile">

          <div className="avatar">
            {getInitial()}
          </div>


          <div>

            <h4>
              {userName}
            </h4>

            <p>
              {userRole}
            </p>

          </div>

        </div>

      </div>

    </div>

  );

}

export default Navbar;

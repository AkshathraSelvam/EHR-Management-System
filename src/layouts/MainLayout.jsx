
import Sidebar from "../components/Sidebar/Sidebar";
import Navbar from "../components/Navbar/Navbar";

function MainLayout({ children }) {
  return (
    <div className="dashboard">

      <Sidebar />

      <div className="main-content">

        <Navbar />

        {children}

      </div>

    </div>
  );
}

export default MainLayout;

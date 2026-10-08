
import React from "react";

import "./Dashboard.css";

import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";

function Dashboard() {

  return (

    <div className="dashboard">

      <Sidebar />


      <div className="main-content">

        <Navbar />


        {/* =================================================
            HEADER
        ================================================= */}

        <div className="patients-header">

          <div>

            <h2>
              EHR Dashboard
            </h2>

            <p className="page-subtitle">
              Electronic Healthcare Record Management System
            </p>

          </div>

        </div>


        {/* =================================================
            SUMMARY CARDS
        ================================================= */}

        <div className="cards">

          <div className="card">

            <h3>
              Total Patients
            </h3>

            <h2>
              325
            </h2>

            <p>
              Registered Patients
            </p>

          </div>


          <div className="card">

            <h3>
              Doctors
            </h3>

            <h2>
              24
            </h2>

            <p>
              Available Doctors
            </p>

          </div>


          <div className="card">

            <h3>
              Appointments
            </h3>

            <h2>
              105
            </h2>

            <p>
              Today's Appointments
            </p>

          </div>


          <div className="card">

            <h3>
              Medical Records
            </h3>

            <h2>
              490
            </h2>

            <p>
              Stored Records
            </p>

          </div>

        </div>


        {/* =================================================
            RECENT ACTIVITY
        ================================================= */}

        <div className="activity">

          <h2>
            Recent Activities
          </h2>


          <table>

            <thead>

              <tr>

                <th>
                  Patient
                </th>

                <th>
                  Doctor
                </th>

                <th>
                  Department
                </th>

                <th>
                  Status
                </th>

              </tr>

            </thead>


            <tbody>

              <tr>

                <td>
                  John Smith
                </td>

                <td>
                  Dr. David
                </td>

                <td>
                  Cardiology
                </td>

                <td>
                  Completed
                </td>

              </tr>


              <tr>

                <td>
                  Emma Watson
                </td>

                <td>
                  Dr. Sarah
                </td>

                <td>
                  Neurology
                </td>

                <td>
                  Pending
                </td>

              </tr>


              <tr>

                <td>
                  Sophia Brown
                </td>

                <td>
                  Dr. James
                </td>

                <td>
                  Orthopedics
                </td>

                <td>
                  Completed
                </td>

              </tr>


              <tr>

                <td>
                  Michael Lee
                </td>

                <td>
                  Dr. Sarah
                </td>

                <td>
                  Pediatrics
                </td>

                <td>
                  Scheduled
                </td>

              </tr>

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;

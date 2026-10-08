
import React, { useState } from "react";
import "./AIAnalysis.css";

function AIAnalysis() {
  const [selectedPatient, setSelectedPatient] = useState("");
  const [selectedReport, setSelectedReport] = useState("");
  const [analyzed, setAnalyzed] = useState(false);

  const patients = [
    {
      id: "P001",
      name: "Arun Kumar",
    },
    {
      id: "P002",
      name: "Priya Sharma",
    },
    {
      id: "P003",
      name: "Rahul Raj",
    },
    {
      id: "P004",
      name: "Meena Devi",
    },
  ];

  const reports = [
    {
      id: "LAB001",
      patient: "Arun Kumar",
      test: "Complete Blood Count",
      result: "Normal",
      date: "18 Sep 2026",
    },
    {
      id: "LAB002",
      patient: "Priya Sharma",
      test: "Blood Sugar",
      result: "High",
      date: "17 Sep 2026",
    },
    {
      id: "LAB003",
      patient: "Rahul Raj",
      test: "Urine Test",
      result: "Normal",
      date: "17 Sep 2026",
    },
    {
      id: "LAB004",
      patient: "Meena Devi",
      test: "Cholesterol Test",
      result: "Pending",
      date: "16 Sep 2026",
    },
  ];

  const selectedReportData = reports.find(
    (report) => report.id === selectedReport
  );

  const availableReports = selectedPatient
    ? reports.filter(
        (report) => report.patient === selectedPatient
      )
    : [];

  const handlePatientChange = (e) => {
    setSelectedPatient(e.target.value);
    setSelectedReport("");
    setAnalyzed(false);
  };

  const handleReportChange = (e) => {
    setSelectedReport(e.target.value);
    setAnalyzed(false);
  };

  const handleAnalyze = () => {
    if (!selectedPatient || !selectedReport) {
      alert("Please select a patient and laboratory report.");
      return;
    }

    setAnalyzed(true);
  };

  return (
    <div className="ai-analysis-page">

      {/* HEADER */}

      <div className="ai-analysis-header">
        <div>
          <h1>AI Medical Report Analysis</h1>
          <p>
            Analyze laboratory reports and generate AI-based
            health summaries
          </p>
        </div>

        <div className="ai-header-icon">
          🤖
        </div>
      </div>


      {/* INFORMATION */}

      <div className="ai-info-card">

        <div className="ai-info-icon">
          💡
        </div>

        <div>
          <h3>AI-Powered Medical Analysis</h3>

          <p>
            The system analyzes laboratory report information
            and provides a summarized interpretation,
            abnormality detection and health insights.
          </p>
        </div>

      </div>


      {/* SELECTION */}

      <div className="ai-selection-card">

        <h2>Select Medical Report</h2>

        <div className="ai-selection-grid">

          <div className="ai-form-group">

            <label>Patient</label>

            <select
              value={selectedPatient}
              onChange={handlePatientChange}
            >
              <option value="">
                Select patient
              </option>

              {patients.map((patient) => (
                <option
                  key={patient.id}
                  value={patient.name}
                >
                  {patient.name}
                </option>
              ))}
            </select>

          </div>


          <div className="ai-form-group">

            <label>Laboratory Report</label>

            <select
              value={selectedReport}
              onChange={handleReportChange}
              disabled={!selectedPatient}
            >
              <option value="">
                Select laboratory report
              </option>

              {availableReports.map((report) => (
                <option
                  key={report.id}
                  value={report.id}
                >
                  {report.test} - {report.date}
                </option>
              ))}

            </select>

          </div>

        </div>


        {/* SELECTED REPORT */}

        {selectedReportData && (
          <div className="selected-report">

            <div>
              <span>Report ID</span>
              <strong>{selectedReportData.id}</strong>
            </div>

            <div>
              <span>Patient</span>
              <strong>{selectedReportData.patient}</strong>
            </div>

            <div>
              <span>Test</span>
              <strong>{selectedReportData.test}</strong>
            </div>

            <div>
              <span>Date</span>
              <strong>{selectedReportData.date}</strong>
            </div>

            <div>
              <span>Result</span>

              <strong
                className={
                  selectedReportData.result === "High"
                    ? "ai-result-high"
                    : selectedReportData.result === "Pending"
                    ? "ai-result-pending"
                    : "ai-result-normal"
                }
              >
                {selectedReportData.result}
              </strong>
            </div>

          </div>
        )}


        <div className="ai-analyze-button-container">

          <button
            className="ai-analyze-btn"
            onClick={handleAnalyze}
          >
            🤖 Analyze Report
          </button>

        </div>

      </div>


      {/* ANALYSIS RESULT */}

      {analyzed && (
        <div className="ai-results-section">

          <div className="ai-result-header">
            <div>
              <h2>AI Analysis Result</h2>
              <p>
                Analysis generated for{" "}
                <strong>
                  {selectedReportData.patient}
                </strong>
              </p>
            </div>

            <span className="ai-completed-badge">
              ✓ Analysis Completed
            </span>
          </div>


          {/* HEALTH SUMMARY */}

          <div className="ai-summary-card">

            <div className="ai-summary-icon">
              🧠
            </div>

            <div>
              <h3>AI Health Summary</h3>

              {selectedReportData.result === "High" ? (
                <p>
                  The laboratory report indicates an
                  elevated test result. Further clinical
                  evaluation is recommended by the doctor.
                  The result should be reviewed together
                  with the patient's medical history and
                  other clinical information.
                </p>
              ) : selectedReportData.result === "Pending" ? (
                <p>
                  The laboratory report is currently
                  pending. AI analysis will be available
                  after the laboratory result has been
                  completed.
                </p>
              ) : (
                <p>
                  The laboratory report does not indicate
                  any abnormal result based on the available
                  information. The report can be reviewed
                  along with the patient's medical history
                  for a complete assessment.
                </p>
              )}

            </div>

          </div>


          {/* FINDINGS */}

          <div className="ai-findings-grid">

            <div className="ai-finding-card">

              <div className="ai-finding-icon">
                🔍
              </div>

              <h3>Detected Findings</h3>

              <p>
                {selectedReportData.result === "High"
                  ? "Elevated laboratory value detected."
                  : selectedReportData.result === "Pending"
                  ? "No final result available."
                  : "No significant abnormality detected."}
              </p>

            </div>


            <div className="ai-finding-card">

              <div className="ai-finding-icon">
                ❤️
              </div>

              <h3>Health Status</h3>

              <p>
                {selectedReportData.result === "High"
                  ? "Requires medical review"
                  : selectedReportData.result === "Pending"
                  ? "Awaiting laboratory result"
                  : "No immediate abnormality"}
              </p>

            </div>


            <div className="ai-finding-card">

              <div className="ai-finding-icon">
                📊
              </div>

              <h3>Analysis Confidence</h3>

              <p>
                Based on available laboratory information
              </p>

              <div className="confidence-bar">
                <div className="confidence-progress"></div>
              </div>

              <span className="confidence-text">
                85% confidence
              </span>

            </div>

          </div>


          {/* RECOMMENDATIONS */}

          <div className="ai-recommendation-card">

            <h2>AI Recommendations</h2>

            <ul>

              {selectedReportData.result === "High" ? (
                <>
                  <li>
                    Review the abnormal laboratory result
                    with the treating doctor.
                  </li>

                  <li>
                    Compare the result with previous
                    laboratory reports.
                  </li>

                  <li>
                    Consider additional clinical evaluation
                    if recommended by the doctor.
                  </li>
                </>
              ) : selectedReportData.result === "Pending" ? (
                <li>
                  Wait for the laboratory report to be
                  completed before performing analysis.
                </li>
              ) : (
                <>
                  <li>
                    Continue routine healthcare monitoring.
                  </li>

                  <li>
                    Maintain regular medical check-ups.
                  </li>

                  <li>
                    Review future laboratory reports for
                    changes or trends.
                  </li>
                </>
              )}

            </ul>

          </div>


          <div className="ai-disclaimer">
            <strong>Note:</strong> AI analysis is intended
            to support healthcare professionals and should
            not replace professional medical diagnosis or
            treatment decisions.
          </div>

        </div>
      )}

    </div>
  );
}

export default AIAnalysis;

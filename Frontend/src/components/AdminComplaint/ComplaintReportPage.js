import React, { useEffect, useState } from "react";
import axios from "axios";
import Nav from "../Nav2/Nav2";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import "./ComplaintReportPage.css";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { sinhalafont } from "./sinhalafont";

const ComplaintReportPage = () => {
  const [complaints, setComplaints] = useState([]);
  const [categoryCounts, setCategoryCounts] = useState({});
  const [summary, setSummary] = useState({
    total: 0,
    resolved: 0,
    unresolved: 0,
    mostCommonCategory: "",
  });

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const res = await axios.get("http://localhost:8070/complaint");
        if (res.data && Array.isArray(res.data.complaints)) {
          const data = res.data.complaints;
          setComplaints(data);
          analyzeComplaints(data);
        }
      } catch (error) {
        console.error("Error fetching complaints:", error);
      }
    };
    fetchComplaints();
  }, []);

  const handleDownloadPDFReport = () => {
    const doc = new jsPDF();

    // Add Sinhala font to jsPDF
    doc.addFileToVFS("NotoSansSinhala-Regular.ttf", sinhalafont); // Add your font
    doc.addFont("NotoSansSinhala-Regular.ttf", "NotoSansSinhala", "normal");

    // Set font to Sinhala font
    doc.setFont("NotoSansSinhala", "normal");

    // Title of the document
    doc.setFontSize(18);
    doc.text("Complaint Report", 14, 22);

    // Adding Summary Info (with fallback for 0 counts)
    doc.setFontSize(12);
    doc.text(`Total Complaints: ${summary.total || 0}`, 14, 30); // Default to 0 if no data
    doc.text(`Resolved Complaints: ${summary.resolved || 0}`, 14, 36); // Default to 0 if no data
    doc.text(`Unresolved Complaints: ${summary.unresolved || 0}`, 14, 42); // Default to 0 if no data
    doc.text(
      `Most Common Category: ${summary.mostCommonCategory || "No Data"}`,
      14,
      48
    ); // Default to "No Data"

    // Add a little space between the summary and the table
    doc.line(14, 50, 200, 50); // Add a line separator
    doc.text("Complaint Details:", 14, 55);

    // Table headers and data
    const tableColumn = [
      "ID Number",
      "Name",
      "Email",
      "User Type",
      "Complaint",
      "Response",
      "Status",
    ];
    const tableRows = [];

    complaints.forEach((complaint) => {
      const complaintData = [
        complaint.idNo,
        complaint.name,
        complaint.email,
        complaint.userType,
        complaint.description,
        complaint.reply || "Pending response", // Default if no response
        complaint.status || "Pending", // Default if no status
      ];
      tableRows.push(complaintData);
    });

    // Adding the table to the PDF
    autoTable(doc, {
      startY: 60, // Start below the summary
      head: [tableColumn],
      body: tableRows,
      styles: { fontSize: 9 },
      headStyles: { fillColor: [41, 128, 185] },
    });

    // Save the PDF file
    doc.save(`Complaint_Report_${Date.now()}.pdf`);

    // Send WhatsApp message after downloading
    sendWhatsAppMessage();
  };

  const analyzeComplaints = (data) => {
    const categoryMap = {};
    let resolved = 0;
    let unresolved = 0;

    data.forEach((c) => {
      const category = c.description?.toLowerCase().includes("food")
        ? "Food Quality"
        : c.description?.toLowerCase().includes("delivery")
        ? "Late Delivery"
        : "Other";

      categoryMap[category] = (categoryMap[category] || 0) + 1;

      if (c.status?.toLowerCase() === "resolved") resolved++;
      else unresolved++;
    });

    const mostCommon = Object.keys(categoryMap).reduce(
      (a, b) => (categoryMap[a] > categoryMap[b] ? a : b),
      "None"
    );

    setCategoryCounts(categoryMap);
    setSummary({
      total: data.length,
      resolved,
      unresolved,
      mostCommonCategory: mostCommon,
    });
  };

  const chartData = Object.keys(categoryCounts).map((key) => ({
    name: key,
    value: categoryCounts[key],
  }));

  const sendWhatsAppMessage = () => {
    const message = encodeURIComponent(
      "Complaint report has been downloaded successfully."
    );
    const phoneNumber = "94741704456";
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  };

  return (
    <div className="complaint-report-page">
      <Nav />
      <div className="complaint-report-content">
        <div className="report-container">
          <h2>Complaint Report Summary</h2>

          <div className="summary-cards">
            <div className="card">Total Complaints: {summary.total}</div>
            <div className="card">Resolved: {summary.resolved}</div>
            <div className="card">Unresolved: {summary.unresolved}</div>
            <div className="card">
              Most Common Category: {summary.mostCommonCategory}
            </div>
          </div>

          <h3>Complaint Details</h3>
          <table className="report-table">
            <thead>
              <tr>
                <th>ID No</th>
                <th>Name</th>
                <th>Email</th>
                <th>User Type</th>
                <th>Description</th>
                <th>Reply</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {complaints.map((c, i) => (
                <tr key={i}>
                  <td>{c.idNo}</td>
                  <td>{c.name}</td>
                  <td>{c.email}</td>
                  <td>{c.userType}</td>
                  <td>{c.description}</td>
                  <td>{c.reply || "-"}</td>
                  <td>{c.status || "Pending"}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="charts">
            <div className="chart-container">
              <h4>Number of Complaints by Category</h4>
              <BarChart
                width={550}
                height={350}
                data={chartData}
                margin={{ top: 20, right: 30, left: 60, bottom: 70 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="name"
                  angle={-35}
                  textAnchor="end"
                  interval={0}
                  height={60}
                  label={{
                    value: "Complaint Category",
                    position: "bottom",
                    offset: 40,
                  }}
                />
                <YAxis
                  allowDecimals={false}
                  label={{
                    value: "Number of Complaints",
                    angle: -90,
                    position: "insideLeft",
                    offset: 20,
                  }}
                />
                <Tooltip />
                <Legend verticalAlign="top" height={36} />
                <Bar dataKey="value" name="No. of Complaints" fill="#8884d8" />
              </BarChart>
            </div>

            <div className="chart-container">
              <h4>Complaint Category Distribution</h4>
              <PieChart width={400} height={350}>
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={120}
                  fill="#82ca9d"
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50"][index % 4]
                      }
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend
                  layout="horizontal"
                  verticalAlign="bottom"
                  align="center"
                />
              </PieChart>
            </div>
          </div>

          <div>
            <button className="download-btn" onClick={handleDownloadPDFReport}>
              Download Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplaintReportPage;
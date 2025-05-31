import React, { useEffect, useState } from "react";
import Nav from "../Nav/Nav";
import axios from "axios";
import DisplayConsumption from "./DisplayConsumption";
import { Link } from "react-router-dom";
import "./displayConsumption.css";

const URL = "http://localhost:8070/consumption";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

function Consumption() {
  const [consumption, setConsumption] = useState([]);

  useEffect(() => {
    fetchHandler().then((data) => setConsumption(data.consumption || []));
  }, []);

  const sendWhatsAppMessage = () => {
    const message = encodeURIComponent("Daily Consumption report has been downloaded successfully.");
    const phoneNumber = "94711119658";
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  };

  const handleDownloadCSVReport = () => {
    if (!consumption || consumption.length === 0) {
      alert("No daily consumption data available to generate the report.");
      return;
    }

    try {
      const headers = [
        "Consumption ID",
        "Date of Consumption",
        "Meal Type",
        "Ingredient Name",
        "Quantity Used",
        "Unit",
        "Notes",
      ];

      const rows = consumption.map((item) => [
        item.consumptionID,
        new Date(item.dateOfConsumption).toLocaleDateString(),
        item.mealType,
        item.ingredientName,
        item.quantityUsed,
        item.unit,
        item.notes || "",
      ]);

      const csvContent =
        "data:text/csv;charset=utf-8," +
        headers.join(",") +
        "\n" +
        rows.map((e) => e.join(",")).join("\n");

      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      const fileName = `Daily_Consumption_Report_${new Date()
        .toISOString()
        .split("T")[0]}.csv`;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      sendWhatsAppMessage();
    } catch (error) {
      console.error("Error generating Daily Consumption CSV:", error);
      alert("An error occurred while generating the CSV.");
    }
  };

  return (
    <div className="consumption-page-container">
      <Nav />
      <header className="consumption-header">
        <h1>Logging Daily Ingredient Consumption</h1>
      </header>

      <div className="consumption-actions">
        <Link to="/addConsumption" className="consumption-btn consumption-add-btn">
          Add New Consumption
        </Link>
        <button
          className="consumption-btn consumption-download-btn"
          onClick={handleDownloadCSVReport}
          disabled={consumption.length === 0}
        >
          Download Daily Consumption Report
        </button>
      </div>

      <div className="consumption-table-container">
        <table className="consumption-table">
          <thead>
            <tr>
              <th>Consumption ID</th>
              <th>Date of Consumption</th>
              <th>Meal Type</th>
              <th>Ingredient Name</th>
              <th>Quantity Used</th>
              <th>Unit</th>
              <th>Notes</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {consumption.map((item, i) => (
              <DisplayConsumption key={item._id || i} consumption={item} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Consumption;
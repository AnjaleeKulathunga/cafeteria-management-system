import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import DisplayWaste from "./DisplayWaste";
import Nav from "../Nav/Nav";
import { Link } from "react-router-dom";
import "./DisplayWaste.css";

const URL = "http://localhost:8070/waste";

const fetchHandler = async () => {
  try {
    const res = await axios.get(URL);
    return res.data;
  } catch (error) {
    console.error("Error fetching waste data:", error);
    return { waste: [] };
  }
};

function Waste() {
  const [waste, setWaste] = useState([]);
  const componentsRef = useRef();

  useEffect(() => {
    fetchHandler().then((data) => {
      setWaste(data.waste || []);
    });
  }, []);

  const sendWhatsAppMessage = () => {
    const message = encodeURIComponent("Wastage report has been downloaded successfully.");
    const phoneNumber = "94711119658"; // Replace as needed
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  };

  const handleDownloadCSVReport = () => {
    if (!waste || waste.length === 0) {
      alert("No wastage data available to generate the report.");
      return;
    }

    try {
      const headers = [
        "Loss ID",
        "Loss Type",
        "Meal Name",
        "Meal Time",
        "Wastage Quantity",
        "Unit",
        "Category",
        "Date of Wastage",
        "Estimated Cost",
        "Notes"
      ];

      const rows = waste.map(item => [
        item.lossID,
        item.lossType,
        item.mealName,
        item.mealTime,
        item.wQuantity,
        item.unit,
        item.category,
        new Date(item.dateOfWastage).toLocaleDateString(),
        item.estimatedCost != null ? item.estimatedCost : "",
        item.notes || ""
      ]);

      const csvContent = "data:text/csv;charset=utf-8,"
        + headers.join(",") + "\n"
        + rows.map(e => e.join(",")).join("\n");

      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      const fileName = `Wastage_Report_${new Date().toISOString().split("T")[0]}.csv`;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      sendWhatsAppMessage();
    } catch (error) {
      console.error("Error generating Wastage CSV:", error);
      alert("An error occurred while generating the CSV.");
    }
  };

  return (
    <div className="waste-container">
      <Nav />
      <div className="waste-content">
        <h1 className="waste-title">Leftover and Wastage Tracking</h1>

        <div className="waste-actions">
          <Link to="/addWaste" className="waste-add-btn">Add Wastage</Link>
        </div>

        <div ref={componentsRef}>
          <DisplayWaste wasteList={waste} />
        </div>

        <button
          className="waste-download-btn"
          onClick={handleDownloadCSVReport}
          disabled={waste.length === 0}
        >
          Download Wastage Report
        </button>
      </div>
    </div>
  );
}

export default Waste;
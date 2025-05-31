import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import DisplayInventory from "./DisplayInventory/DisplayInventory.js";
import Nav from "./Nav/Nav.js";
import "./inven.css"
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";

const URL = "http://localhost:8070/inventory";

const fetchHandler = async () => {
  try {
    const res = await axios.get(URL);
    return res.data;
  } catch (error) {
    console.error("Error fetching inventory:", error);
    return { inventory: [] };
  }
};

function Inven() {
  const [inventory, setInventory] = useState([]);
  const ComponentsRef = useRef();

  useEffect(() => {
    fetchHandler().then((data) => {
      setInventory(data.inventory || []);
    });
  }, []);

  const sendWhatsAppMessage = () => {
    const message = encodeURIComponent(
      "Inventory report has been downloaded successfully."
    );
    const phoneNumber = "94711119658"; // Replace with desired number
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  };

  const handleDownloadCSVReport = () => {
    if (!inventory || inventory.length === 0) {
      alert("No inventory data available to generate the report.");
      return;
    }

    try {
      const headers = [
        "Product ID",
        "Product Name",
        "Product Type",
        "Quantity",
        "Status",
      ];
      const rows = inventory.map((item) => [
        item.productID,
        item.productName,
        item.productType,
        item.cQuantity,
        item.productStatus,
      ]);

      let csvContent =
        "data:text/csv;charset=utf-8," +
        headers.join(",") +
        "\n" +
        rows.map((e) => e.join(",")).join("\n");

      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      const fileName = `Inventory_Report_${
        new Date().toISOString().split("T")[0]
      }.csv`;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      sendWhatsAppMessage(); // notify via WhatsApp
    } catch (error) {
      console.error("Error generating CSV:", error);
      alert("An error occurred while generating the CSV.");
    }
  };

  return (
    <div className="inven-page-container">
      <Nav />
      <div className="inven-header">
        <h1>Inventory Management</h1>
      </div>

      <div className="inven-actions">
        <Link to="/addProduct" className="inven-btn inven-add-btn">
          Add Product
        </Link>
        <button
          className="inven-btn inven-download-btn"
          onClick={handleDownloadCSVReport}
          disabled={inventory.length === 0}
        >
          Download Inventory Report
        </button>
      </div>

      <div ref={ComponentsRef}>
        <DisplayInventory inventoryList={inventory} />
      </div>
    </div>
  );
}

export default Inven;
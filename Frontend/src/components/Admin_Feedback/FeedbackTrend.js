import React, { useState, useEffect } from "react";
import axios from "axios";
import Nav from "../Nav2/Nav2";
import "./FeedbackTrend.css";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import {
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const URL = "http://localhost:8070/review";

const FeedbackTrends = () => {
  const [feedbackData, setFeedbackData] = useState([]);
  const [summary, setSummary] = useState({
    total: 0,
    average: 0,
    highest: 0,
    lowest: 0,
    mostFrequent: 0,
  });
  const [ratingDistribution, setRatingDistribution] = useState([]);
  const [ratingsOverTime, setRatingsOverTime] = useState([]);

  useEffect(() => {
    axios
      .get(URL)
      .then((res) => {
        const data = res.data.review;
        setFeedbackData(data);

        if (data.length > 0) {
          // === Summary Calculations ===
          const ratings = data.map((fb) => fb.rating);
          const total = ratings.length;
          const average = (ratings.reduce((a, b) => a + b, 0) / total).toFixed(
            2
          );
          const highest = Math.max(...ratings);
          const lowest = Math.min(...ratings);
          const frequency = {};
          ratings.forEach((r) => {
            frequency[r] = (frequency[r] || 0) + 1;
          });
          const mostFrequent = Object.keys(frequency).reduce((a, b) =>
            frequency[a] > frequency[b] ? a : b
          );
          setSummary({ total, average, highest, lowest, mostFrequent });

          // === Rating Distribution (Bar Chart) ===
          const dist = [1, 2, 3, 4, 5].map((r) => ({
            rating: r,
            count: ratings.filter((val) => val === r).length,
          }));
          setRatingDistribution(dist);

          // === Ratings Over Time (Line Chart) ===
          const dateMap = {};
          data.forEach((fb) => {
            const date = new Date(fb.date).toLocaleDateString(); // Format date
            if (!dateMap[date]) {
              dateMap[date] = { total: 0, count: 0 };
            }
            dateMap[date].total += fb.rating;
            dateMap[date].count += 1;
          });

          const timeSeries = Object.keys(dateMap)
            .sort()
            .map((date) => ({
              date,
              average: (dateMap[date].total / dateMap[date].count).toFixed(2),
            }));
          setRatingsOverTime(timeSeries);
        }
      })
      .catch((err) => console.error("Error fetching feedback data:", err));
  }, []);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AA00FF"];

  const generatePDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Feedback Report", 14, 22);
    doc.setFontSize(12);
    doc.text(`Total Feedbacks: ${summary.total}`, 14, 32);
    doc.text(`Average Rating: ${summary.average}`, 14, 40);
    doc.text(`Highest Rating: ${summary.highest}`, 14, 48);
    doc.text(`Lowest Rating: ${summary.lowest}`, 14, 56);
    doc.text(`Most Frequent Rating: ${summary.mostFrequent}`, 14, 64);

    const tableColumn = ["Name", "Email", "Feedback", "Rating", "Date"];
    const tableRows = feedbackData.map((feedback) => [
      feedback.name,
      feedback.email,
      feedback.description,
      feedback.rating,
      new Date(feedback.date).toLocaleDateString(),
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 72,
    });

    doc.save("feedback-report.pdf");

    // Send WhatsApp Message
    sendWhatsAppMessage();
  };

  const sendWhatsAppMessage = () => {
    const message = encodeURIComponent(
      "Feedback report has been downloaded successfully."
    );
    const phoneNumber = "94741704456";
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  };

  return (
    <div>
      <Nav />
      <div className="fbtr-container">
        <h3 className="fbtr-heading">Feedback Summary</h3>

        <div className="fbtr-summary-container">
          <div className="fbtr-card">Total Feedback: {summary.total}</div>
          <div className="fbtr-card">Average Rating: {summary.average}</div>
          <div className="fbtr-card">Highest Rating: {summary.highest}</div>
          <div className="fbtr-card">Lowest Rating: {summary.lowest}</div>
          <div className="fbtr-card">
            Most Frequent Rating: {summary.mostFrequent}
          </div>
        </div>

        <div className="fbtr-table-container">
          <div style={{ textAlign: "right", marginBottom: "20px" }}>
            <button
              onClick={generatePDF}
              className="fbtr-download-btn"
            >
              Download Report
            </button>
          </div>
          {feedbackData.length > 0 ? (
            <table className="fbtr-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Feedback</th>
                  <th>Rating</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {feedbackData.map((data, index) => (
                  <tr key={index}>
                    <td>{data.name}</td>
                    <td>{data.email}</td>
                    <td>{data.description}</td>
                    <td>{data.rating}</td>
                    <td>{new Date(data.date).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No feedback data available.</p>
          )}
        </div>

        <div className="fbtr-chart-container">
          <div className="fbtr-chart-box">
            <h4>Rating Distribution (Pie Chart)</h4>
            <ResponsiveContainer width="100%" height="85%">
              <PieChart>
                <Pie
                  data={ratingDistribution}
                  dataKey="count"
                  nameKey="rating"
                  cx="50%"
                  cy="50%"
                  outerRadius={120}
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {ratingDistribution.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend
                  layout="vertical"
                  align="right"
                  verticalAlign="middle"
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="fbtr-chart-box">
            <h4>Ratings Over Time</h4>
            <ResponsiveContainer width="100%" height="85%">
              <LineChart data={ratingsOverTime}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis domain={[1, 5]} />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="average"
                  stroke="#e1b800"
                  name="Avg Rating"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackTrends;
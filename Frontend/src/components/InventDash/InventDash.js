import React, { useState, useEffect } from "react";
import Chart from "chart.js/auto";
import io from "socket.io-client";
import axios from "axios";
import Nav from "../Nav2/Nav2"
import "./inventDash.css";
import { assets } from '../../assets/assets';
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import FlatwareOutlinedIcon from "@mui/icons-material/FlatwareOutlined";
import DeleteSweepOutlinedIcon from "@mui/icons-material/DeleteSweepOutlined";
import ScienceOutlinedIcon from "@mui/icons-material/ScienceOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

// ChangingProgressProvider Component
class ChangingProgressProvider extends React.Component {
  static defaultProps = { interval: 1000 };
  state = { valuesIndex: 0 };

  componentDidMount() {
    setInterval(() => {
      this.setState({
        valuesIndex: (this.state.valuesIndex + 1) % this.props.values.length,
      });
    }, this.props.interval);
  }

  render() {
    return this.props.children(this.props.values[this.state.valuesIndex]);
  }
}

// Widget Component
const Widget = ({ type, amount, diff }) => {
  let data;
  switch (type) {
    case "inventory":
      data = {
        title: "INVENTORY",
        isMoney: false,
        link: "View Stock Details",
        route: "/displayInventory",
        icon: (
          <Inventory2OutlinedIcon
            className="icon"
            style={{ color: "green", backgroundColor: "#8edb7c" }}
          />
        ),
      };
      break;
    case "daily":
      data = {
        title: "DAILY CONSUMPTION",
        isMoney: false,
        link: "View Consumption",
        route: "/displayBegin",
        icon: (
          <FlatwareOutlinedIcon
            className="icon"
            style={{ color: "#ffa800", backgroundColor: "#eff59b" }}
          />
        ),
      };
      break;
    case "leftover":
      data = {
        title: "LEFTOVERS AND WASTAGE",
        isMoney: false,
        link: "See Details",
        route: "/displayFirst",
        icon: (
          <DeleteSweepOutlinedIcon
            className="icon"
            style={{ color: "#705208", backgroundColor: "#c9b176" }}
          />
        ),
      };
      break;
    case "request":
      data = {
        title: "REQUEST INGREDIENTS",
        isMoney: false,
        link: "View Requests",
        route: "/displayOne",
        icon: (
          <ScienceOutlinedIcon
            className="icon"
            style={{ color: "darkblue", backgroundColor: "#B6D0E2" }}
          />
        ),
      };
      break;
    case "sellers":
      data = {
        title: "SELLERS",
        isMoney: false,
        link: "View Sellers",
        route: "/sellers",
        icon: (
          <PeopleOutlinedIcon
            className="icon"
            style={{ color: "purple", backgroundColor: "#d8bfd8" }}
          />
        ),
      };
      break;
    default:
      data = {};
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {data.isMoney && "$"}
          {amount}
        </span>
        <a href={data.route} className="link">
          {data.link}
        </a>
      </div>
      <div className="right">
        <div className={`percentage ${diff >= 0 ? "positive" : "negative"}`}>
          {diff >= 0 ? (
            <KeyboardArrowUpOutlinedIcon />
          ) : (
            <KeyboardArrowDownOutlinedIcon />
          )}
          {Math.abs(diff)}%
        </div>
        {data.icon}
      </div>
    </div>
  );
};

// Featured (Stock Levels) Component
const Featured = ({ stockData }) => {
  const canvasRef = React.useRef(null);
  const chartRef = React.useRef(null);

  React.useEffect(() => {
    if (canvasRef.current) {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
      chartRef.current = new Chart(canvasRef.current, {
        type: "bar",
        data: {
          labels: stockData.labels,
          datasets: [
            {
              label: "Remaining Quantity",
              data: stockData.quantities,
              backgroundColor: "rgba(75, 192, 192, 0.5)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: { position: "top" },
            title: { display: true, text: "Stock Levels by Ingredient" },
          },
          scales: {
            y: {
              beginAtZero: true,
              title: { display: true, text: "Quantity (kg/units)" },
            },
            x: { title: { display: true, text: "Ingredient" } },
          },
        },
      });
    }
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [stockData]);

  return (
    <div className="featured">
      <div className="top">
        <h1 className="title">STOCK LEVELS</h1>
        <MoreVertOutlinedIcon fontSize="small" />
      </div>
      <div className="bottom">
        <div className="featured-content">
          <div className="progress-section">
            <div className="featuredChart">
              <ChangingProgressProvider
                values={[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
              >
                {(percentage) => (
                  <CircularProgressbar
                    value={percentage}
                    text={`${percentage}%`}
                    styles={buildStyles({
                      pathTransitionDuration: 1,
                      trailColor: "#82ca9d",
                      pathColor: "#210876",
                      textColor: "#210876",
                    })}
                  />
                )}
              </ChangingProgressProvider>
            </div>
            <p className="progress-title">Overall Stock Capacity</p>
            {/* <p className="progress-amount">85% of Total Capacity</p> */}
          </div>
          <div className="bar-chart-section">
            <canvas ref={canvasRef}></canvas>
          </div>
        </div>
        <p className="desc">
          Remaining quantities of key ingredients in stock.
        </p>
        <div className="button-row">
          <a href="/displayInventory" className="chart-button">
            View Inventory
          </a>
          <a href="/displayOne" className="chart-button">
            Request Ingredients
          </a>
        </div>
      </div>
    </div>
  );
};

// Inventory Chart Component
const InventoryChart = ({ title, data, link }) => {
  const canvasRef = React.useRef(null);
  const chartRef = React.useRef(null);

  React.useEffect(() => {
    if (canvasRef.current) {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
      chartRef.current = new Chart(canvasRef.current, {
        type: "line",
        data: {
          labels: data.labels,
          datasets: [
            {
              label: title,
              data: data.values,
              borderColor: "#1e90ff",
              backgroundColor: "rgba(30, 144, 255, 0.2)",
              fill: true,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: { position: "top" },
            title: { display: true, text: title },
          },
        },
      });
    }
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [data, title]);

  return (
    <div className="chart-card">
      <canvas ref={canvasRef}></canvas>
      <a href={link} className="chart-button">
        View Full Details
      </a>
    </div>
  );
};

// Sellers List Component (Chat-like)
// Equipment List Component (Chat-like)
const EquipmentList = () => {
  const equipment = [
    {
      id: 1,
      name: "Refrigerator",
      status: "Operational",
      image: assets.fridge,
      lastChecked: "2025-05-10",
    },
    {
      id: 2,
      name: "Oven",
      status: "Under Maintenance",
      image: assets.oven,
      lastChecked: "2025-05-08",
    },
    {
      id: 3,
      name: "Mixer",
      status: "Operational",
      image: assets.mixer,
      lastChecked: "2025-05-11",
    },
    {
      id: 4,
      name: "Freezer",
      status: "Out of Order",
      image: assets.freezer,
      lastChecked: "2025-05-09",
    },
  ];

  return (
    <div className="list-card">
      <h2 className="list-title">Equipment</h2>
      <div className="chat-list">
        {equipment.map((item) => (
          <div key={item.id} className="chat-item">
            <img src={item.image} alt={item.name} className="chat-image" />
            <div className="chat-info">
              <span className="chat-name">{item.name}</span>
              <span className="chat-contact">
                Last Checked: {item.lastChecked}
              </span>
              <span
                className={`chat-condition ${item.status
                  .toLowerCase()
                  .replace(/\s/g, '-')}`}
              >
                {item.status}
              </span>
            </div>
            <MoreVertOutlinedIcon className="chat-options" />
          </div>
        ))}
      </div>
    </div>
  );
};

// Request Ingredients List Component
const RequestIngredientsList = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    // Fetch initial requests
    axios
      .get("http://localhost:8070/ingredient/requests")
      .then((response) => {
        setRequests(response.data);
      })
      .catch((error) => console.error("Error fetching requests:", error));

    // Setup Socket.IO for real-time updates
    const socket = io("http://localhost:8070");
    socket.on("requestsUpdate", (updatedRequests) => {
      setRequests(updatedRequests);
    });

    return () => socket.disconnect();
  }, []);

  return (
    <div className="list-card">
      <h2 className="list-title">Request Ingredients</h2>
      <table className="list-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Condition</th>
            <th>Last Request</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td
                className={`equipment-condition ${item.condition.toLowerCase()}`}
              >
                {item.condition}
              </td>
              <td>{item.lastRequest}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Main InventDash Component
const InventDash = () => {
  const [inventoryData, setInventoryData] = useState({
    inventory: 0,
    leftover: 0,
    daily: 0,
    // request: 0,
    // sellers: 0,
  });

  const [chartData, setChartData] = useState({
    inventory: { labels: [], values: [] },
    leftover: { labels: [], values: [] },
    daily: { labels: [], values: [] },
    request: { labels: [], values: [] },
  });

  const [stockData, setStockData] = useState({ labels: [], quantities: [] });

  useEffect(() => {
    // Fetch initial data
    axios
      .get("http://localhost:8070/inventory/chart")
      .then((response) => {
        setChartData((prev) => ({ ...prev, inventory: response.data }));
      })
      .catch((error) => console.error("Error fetching inventory data:", error));

    axios
      .get("http://localhost:8070/waste/chart")
      .then((response) => {
        setChartData((prev) => ({ ...prev, leftover: response.data }));
      })
      .catch((error) => console.error("Error fetching wastage data:", error));

    axios
      .get("http://localhost:8070/consumption/chart")
      .then((response) => {
        setChartData((prev) => ({ ...prev, daily: response.data }));
      })
      .catch((error) =>
        console.error("Error fetching consumption data:", error)
      );

    axios
      .get("http://localhost:8070/inventory/stock")
      .then((response) => {
        setStockData(response.data);
      })
      .catch((error) => console.error("Error fetching stock data:", error));

    // Fetch widget data (summary)
    Promise.all([
      axios.get("http://localhost:8070/inventory/chart"),
      axios.get("http://localhost:8070/waste/chart"),
      axios.get("http://localhost:8070/consumption/chart"),
      axios.get("http://localhost:8070/ingredient/requests"),
    ])
      .then(([inventoryRes, wasteRes, consumptionRes, requestsRes]) => {
        setInventoryData({
          inventory: inventoryRes.data.values.reduce(
            (sum, val) => sum + val,
            0
          ),
          leftover: wasteRes.data.values.reduce((sum, val) => sum + val, 0),
          daily: consumptionRes.data.values.reduce((sum, val) => sum + val, 0),
          request: requestsRes.data.length,
          sellers: 10, // Static for now, update with actual API if available
        });
      })
      .catch((error) => console.error("Error fetching widget data:", error));

    // Setup Socket.IO for real-time updates
    const socket = io("http://localhost:8070");
    socket.on("inventoryUpdate", (data) => {
      setChartData((prev) => ({ ...prev, inventory: data }));
      setInventoryData((prev) => ({
        ...prev,
        inventory: data.values.reduce((sum, val) => sum + val, 0),
      }));
    });
    socket.on("wastageUpdate", (data) => {
      setChartData((prev) => ({ ...prev, leftover: data }));
      setInventoryData((prev) => ({
        ...prev,
        leftover: data.values.reduce((sum, val) => sum + val, 0),
      }));
    });
    socket.on("consumptionUpdate", (data) => {
      setChartData((prev) => ({ ...prev, daily: data }));
      setInventoryData((prev) => ({
        ...prev,
        daily: data.values.reduce((sum, val) => sum + val, 0),
      }));
    });
    socket.on("stockUpdate", (data) => {
      setStockData(data);
    });

    return () => socket.disconnect();
  }, []);

  return (
    <div className="app-container">
      
      <div className="inventContainer">
      {/* <Nav/> */}
        <h1 className="dashboard-title">Inventory Dashboard</h1>
        <div className="widget-container">
          <Widget type="inventory" amount={inventoryData.inventory} diff={30} />
          <Widget type="leftover" amount={inventoryData.leftover} diff={20} />
          <Widget type="daily" amount={inventoryData.daily} diff={15} />
          <Widget type="request" amount={inventoryData.request} diff={10} />
          {/* <Widget type="sellers" amount={inventoryData.sellers} diff={5} /> */}
        </div>
        <div className="featured-container">
          <Featured stockData={stockData} />
        </div>
        <div className="chart-container">
          {/* <InventoryChart
            title="Inventory Levels"
            data={chartData.inventory}
            link="/displayInventory"
          /> */}
          <InventoryChart
            title="Leftovers Trend"
            data={chartData.leftover}
            link="/displayFirst"
          />
          <InventoryChart
            title="Daily Consumption"
            data={chartData.daily}
            link="/displayBegin"
          />
        </div>
        <div className="list-container">
          <EquipmentList />
          <RequestIngredientsList />
        </div>
      </div>
    </div>
  );
};

export default InventDash;
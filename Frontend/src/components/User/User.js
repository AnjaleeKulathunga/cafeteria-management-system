import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./User.css";
import { StoreContext } from '../context/StoreContext';

function User(props) {
    const { users, setUsers } = props;
    const navigate = useNavigate();
    const { user } = useContext(StoreContext);
    const isAdmin = user?.role === 'admin';

    // Add this console log to inspect the users prop
    console.log("Users data received in User.js:", users);

    const deleteHandler = async (id) => {
        try {
            await axios.delete(`http://localhost:8070/users/${id}`);

            const fetchHandler = async () => {
                return await axios.get("http://localhost:8070/users").then((res) => res.data.users);
            }
            fetchHandler().then((newUsers) => setUsers(newUsers));

        } catch (error) {
            console.error("Error deleting user:", error);
            alert("Failed to delete user.  Please try again.");
        }
    };

    return (
        <div className="user-container">
            <h1>User Display</h1>
            <table className="user-info">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Gmail</th>
                        <th>Age</th>
                        <th>Address</th>
                        <th>Department</th> {/* New Department Column */}
                        <th>Employee ID</th> {/* New Employee ID Column */}
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => {
                        console.log("Mapping user:", user);
                        return (
                            <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td>{user.gmail}</td>
                                <td>{user.age}</td>
                                <td>{user.address}</td>
                                <td>{user.department}</td> {/* Display Department */}
                                <td>{user.employeeId}</td> {/* Display Employee ID */}
                                <td>
                                    <div className="action-buttons">
                                        {isAdmin ? (
                                            <>
                                        <Link to={`/updateuser/${user._id}`} className="update-btn">Update</Link>
                                            <button onClick={() => deleteHandler(user._id)} className="delete-btn">Delete</button>
                                            </>
                                        ) : (
                                            <span>No action available</span>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default User;
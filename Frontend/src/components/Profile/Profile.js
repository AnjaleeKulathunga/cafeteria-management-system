import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios
import Nav from '../Nav2/Nav2';
import Nav2 from '../Nav/Nav';
import './Profile.css';
import { StoreContext } from '../context/StoreContext';

function Profile() {
    const navigate = useNavigate();
    const [userDetails, setUserDetails] = useState({
        name: '',
        email: '',
        role: ''
    });
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editFormData, setEditFormData] = useState({ name: '', email: '' });
    const { user, token, url, setToken } = useContext(StoreContext); // Add setToken from context

    useEffect(() => {
        // Get user details from localStorage
        const userName = localStorage.getItem('userName');
        const userRole = localStorage.getItem('userRole');
        const userEmail = localStorage.getItem('userEmail');

        if (!userName || !userRole) {
            // If no user details found, redirect to login
            navigate('/log');
            return;
        }

        setUserDetails({
            name: userName,
            email: userEmail || 'Not provided',
            role: userRole
        });
    }, [navigate]);

    const handleLogout = () => {
        // Clear user data from localStorage
        setToken(null); // Assuming setToken is in context to clear it globally
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('userName');
        localStorage.removeItem('userRole');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userId');
        // Redirect to login page
        navigate('/log');
    };

    const handleOpenEditModal = () => {
        setEditFormData({
            name: userDetails.name,
            email: userDetails.email
        });
        setIsEditModalOpen(true);
    };

    const handleCloseEditModal = () => {
        setIsEditModalOpen(false);
    };

    const handleEditFormChange = (e) => {
        const { name, value } = e.target;
        setEditFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSaveChanges = async () => {
        // Backend API call will go here
        console.log("Saving changes:", editFormData);
        const userId = localStorage.getItem('userId');
        if (!userId || !token) {
            alert("User not authenticated. Cannot save changes.");
            return;
        }

        try {
            // Placeholder for API endpoint: /users/update/profile or /users/:userId
            // You need to create this endpoint on your backend.
            const response = await axios.put(`${url}/users/profile/${userId}`, editFormData, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.data.success) {
                // Update userDetails state with new data
                setUserDetails(prev => ({ ...prev, name: response.data.user.name, email: response.data.user.email }));
                // Update localStorage
                localStorage.setItem('userName', response.data.user.name);
                localStorage.setItem('userEmail', response.data.user.email);
                alert("Profile updated successfully!");
                handleCloseEditModal();
            } else {
                alert(response.data.message || "Failed to update profile.");
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            alert("Error updating profile. See console for details.");
        }
    };

    return (
        <div className="user-profile-container">
            {user && (user.role === 'admin' || user.role === "staff") ? <Nav /> : <Nav2 />}
            <div className="user-profile-content">
                <div className="user-profile-card">
                    <div className="user-profile-header">
                        <h1>User Profile</h1>
                    </div>
                    <div className="user-profile-details">
                        <div className="user-profile-info">
                            <div className="user-profile-info-group">
                                <label>Name:</label>
                                <p>{userDetails.name}</p>
                            </div>
                            <div className="user-profile-info-group">
                                <label>Email:</label>
                                <p>{userDetails.email}</p>
                            </div>
                            {/* Conditionally display Role only for admin or staff */}
                            {(userDetails.role === 'admin' || userDetails.role === 'staff') && (
                                <div className="user-profile-info-group">
                                    <label>Role:</label>
                                <p>{userDetails.role}</p>
                                </div>
                            )}
                        </div>
                        <div className="user-profile-actions">
                            <button onClick={handleOpenEditModal} className="user-profile-edit-btn">
                                Edit Profile
                            </button>
                            <button onClick={handleLogout} className="user-profile-logout-btn">
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {isEditModalOpen && (
                <div className="user-profile-edit-modal">
                    <div className="user-profile-modal-content">
                        <h2>Edit Profile</h2>
                        <form onSubmit={(e) => { e.preventDefault(); handleSaveChanges(); }}>
                            <div className="user-profile-form-group">
                                <label htmlFor="name">Name:</label>
                                <input 
                                    type="text" 
                                    id="name" 
                                    name="name" 
                                    value={editFormData.name} 
                                    onChange={handleEditFormChange} 
                                    required 
                                />
                            </div>
                            <div className="user-profile-form-group">
                                <label htmlFor="email">Email:</label>
                                <input 
                                    type="email" 
                                    id="email" 
                                    name="email" 
                                    value={editFormData.email} 
                                    onChange={handleEditFormChange} 
                                    required 
                                />
                            </div>
                            <div className="user-profile-modal-actions">
                                <button type="submit" className="user-profile-save-btn">Save Changes</button>
                                <button type="button" onClick={handleCloseEditModal} className="user-profile-cancel-btn">Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Profile; 
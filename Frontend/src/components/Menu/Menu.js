import React, { useState, useContext } from 'react';
import './Menu.css';
import Hnav from "../Hnav/Hnav";
import Header from '../Header/Header';
import ExploreMenu from '../ExploreMenu/ExploreMenu'; // Restoring ExploreMenu component
// import { menu_list } from '../../assets/assets'; // No longer needed in Menu.js
import FoodDisplay from '../FoodDisplay/FoodDisplay';
import AppDownload from '../AppDownload/AppDownload';
import Nav from '../Nav/Nav';
import Nav2 from '../Nav2/Nav2';
import { StoreContext } from '../context/StoreContext';

function Menu() {
    const [category, setCategory] = useState("All");
    const { user } = useContext(StoreContext);
    
    // Determine which navigation component to render based on user role
    const renderNavigation = () => {
        if (!user) return null;
        
        if (user.role === 'admin' || user.role === 'staff') {
            return <Nav2 />;
        } else {
            return <Nav />;
        }
    };

    return (
        <div className="menu-container">
            {/* Hnav is always shown at the top for all users */}
            <Hnav />
            
            {/* Role-based navigation */}
            {renderNavigation()}
            
            <div className="menu-header">
                <Header />
                {/* The h1 and p for exploring menu will be moved to Header.js or placed here */}
            </div>
            
            {/* ExploreMenu component handles the category list */}
            <ExploreMenu category={category} setCategory={setCategory} />

            <FoodDisplay category={category} />
            <AppDownload />
        </div>
    );
}

export default Menu;
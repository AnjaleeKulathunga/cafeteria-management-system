import React from 'react';
// We can comment out or remove the Header.css import if its styles are no longer needed or are conflicting.
// import './Header.css'; 

// Header.js will now just provide the content for the banner defined in Menu.css
function Header() {
  return (
    <>
      {/* The h1 and p tags will be styled by .menu-header h1 and .menu-header p from Menu.css */}
      <h1>Explore Our Menu</h1> 
      <p className='explore-menu-text'>Discover a variety of delicious meals, from quick bites to hearty dishes. Browse, choose, and 
            enjoy—your perfect meal is just a tap away!</p>
      {/* You can add a button here if your design in Menu.css implies one within .menu-header */}
    </>
  );
}

export default Header;
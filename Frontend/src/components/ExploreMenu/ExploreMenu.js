import React from 'react'
import './ExploreMenu.css';
import { menu_list } from '../../assets/assets';
function ExploreMenu({category,setCategory}) {
  // The h1 and p are now handled by the Header.js component in the banner
  return (
    <div className='explore-menu' id='explore-menu'>
        {/* <h1>Explore Our Menu</h1> */}
        {/* <p className='explore-menu-text'>Discover a variety of delicious meals, from quick bites to hearty dishes. Browse, choose, and 
            enjoy—your perfect meal is just a tap away!</p> */}
        <div className="explore-menu-list">
            {menu_list.map((item,index)=>{
                return (
                    <div onClick={()=>setCategory(prev=>prev===item.menu_name?"All":item.menu_name)} key={index} className='explore-menu-list-item'>
                        <img className={category===item.menu_name?"active":""} src={item.menu_image} alt=""/>
                        <p>{item.menu_name}</p>

                    </div>
                )
            })}

        </div>  
        <hr/>  
      
    </div>
  )
}

export default ExploreMenu
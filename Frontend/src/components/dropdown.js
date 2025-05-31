<div className="navbar-right">
        <img src={assets.search_icon} alt=""/>
        <div classame="navbar-search-icon">
         <Link to='/cart'> <img src= {assets.basket_icon} alt=""/></Link>
          <div className={getTotalCartAmount()===0?"":"dot"}></div>
        </div>
        <button>Sign in</button>
        <div className='navbar-profile'>
          <img src={assets.profile_icon} alt=""/>
          <ul className="nav-profile-dropdown">
            <li><img src={assets.bag_icon} alt=""/><p>Orders</p></li>
              <hr/>
            <li><img src={assets.logout_icon} alt=""/><p>LogOut</p></li>

          </ul>
        </div>

      </div>

      
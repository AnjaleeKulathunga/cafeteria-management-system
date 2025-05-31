import React from 'react'
import topbar from './topbar.scss'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import FullscreenOutlinedIcon from '@mui/icons-material/FullscreenOutlined';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import ChecklistOutlinedIcon from '@mui/icons-material/ChecklistOutlined';
import Switch from '@mui/material/Switch';
import { colors } from '@mui/material';

const TopBar = () => {
  return (
    <div className='topbar'>
      <div className="topbarContainer">
        <div className="search">
            <input type='text' placeholder='search'/>
            <SearchOutlinedIcon/>
        </div>
        <div className="items">
            <div className="item">
                <LanguageOutlinedIcon className="icon"/>
                <span>English</span>
            </div>
            <div className="item">
                <Switch style={{color:"#210876"}} className="icon"/>
            </div>
            <div className="item">
                <FullscreenOutlinedIcon className="icon"/>
            </div>
            <div className="item">
                <NotificationsActiveOutlinedIcon className="icon"/>
                <div className="counter">3</div>
            </div>
            <div className="item">
                <ChatBubbleOutlineOutlinedIcon className="icon"/>
                <div className="counter">5</div>
            </div>
            <div className="item">
                <ChecklistOutlinedIcon className="icon"/>
            </div>
            <div className="item">
                <img src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d" alt="profile" className='profileImage' />
            </div>
        </div>
      </div>
    </div>
  )
}

export default TopBar
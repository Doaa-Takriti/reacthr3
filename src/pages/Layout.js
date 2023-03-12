import React, { useState } from 'react';
import '../App.css';
import { AiOutlineHome,AiFillCaretRight } from 'react-icons/ai';
import { FaUsers } from 'react-icons/fa';
import { BsList ,BsTable, BsFillMoonStarsFill} from 'react-icons/bs';
import { MdOutlineLanguage } from 'react-icons/md';

import { FiMessageSquare} from 'react-icons/fi';
import {  GiTakeMyMoney} from 'react-icons/gi';
import { IoMdNotificationsOutline} from 'react-icons/io';
import { FiSettings} from 'react-icons/fi';
import { BiLogOutCircle} from 'react-icons/bi';
import Badge from '@mui/material/Badge';
import {Link,      Outlet 
} from "react-router-dom";
import { NavLink ,useNavigate} from 'react-router-dom'
import { ThemeContext } from "../context/themeContext";
import { useAuth } from '../components/auth'




const Layout = ({children}) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const [isOpen2, setIsOpen2] = useState(false);
    const toggle2 = () => setIsOpen2(!isOpen2);
    const [isOpen3, setIsOpen3] = useState(false);
    const toggle3 = () => setIsOpen3(!isOpen3);
    const [isOpen4, setIsOpen4] = useState(false);
    const toggle4 = () => setIsOpen4(!isOpen4);

    const navLinkStyles = ({ isActive }) => {
      return {
       color: isActive ? '#EA8D56' : 'white',
       backgroundColor : isActive ? 'white' : 'transparent'
      }
    }
    const { toggleFunction,toggleNavbar,darkMode1,toggleMode} = React.useContext(ThemeContext);
  console.log("darkMode1", darkMode1)
  const navigate = useNavigate()

  const auth = useAuth()
  const handleLogout = () => {
    auth.logout()
    navigate('/')
  }
  return (
    <div>
          <div className="layout-hr">
    <div className="sidebar-hr"  style={toggleNavbar ? {left: "-20%" } : {left: "0"}}>
      <div className='logo-hr'>
        <Link to='/'>
        <img alt="img-logo" src="https://th.bing.com/th/id/R.07ccecd36c518f4589191d7c4f676913?rik=Ygi9Zuy4IR2hQg&pid=ImgRaw&r=0" />

        </Link>
        <h3>react hr  project</h3>
       </div>

       <p className=' dashboard'><a href="#"><AiOutlineHome /> dashboard</a> </p>

<ul>
  <li onClick={toggle}>  <a href="#"><FaUsers /> employee <AiFillCaretRight className={isOpen ? "translate90" : "translate0"} /></a>
  <div className={isOpen ? "employeelist" : "employeelisthidden"}>
  <NavLink to='/allemployee' style={navLinkStyles}>all employee</NavLink>

    <a href="#">numbers</a>

    <a href="#">numbers</a>

  </div>

  </li>
  <li onClick={toggle3}>  <a href="#"><BsTable /> Training <AiFillCaretRight className={isOpen3 ? "translate90" : "translate0"} /></a>
  <div className={isOpen3 ? "traininglist" : "traininglisthidden"}>
  <NavLink to='/training' style={navLinkStyles}>all courses</NavLink>


  </div>

  </li>
  <li onClick={toggle4}>  <a href="#"><GiTakeMyMoney /> reward <AiFillCaretRight className={isOpen4 ? "translate90" : "translate0"} /></a>
  <div className={isOpen4 ? "traininglist" : "traininglisthidden"}>
  <NavLink to='/reward' style={navLinkStyles}>all reward</NavLink>


  </div>

  </li>


</ul>
    </div>
    <div className="body-hr" style={toggleNavbar ? {marginLeft: "0" } : {marginLeft: "20%"}}>
      <div className={darkMode1 ? "navbar-hrdark" : "navbar-hr"} style={toggleNavbar ? {width: "100%" } : {width: ""}}>
        <div><BsList onClick={toggleFunction}/>
        <input type="text" placeholder='search...'/>
         </div>
         <div>
          <span>  <MdOutlineLanguage/> english</span>
          <span onClick={toggleMode} >
            {darkMode1 ?  < BsFillMoonStarsFill style={{color: 'yellow'}}/> :    <BsFillMoonStarsFill style={{color: 'black'}} />}
            
         
        
          </span>
          <span style={{marginRight: '0px'}}>
          <Badge badgeContent={4} color="primary">

            <FiMessageSquare/>
            </Badge></span>
            <span> {!auth.user && (
        <NavLink to='/login'  >
          <p>log in</p>
        </NavLink>
      )}</span>
          <span><IoMdNotificationsOutline/></span>
          {auth.user && (
          <span onClick={toggle2} className='img-setting'>
            <img src="https://th.bing.com/th/id/OIP.7nReUuSx5H2uu2wQ6hBn3gHaHw?pid=ImgDet&w=860&h=900&rs=1" alt="" />
            
          <div className={isOpen2 ? "divdisplay" : "divhidden"}>
            <ul>
              <li>HI.. {auth.user}</li>
              <li><FiSettings/>settings</li>
              <li onClick={handleLogout}><BiLogOutCircle/>log out</li>
            </ul>
            </div>
          </span>
          )}
        
        
          </div>
      </div>
     
      {children}
    
    </div>

  </div>
   <Outlet />

    </div>
  )
}

export default Layout
import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux'
import { Link } from "react-router-dom"
import M from "materialize-css"
import SearchLine from "./SearchLine"

const Navbar = () => {
  const state = useSelector(state => state.signinReducer)
  const [logout, setLogout] = useState(false)
  const sideBar = useRef(null)

  useEffect(() => {
    const options = {
      edge: "right",
    }
    M.Sidenav.init(sideBar.current, options)
  }, [state.loading, logout])

  const _logOut = () => {
    localStorage.clear()
    setLogout(true)
  }

  const renderList = () => {
    if (localStorage.getItem('auth')) {
      return [
        <Link  className="sidenav-close" to="/create">
          <i className="material-icons small ">add_a_photo</i>
        </Link>,
        <Link className="sidenav-close" to="/profile">Profile</Link>,
        <Link className="sidenav-close" to="/myfollowing">My Following</Link>,
        <Link  className="sidenav-close" style={{paddingRight:'0'}} to="#" onClick={() => _logOut()}>Logout</Link>,
      ]
    } else {
      return [
        <Link className="sidenav-close" to="/signin" >Signin</Link>,
        <Link className="sidenav-close" to="/signup">Signup</Link>
      ]
    }
  }

  return (
    <React.Fragment>
      <div className="navbar-fixed">
        <nav>
          <div className="nav-wrapper white">
            <div className='nav-left'>
              <Link to="" className="brand-logo left">didi</Link>
            </div>
            <a href="#" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
            <SearchLine />
            <div className="nav-right right hide-on-med-and-down">
              <ul id="nav-mobile" className="right ">
                {renderList().map((element, index) => {
                  return (<li key={index}>{element}</li>)
                })}
              </ul>
            </div>
          </div>
        </nav>
      </div>
      <ul ref={sideBar} className="sidenav" id="mobile-demo">
        {renderList().map((element, index) => {
          return (<li key={index}>{element}</li>)
        })}
      </ul >
    </React.Fragment>
  );
}

export default Navbar;

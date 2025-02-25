import { FaCartShopping } from 'react-icons/fa6';
import {Link} from 'react-router-dom' 
import styles from "./NavBar.module.css"
import NavBarLink from './NavBarLink';
import logo from "../../assets/sas-logo.png";
import React, { useState } from 'react';
import { height, width } from '@fortawesome/free-brands-svg-icons/fa42Group';


const NavBar = ({numCartItems}) => {

    const [isNavCollapsed, setIsNavCollapsed] = useState(true);
    const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

    return (
        <nav className={`navbar navbar-expand-lg navbar-light bg-white shadow-sm py-0 ${styles.stickyNavBar}`}>
            <div className="container">
                <Link className="navbar-brand row text-uppercase" to="/">
                    <img 
                        src={logo} 
                        alt="logo" 
                        className={'img-fluid col'}
                        style={{width: '80px', maxWidth: '100%', height: 'auto'}}
                    />
                    <span className={`${styles.title} col`}>
                        <small className= {`${styles.cinzel_decorative_bold}`}>STUD AND SHINE</small>
                        <small className= {`${styles.cinzel_decorative_regular}`}>ACCESSORIES</small>
                    </span>
                </Link>


                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarContent"
                    aria-controls="navbarContent"
                    aria-expanded={!isNavCollapsed}
                    aria-label="Toggle navigation"
                    onClick={handleNavCollapse}
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`} id="navbarContent">
                    <NavBarLink />
                    <Link to="/cart" className={`btn btn-dark ms-3 rounded-pill position-relative ${styles.responsiveCart}`}>
                        <FaCartShopping />
                        {numCartItems == 0 || <span 
                            className="position-absolute top-0 start-100 translate-middle badge round-pill"
                            style={{fontSize: '0.85rem', padding: '0.5em 0.65em', backgroundColor: '#3A6B35'}}
                        >               
                            {numCartItems}
                        </span>}
                    </Link>
                </div>
            </div>    
        </nav>
  )
}

export default NavBar
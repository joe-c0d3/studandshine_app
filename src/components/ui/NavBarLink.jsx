import React, { useContext } from 'react'
import {NavLink} from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'

const NavBarLink = () => {

  const { isAuthenticated, username, setIsAuthenticated, get_username, logout } = useContext(AuthContext)


  return (
    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        {isAuthenticated ? (
            
            <>        
                <li className="nav-item">
                    <NavLink
                        to="/profile" 
                        className={({ isActive }) => 
                            isActive ? "nav-link active fw-semibold" : "nav-link fw-semibold"
                        } 
                        end
                    >
                        {`Hi ${username}`}
                    </NavLink>
                </li>
        
                <li className="nav-item" onClick={logout}>
                    <NavLink
                        to="/" 
                        className={({ isActive }) => 
                            isActive ? "nav-link active fw-semibold" : "nav-link fw-semibold"
                        } 
                        end
                    >
                        Logout
                    </NavLink>
                </li>
                
                </>) : (
                
                <>

                <li className="nav-item">
                    <NavLink
                    to="/login" 
                    className={({ isActive }) => 
                    isActive ? "nav-link active fw-semibold" : "nav-link fw-semibold"
                    } 
                    end
                >
                    Login
                </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink
                        to="/register" 
                        className={({ isActive }) => 
                            isActive ? "nav-link active fw-semibold" : "nav-link fw-semibold"
                        } 
                        end
                    >
                        Register
                    </NavLink>
                </li>
            </>)

        }

    </ul>
  )
}

export default NavBarLink
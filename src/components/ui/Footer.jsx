import { Link } from 'react-router-dom'
import { FaFacebook } from 'react-icons/fa6'
import { FaTiktok } from 'react-icons/fa6'
import { FaInstagram } from 'react-icons/fa6'
import clsx from "clsx";
import styles from "./Footer.module.css"



const Footer = () => {
  return (
    <footer className="py-3" style={{ backgroundColor: '#E3B448', color: 'black' }}>
        <div className="container text-center">
          {/* Quick Links Section */}
          <div className="mb-2">
                <Link to="/" className={`text-black text-decoration-none mx-2 ${styles.home_button}`}>Home</Link>
                <Link to="" className={`text-black text-decoration-none mx-2 ${styles.about_button}`}>About</Link>
                <Link to="" className={`text-black text-decoration-none mx-2 ${styles.contact_button}`}>Contact</Link>
          </div>

          {/* Social Media Icons Section */}
          <div className="mb-2 py-3 flex justify-center items-center gap-4">
            <a
              href="https://www.facebook.com/share/16598w59N6/?mibextid=wwXIfr"
              className={clsx(
                "text-black",
                "transition-colors",
                "duration-300",
                "fs-3",
                "hover:text-blue-600",
                `${styles.facebook_button}`
              )} home_button
            >
              <FaFacebook />
            </a>
            <a
              href="https://www.tiktok.com/@studandshineaccessories"
              className={clsx(
                "text-black",
                "transition-colors",
                "duration-300",
                "fs-3",
                "hover:text-blue-400",
                `${styles.twitter_button}`
              )}
            >
              <FaTiktok />
            </a>
            <a
              href="https://www.instagram.com/studandshineaccessories?igsh=Z3JobG5xcjBpZmpz"
              className={clsx(
                "text-black",
                "transition-colors",
                "duration-300",
                "fs-3",
                "hover:text-pink-600",
                `${styles.instagram_button}`
              )}
            >
              <FaInstagram />
            </a>
          </div>

          {/* Copyright Section */}
          <p className="small mb-0">&copy;2025 Stud & Shine</p>
        </div>        
    </footer>
  )
}

export default Footer
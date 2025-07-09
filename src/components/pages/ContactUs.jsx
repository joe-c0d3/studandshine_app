import { Link } from 'react-router-dom'
import styles from "./ContactUs.module.css"

const ContactUs = () => {
  return (
    <header className="py-3 my-5" style={{backgroundColor: "#3A6B35"}}>
        <div className="container px-4 px-lg-5 my-5">
            <div className="text-center text-white">
                <h1 className="display-4 fw-bold">You can reach us at...</h1>
                <p className="lead fw-normal text-white-75 mb-4">+2348061965121</p>
            </div>
        </div>
    </header>
  )
}

export default ContactUs
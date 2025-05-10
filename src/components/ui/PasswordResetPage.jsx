import { Link } from 'react-router-dom'
import styles from "./PasswordResetPage.module.css"

const NotFoundPage = () => {
  return (
    <header className="py-3 my-5" style={{backgroundColor: "#3A6B35"}}>
        <div className="container px-4 px-lg-5 my-5">
            <div className="text-center text-white">
                <h1 className="display-4 fw-bold">Confirmation Email Sent!</h1>
                <p className="lead fw-normal text-white-75 mb-1">Click on the link that has been sent to your email to reset your password.</p>
                <p className="lead fw-normal text-white-75 mb-4">Kindly check your spam folder if you can't find it.</p>
                <Link to="/login" className={`${styles.pill_button} btn btn-light btn-lg rounded-pill px-4 py-2`}>Back to Login</Link>
            </div>
        </div>
    </header>
  )
}

export default NotFoundPage
import "./ForgotPasswordPage.module.css"
import { Link } from "react-router-dom"
import { useContext, useState } from "react"
import api from "../../api"
import Error from "../ui/Error"
import { replace, useLocation, useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"


const ChangePasswordPage = () => {

    const {isAuthenticated, get_user_id, logout, resetPassword} = useContext(AuthContext)

    const location = useLocation()
    const navigate = useNavigate()


    const [email, setEmail] = useState("")

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")


    function handleSubmit(e) {
        e.preventDefault()
        setLoading(true)
        resetPassword(email)
        setLoading(false)

        const from = location?.state?.from.pathname || "/confirmation_email_sent";
        navigate(from, {replace:true});
    }

    return (
        <div className="login-container my-5 col-md-5 mx-auto">
            <div className="login-card shadow mb-5 p-5">
                {error && <Error error = {error} />}
                <h2 className="login-title text-center">Reset Your Password</h2>
                <br />
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Email</label>
                        <input type="email" value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-control" id="email" 
                            placeholder="Enter your registered email" required/>
                    </div>
                    <button type="submit" className="btn btn-primary w-100" disabled={loading}>Send</button>
                </form>

            </div>
        </div>
    )
}

export default ChangePasswordPage
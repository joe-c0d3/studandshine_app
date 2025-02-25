import "./ForgotPasswordPage.module.css"
import { Link } from "react-router-dom"
import { useContext, useState } from "react"
import api from "../../api"
import Error from "../ui/Error"
import { replace, useLocation, useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"


const ForgotPasswordResponsePage = () => {

    const {isAuthenticated, get_user_id, logout, createNewPassword} = useContext(AuthContext)

    const location = useLocation()
    const navigate = useNavigate()


    const [new_password, setNewPassword] = useState("")
    const [confirm_password, setConfirmPassword] = useState("")


    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")


    function handleSubmit(e) {
        e.preventDefault()
        setLoading(true)
        createNewPassword(new_password, confirm_password)
        setLoading(false)

        const from = location?.state?.from.pathname || "/login";
        navigate(from, {replace:true});
    }

    return (
        <div className="login-container my-5 col-md-5 mx-auto">
            <div className="login-card shadow mb-5 p-5">
                {error && <Error error = {error} />}
                <h2 className="login-title text-center">Create a New Password</h2>
                <br />
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">New Password</label>
                        <input type="password" value={new_password}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="form-control" id="password" 
                            placeholder="" required/>

                        <label htmlFor="password" className="form-label">Confirm New Password</label>
                        <input type="password" value={confirm_password}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="form-control" id="password" 
                            placeholder="" required/>
                    </div>
                    <button type="submit" className="btn btn-primary w-100" disabled={loading}>Send</button>
                </form>

            </div>
        </div>
    )
}

export default ForgotPasswordResponsePage
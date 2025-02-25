import "./ChangePasswordPage.module.css"
import { Link } from "react-router-dom"
import { useContext, useState } from "react"
import api from "../../api"
import Error from "../ui/Error"
import { replace, useLocation, useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"


const ChangePasswordPage = () => {

    const {isAuthenticated, get_user_id, logout, changePassword} = useContext(AuthContext)

    const location = useLocation()
    const navigate = useNavigate()


    const [old_password, setOldpassword] = useState("")
    const [password, setPassword] = useState("")
    const [password2, setPassword2] = useState("")

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")


    function handleSubmit(e) {
        e.preventDefault()
        setLoading(true)
        changePassword(old_password, password, password2)
        setLoading(false)
        logout()

        const from = location?.state?.from.pathname || "/login";
        navigate(from, {replace:true});
    }

    return (
        <div className="login-container my-5 col-md-5 mx-auto">
            <div className="login-card shadow mb-5 p-5">
                {error && <Error error = {error} />}
                <h2 className="login-title text-center">Change Your Password</h2>
                <br />
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Old Password</label>
                        <input type="password" value={old_password}
                            onChange={(e) => setOldpassword(e.target.value)}
                            className="form-control" id="password" 
                            placeholder="Enter your former password" required/>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">New Password</label>
                        <input type="password" value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-control" id="password" 
                            placeholder="Enter your new password" required/>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Re-enter New Password</label>
                        <input type="password" value={password2}
                            onChange={(e) => setPassword2(e.target.value)}
                            className="form-control" id="password" 
                            placeholder="Repeat your new password" required/>
                    </div>

                    <button type="submit" className="btn btn-primary w-100" disabled={loading}>Submit</button>
                </form>

            </div>
        </div>
    )
}

export default ChangePasswordPage
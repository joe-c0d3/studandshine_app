import React from 'react'
import { Link } from 'react-router-dom'
import "./RegisterPage.module.css"
import { useContext, useState } from "react"
import Error from "../ui/Error"
import { replace, useLocation, useNavigate } from "react-router-dom"
import { AuthContext } from '../../context/AuthContext'




const RegisterPage = () => {

    const location = useLocation()
    const navigate = useNavigate()


    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [password2, setPassword2] = useState("")
    const [first_name, setFirstName] = useState("")
    const [last_name, setLastName] = useState("")
    const [address, setAddress] = useState("")
    const [address2, setAddress2] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const [country, setCountry] = useState("")
    const [phone, setPhone] = useState("")

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const {registerUser} = useContext(AuthContext)



    function handleSubmit(e) {
        e.preventDefault()
        setLoading(true)
        registerUser(username, email, password, password2, first_name, last_name, address, address2, city, state, country, phone)
        setLoading(false)


        const from = location?.state?.from.pathname || "/login";
        navigate(from, {replace:true});
    }
    return (
        <div className="login-container my-5 col-md-5 mx-auto">
            <div className="login-card shadow mb-5 p-5">
                {error && <Error error = {error} />}
                <h2 className="login-title text-center">Welcome Back</h2>
                <p className="login-subtitle">Please log into your account</p>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Username</label>
                        <input type="text" value={username} 
                            onChange={(e) => setUsername(e.target.value)} 
                            className="form-control" id="email" 
                            placeholder="Enter your username" required/>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" value={email}
                            onChange={(e) => setEmail(e.target.value)} 
                            className="form-control" id="email" 
                            placeholder="Enter your email" required/>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-control" id="password" 
                            placeholder="Enter your password" required/>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="password2" className="form-label">Confirm password</label>
                        <input type="password" value={password2}
                            onChange={(e) => setPassword2(e.target.value)}
                            className="form-control" id="password" 
                            placeholder="Re-enter your password" required/>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="first_name" className="form-label">First name</label>
                        <input type="text" value={first_name} 
                            onChange={(e) => setFirstName(e.target.value)} 
                            className="form-control" id="email" 
                            placeholder="Enter your first name" required/>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="last_name" className="form-label">Last name</label>
                        <input type="text" value={last_name} 
                            onChange={(e) => setLastName(e.target.value)} 
                            className="form-control" id="email" 
                            placeholder="Enter your last name" required/>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="address" className="form-label">Address line 1</label>
                        <input type="address" value={address} 
                            onChange={(e) => setAddress(e.target.value)} 
                            className="form-control" id="email" 
                            placeholder="e.g 11 Hall Ln" required/>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="address2" className="form-label">Address line 2</label>
                        <input type="address" value={address2} 
                            onChange={(e) => setAddress2(e.target.value)} 
                            className="form-control" id="email" 
                            placeholder="e.g Off Oduduwa Rd" />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="city" className="form-label">City</label>
                        <input type="text" value={city} 
                            onChange={(e) => setCity(e.target.value)} 
                            className="form-control" id="email" 
                            placeholder="e.g Apapa" required/>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="state" className="form-label">State</label>
                        <input type="text" value={state} 
                            onChange={(e) => setState(e.target.value)} 
                            className="form-control" id="email" 
                            placeholder="e.g Lagos" required/>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="country" className="form-label">Country</label>
                        <input type="text" value={country} 
                            onChange={(e) => setCountry(e.target.value)} 
                            className="form-control" id="email" 
                            placeholder="e.g Nigeria" required/>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="phone" className="form-label">Phone</label>
                        <input type="number" value={phone} 
                            onChange={(e) => setPhone(e.target.value)} 
                            className="form-control" id="email" 
                            placeholder="e.g 08038774932" required/>
                    </div>

                    <button type="submit" className="btn btn-primary w-100" disabled={loading}>Register</button>
                </form>

                <div className="login-footer">
                    <br />
                    <p>Already have an account? <Link to="/login">Login Now!</Link></p>
                </div>
            </div>
        </div>
    )
}

export default RegisterPage
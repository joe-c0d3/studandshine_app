import React from 'react'
import styles from "./UserInfo.module.css"
import { BASE_URL } from "../../api"
import { Link } from 'react-router-dom'
import "./EditUser.module.css"
import { useContext, useState } from "react"
import Error from "../ui/Error"
import { replace, useLocation, useNavigate } from "react-router-dom"
import { AuthContext } from '../../context/AuthContext'




const EditUser = ({userInfo}) => {

    const location = useLocation()
    const navigate = useNavigate()


    const [isFileUploaded, setIsFileUploaded] = useState(false)



    const [file, setFile] = useState(null)

    const [formData, setFormData] = useState({
        username: `${userInfo.username}`,
        email: `${userInfo.email}`,
        first_name: `${userInfo.first_name}`,
        last_name: `${userInfo.last_name}`,
        address: `${userInfo.address}`,
        address2: `${userInfo.address2}`,
        city: `${userInfo.city}`,
        state: `${userInfo.state}`,
        country: `${userInfo.country}`,
        phone: `${userInfo.phone}`,
      });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name] : value
          }));
    };

    const handleFileInput = (e) => {
        const files = e.currentTarget.files
        if(files){
            setFile(files[0])
            // show success message on file upload
            setIsFileUploaded(true)
        }
    }

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const {updateProfile} = useContext(AuthContext)


    function handleSubmit(e) {
        e.preventDefault()
        setLoading(true)
        updateProfile(formData, file)

        const from = location?.state?.from.pathname || "/profile";
        window.location.href = from;
        setLoading(false)
    }
    return (
        <div>
            <div className="row mb-4">
                <div className={`col-md-3 py-3 card h-50 ${styles.textCenter}`}>
                    <img 
                        src={`${BASE_URL}${userInfo.profile_pic}`}
                        alt="User Profile" 
                        className={`img-fluid rounded-circle mb-3 mx-auto ${styles.profileImage}`}
                    />
                </div>
                <div className="col-md-9">
                    <div className="card">
                        <div className="card-header" style={{ backgroundColor: '#E3B448', color: 'black' }}>
                            <h5>Make changes here</h5>
                        </div>

                        <div className="card-body">
                            <form className='row' encType="multipart/form-data" onSubmit={handleSubmit}>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label htmlFor="username" className="form-label">Username</label>
                                        <input type="text" name='username' value={formData.username} 
                                            onChange={handleChange} 
                                            className="form-control" id="email" 
                                            required/>
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">Email</label>
                                        <input type="email" name='email' value={formData.email}
                                            onChange={handleChange} 
                                            className="form-control" id="email" 
                                            required/>
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="first_name" className="form-label">First name</label>
                                        <input type="text" name='first_name' value={formData.first_name} 
                                            onChange={handleChange} 
                                            className="form-control" id="email" 
                                            required/>
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="last_name" className="form-label">Last name</label>
                                        <input type="text" name='last_name' value={formData.last_name} 
                                            onChange={handleChange} 
                                            className="form-control" id="email" 
                                            required/>
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="address" className="form-label">Address line 1</label>
                                        <input type="address" name='address' value={formData.address} 
                                            onChange={handleChange} 
                                            className="form-control" id="email" 
                                            required/>
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="file" className="form-label">Profile Picture</label>
                                        <input type="file" name='profile_pic' accept='.jpg, .jpeg, .png, .gif'
                                            onChange={handleFileInput} 
                                            className="form-control" id="" 
                                            />
                                    </div>

                                        {/* Notify the user after successful file upload */}
                                        {isFileUploaded && <div className="flex flex-col gap-y-1 w-full">
                                            <p className="text-center text-blue-800 text-sm">File uploaded</p>
                                            <div className="h-1.5 w-full bg-green-500 rounded-full"></div>
                                        </div>}
                                </div>

                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label htmlFor="address2" className="form-label">Address line 2</label>
                                        <input type="address" name='address2' value={formData.address2} 
                                            onChange={handleChange} 
                                            className="form-control" id="email" 
                                            />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="city" className="form-label">City</label>
                                        <input type="text" name='city' value={formData.city} 
                                            onChange={handleChange} 
                                            className="form-control" id="email" 
                                            required/>
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="state" className="form-label">State</label>
                                        <input type="text" name='state' value={formData.state} 
                                            onChange={handleChange} 
                                            className="form-control" id="email" 
                                            required/>
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="country" className="form-label">Country</label>
                                        <input type="text" name='country' value={formData.country} 
                                            onChange={handleChange} 
                                            className="form-control" id="email" 
                                            required/>
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="phone" className="form-label">Phone</label>
                                        <input type="number" name='phone' value={formData.phone} 
                                            onChange={handleChange} 
                                            className="form-control" id="email" 
                                            required/>
                                    </div>
                                </div>
                                {error && <Error error = {error} />}
                                <button type="submit" className="btn mt-2 w-50 mx-auto" style={{ backgroundColor: '#E3B448', color: 'black' }} disabled={loading}>Update Profile</button>
                            </form>
                        </div>
                </div>
                </div>
            </div>
        </div>
    )
}

export default EditUser
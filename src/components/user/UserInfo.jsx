import styles from "./UserInfo.module.css"
import { FormatDate } from '../../FormatDate'
import { BASE_URL } from "../../api"
import { Link } from "react-router-dom"

const UserInfo = ({userInfo}) => {
  return (
    <div className="row mb-4">
        <div className={`col-md-3 py-3 card ${styles.textCenter}`}>
            <img 
                src={`${BASE_URL}${userInfo.profile_pic}`}
                alt="User Profile" 
                className={`img-fluid rounded-circle mb-3 mx-auto ${styles.profileImage}`}
            />

            <h4>{`${userInfo.first_name} ${userInfo.last_name}`}</h4>
            <Link className="btn mt-2" style={{ backgroundColor: '#E3B448', color: 'black' }} to="/edit_profile">Edit Profile</Link>
            <Link className="btn mt-2" style={{ backgroundColor: '#E3B448', color: 'black' }} to="/change_password">Change Password</Link>
        </div>
        <div className="col-md-9">
            <div className="card">
                <div className="card-header" style={{ backgroundColor: '#E3B448', color: 'black' }}>
                    <h5>Account Overview</h5>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-6">
                            <p>
                                <strong>Full Name:</strong> {`${userInfo.first_name} ${userInfo.last_name}`}
                            </p>
                            <p>
                                <strong>Email:</strong> {userInfo.email}
                            </p>
                            <p>
                                <strong>Phone:</strong> {userInfo.phone}
                            </p>
                        </div>
                        <div className="col-md-6">
                            <p>
                                <strong>City:</strong> {userInfo.city}
                            </p>
                            <p>
                                <strong>Country:</strong> {userInfo.country}
                            </p>
                            <p>
                                <strong>Member Since:</strong> {FormatDate(userInfo.date_joined)}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default UserInfo
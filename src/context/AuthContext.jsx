import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";
import api from "../api";
import { BASE_URL } from "../api"
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from "axios"



export const AuthContext = createContext(true)

export default AuthContext

export function AuthProvider({children}){

    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [username, setUsername] = useState("")
    const [id, setUserid] = useState("")
    


    const handleAuth = () => {
        const token = localStorage.getItem("access")
        if(token){
            const decoded = jwtDecode(token)
            const expiry_date = decoded.exp
            const current_time = Date.now() / 1000
            if(expiry_date >= current_time){
                setIsAuthenticated(true)
            }
        }
    }

    function get_username () {
        api.get("get_username")
        .then(res => {
            setUsername(res.data.username)
        })

        .catch(err => {
            console.log(err.message)
        })
    }

    function get_user_id () {
        api.get("get_user_id")
        .then(res => {
            setUserid(res.data.id)
        })

        .catch(err => {
            console.log(err.message)
        })
    }


    useEffect(function(){
        handleAuth()
        get_username()
        get_user_id()
    }, [])


    const registerUser = async (username, email, password, password2, first_name, last_name, address, address2, city, state, country, phone) => {
        const response = await fetch("http://127.0.0.1:8001/register/", {
            method: "POST",
            headers: {
                "Content-Type":"application/json",
            },
            body: JSON.stringify({
                username, email, password, password2, first_name, last_name, address, address2, city, state, country, phone
            })
        });

        if(response.status === 201){
            toast.success("You have successfully created your account!")

        } else {
            console.log(response.status);
            console.log("there was a server issue");
        }
    }

    
    const changePassword = async (old_password, password, password2) => {
        const response = await fetch(`http://127.0.0.1:8001/change_password/${id}/`, {
            method: "PUT",
            headers: {
                "Content-Type":"application/json",
                'Authorization' : `Bearer ${localStorage.getItem("access")}`,
            },

            body: JSON.stringify({
                old_password,
                password,
                password2
            })

        });

        console.log(response)
        if(response.status === 200){
            toast.success("You have successfully changed your password!")

        } else {
            console.log(response.status);
            console.log("there was a server issue");
        }
    }


    const resetPassword = async (email) => {
        const response = await fetch(`http://127.0.0.1:8001/request_password_reset/`, {
            method: "POST",
            headers: {
                "Content-Type":"application/json",
            },

            body: JSON.stringify({
                email,
            })

        });

        console.log(response)
        if(response.status === 200){
            console.log("Confirmation email sent!");

        } else {
            console.log(response.status);
            console.log("there was a server issue");
        }
    }

    const createNewPassword = async (new_password, confirm_password) => {
        const response = await fetch(`http://127.0.0.1:8001/reset_password/<str:token>/`, {
            method: "POST",
            headers: {
                "Content-Type":"application/json",
            },

            body: JSON.stringify({
                new_password, confirm_password
            })

        });

        console.log(response)
        if(response.status === 200){
            console.log("New password created!");

        } else {
            console.log(response.status);
            console.log("There was a server issue");
        }
    }

    const updateProfile = async (formData, file) => {
        const data = new FormData();
        data.append('username', formData.username);
        data.append('email', formData.email);
        data.append('first_name', formData.first_name);
        data.append('last_name', formData.last_name);
        data.append('address', formData.address);
        data.append('address2', formData.address2);
        data.append('city', formData.city);
        data.append('state', formData.state);
        data.append('country', formData.country);
        data.append('phone', formData.phone);
        if (file) {
            data.append('profile_pic', file)
          }
    
        try {
            const response = await axios.put(`http://127.0.0.1:8001/update_profile/${id}/`, data, {
                headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization' : `Bearer ${localStorage.getItem("access")}`,
                },
            });
            console.log('Profile updated successfully:', response.data);
            toast.success("You have successfully updated your profile!")
        } catch (error) {
          console.error('Error updating profile:', error);
        }
    };

    function logout() {
        localStorage.removeItem("access")
        setIsAuthenticated(false)
      }


    const authValue = {isAuthenticated, username, setIsAuthenticated, get_username, get_user_id, registerUser, changePassword, resetPassword, createNewPassword, updateProfile, logout}

    return <AuthContext.Provider value={authValue}>
        {children}    </AuthContext.Provider>


}
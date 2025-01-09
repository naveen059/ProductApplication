import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Profile() {
    const [user, setUser] = useState({username: "", email:""});
    const navigate = useNavigate();

    useEffect(() => {
        const getUserDtails = async () => {
            const token = localStorage.getItem("token");

            try{
                const response = await axios.get("/api/users/profile", {
                    headers : {
                        "Authorization" : `Bearer ${token}`
                    }
                })


                const {username, email} = response.data;

                setUser({username: username, email: email});

                console.log("user deatils are valid");
            }catch(error){
                console.log("Error occured " , error);
            }
        }

        getUserDtails();
        

    })
  return (

    <div className="container mt-6">
        {user ? (
            <div className="card">
                <div className="card-header">User details</div>
                <div className="card-body">
                    <h4>{user.username}</h4>
                    <p>{user.email}</p>
                </div>
            </div>
        ) : (
            setTimeout(() => {
                navigate("/login")
            })
        )}
        
    </div>
  )
}

export default Profile
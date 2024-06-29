import Navbar from "../Navbar/Navbar";
import './Profile.css'
import { useState, useEffect } from "react";
import en from '../../translation/en';
import geo from '../../translation/geo';
function Profile() {
    const [content, setContent] = useState(en);
    const [lan, setLan] = useState("en")
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const lan = localStorage.getItem("language");
        if (lan) {
            lan === "en" ? changeToEn() : changeToGeo();
        }
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setIsAuthenticated(true);
            setUser(JSON.parse(storedUser));
            }
        }, []);
            
        const changeToEn = () => {
            setContent(en);
            setLan("en");
            localStorage.setItem("language", "en");
        };
                
    const changeToGeo = () => {
        setContent(geo);
        setLan("geo");
        localStorage.setItem("language", "geo");
    };
    return (
        <>
            <Navbar lan={lan}></Navbar>
            <div style={{display: 'flex', alignItems: 'center', height: "80vh"}}>
                <div className="profile-card">
                {user ? (
                        <>
                            <img src="src/assets/imgs/profile.png" alt="Profile" className="profile-image" />
                            <h2 className="profile-name">{lan == 'en' ? "Username: " : "სახელი"}: {user.email}</h2>
                            <a href="https://facebook.com" style={{textDecoration: "none", color: "white"}}>Facebook</a>
                        </>
                    ) : (
                        <p>{lan == "en" ? "No user data available!" : "გააქტიურეთ ანგარიში!"}</p>
                    )}
                </div>
            </div>
        </>
    );
}

export default Profile;
import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import en from '../../translation/en';
import geo from '../../translation/geo';
import './Authentication.css';

function Authentication() {
    const [content, setContent] = useState(en);
    const [lan, setLan] = useState("en");
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        let language = localStorage.getItem("language");
        if (language) {
            language === "en" ? setContent(en) : setContent(geo);
        } else {
            language = "en";
            localStorage.setItem("language", language);
        }
        setLan(language);

        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setIsAuthenticated(true);
        }
    }, []);

    const handleLogin = (e) => {
        e.preventDefault();
        const user = {
            email,
            password,
        };
        localStorage.setItem("user", JSON.stringify(user));
        setIsAuthenticated(true);
    };

    const handleLogout = () => {
        localStorage.removeItem("user");
        setIsAuthenticated(false);
    };

    if (isAuthenticated) {
        return (
            <>
                <Navbar lan={lan}></Navbar>
                <div className="container auth-container" style={{flexDirection: 'column', gap: '1.5rem'}}>
                    <h2>Welcome back!</h2>
                    <button onClick={handleLogout} style={{backgroundColor: "#dc3545"}} className="btn btn-primary">Logout</button>
                </div>
            </>
        );
    }

    return (
        <>
            <Navbar lan={lan}></Navbar>
            <div className="container auth-container">
                <form className='auth-form' onSubmit={handleLogin}>
                    <div className="form-group">
                        <label style={{color: 'white'}} htmlFor="email">{content.Authentication.email}</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="email" 
                            placeholder={content.Authentication.email} 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label style={{color: 'white'}} htmlFor="password">{content.Authentication.password}</label>
                        <input 
                            type="password" 
                            className="form-control" 
                            id="password" 
                            placeholder={content.Authentication.password} 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div style={{display: 'flex', gap:'1rem'}}>
                        <button type="submit" className="btn btn-primary">{content.Authentication.authBtn}</button>
                        <button type="button" className="btn btn-primary btn-fb">
                            <img src="src/assets/imgs/fb.png" alt="" />
                            <span>{content.Authentication.authBtn}</span>
                        </button>
                        <button type="button" className="btn btn-primary btn-fb">
                            <img src="src/assets/imgs/google.png" alt="" />
                            <span>{content.Authentication.authBtn}</span>
                        </button>
                    </div>
                    <br />
                    <a href="#" className="forgot">{content.Authentication.forgot}</a>
                </form>
            </div>
        </>
    );
}

export default Authentication;

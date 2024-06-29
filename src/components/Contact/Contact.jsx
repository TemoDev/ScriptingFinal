import React, { useState, useEffect } from 'react';
import './Contact.css';
import Navbar from '../Navbar/Navbar';
import en from '../../translation/en';
import geo from '../../translation/geo';
function Contact() {
    const [content, setContent] = useState(en);
    const [lan, setLan] = useState("en")

    useEffect(() => {
        const lan = localStorage.getItem("language");
        if (lan) {
            lan === "en" ? changeToEn() : changeToGeo();
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

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
        alert("Form submitted!");
    };
    return (
        <>
            <Navbar lan={lan}></Navbar>
            <div className="container contact-container">
                <div className="contact-form-container">
                    <h1>{content.Contact.title}</h1>
                    <form onSubmit={handleSubmit} className="contact-form">
                        <div className="form-group">
                            <label htmlFor="name">{content.Contact.name}:</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">{content.Contact.email}:</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="message">{content.Contact.text}:</label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                            ></textarea>
                        </div>

                        <label for="terms" style={{color: "black", display: 'flex', alignItems: "center", cursor: "pointer", marginBottom: "1.2rem", gap: "5px"}}>
                        <input type="checkbox" id="terms" name="terms" value="agree" />
                            {lan == "en" ? "Subscribe to the newsletter" : "გამოიწერეთ სიახლეები"}
                        </label>
                        
                        <button type="submit" className="btn-primary">{content.Contact.submitBtn}</button>
                    </form>
                    <div style={{color: "black", "marginTop" : "1.2rem"}}>
                        <p>{lan == "en" ? "Address: Tbilisi" : "მისამართი: თბილისი"}</p>
                        <p>{lan == "en" ? "Phone: +955 555 555 555" : "ტელეფონი: +955 555 555 555"}</p>
                        <p>{lan == "en" ? "Email: commerce@gmail.com" : "იმეილი: commerce@gmail.com"}</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Contact;
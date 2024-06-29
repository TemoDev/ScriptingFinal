import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';
import en from '../../translation/en';
import geo from '../../translation/geo';

function Navbar({ onSearch, lan }) {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");
  const [collapsed, setCollapsed] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [content, setContent] = useState(en);

  useEffect(() => {
    lan === "en" ? setContent(en) : setContent(geo);
  }, [lan]);

  const handleBurger = () => {
    setCollapsed((e) => !e);
  };

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchInput(value);
    onSearch(value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <>
      <nav>
        <div className="container row">
          <h1 className="logo">
            E-commerce
          </h1>
          <div className={collapsed ? "burger" : "burger burger--active"} onClick={handleBurger}></div>
          <ul className={collapsed ? "nav-links" : "nav-links nav-links--visible"}>
            {content.Navbar.links.map((l, index) => (
              <li key={index}>
                <a onClick={() => navigate(l.linkTo)} className="nav-link">{l.text}</a>
              </li>
            ))}
            <li className="nav-profile">
              <span href="nav-profile-icon" onClick={toggleDropdown}>{lan == "en" ? "Profile" : "პროფილი"}</span>
              {dropdownOpen && (
                <div className="nav-dropdown-menu">
                  <a onClick={() => navigate('/profile')} className="nav-dropdown-item">{lan == "en" ? "Profile" : "პროფილი"}</a>
                  <a onClick={() => navigate('/cart')} className="nav-dropdown-item">{lan == "en" ? "Cart" : "კალათა"}</a>
                </div>
              )}
            </li>
            <form className='nav-search' role="search" onSubmit={handleSearchSubmit}>
              <input
                className="nav-input me-2"
                type="search"
                placeholder={content.Navbar.search}
                aria-label="Search"
                value={searchInput}
                onChange={handleSearchChange}
              />
            </form>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;

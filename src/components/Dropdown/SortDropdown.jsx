import { useState, useEffect } from "react";
import './Dropdown.css'
import en from '../../translation/en';
import geo from '../../translation/geo';

function SortDropdown({onSort, lan}) {
    const [dropDownOpen, setDropDownOpen] = useState(false);
    const [content, setContent] = useState(en);
    
    useEffect(() => {
      lan === "en" ? setContent(en) : setContent(geo);
    }, [lan]);
    
    const toggleDropDown = () => {
        setDropDownOpen(!dropDownOpen);
    }

    const handleSort = (dir) => {
        onSort(dir);
        setDropDownOpen(false);
    }

    return (
        <>
            <div className="dropDown_container">
                <span className="btn-primary" style={{textAlign: 'center'}} onClick={toggleDropDown}>{content.Sort.sort}</span>
                <div className="topBar-item" >
                    {dropDownOpen && (
                        <ul className={dropDownOpen ? "dropdown-menu_show" : "dropdown-menu"}>
                            <li className="dropdown-item" onClick={() => handleSort("inc")}>{content.Sort.increasing}</li>
                            <li className="dropdown-item" onClick={() => handleSort("dec")}>{content.Sort.decreasing}</li>
                        </ul>
                    )}
                </div>
            </div>
        </>
    );
}

export default SortDropdown;
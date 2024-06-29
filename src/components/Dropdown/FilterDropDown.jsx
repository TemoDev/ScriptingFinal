import { useState, useEffect } from "react";
import './Dropdown.css'
import en from '../../translation/en';
import geo from '../../translation/geo';

function FilterDropDown({ onFilter, lan }) {
    const [dropDownOpen, setDropDownOpen] = useState(false);
    const [content, setContent] = useState(en);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(Infinity);

    useEffect(() => {
        lan === "en" ? setContent(en) : setContent(geo);
    }, [lan]);

    const toggleDropDown = () => {
        setDropDownOpen(!dropDownOpen);
    }

    const handleCheckboxChange = (category) => {
        setSelectedCategories(prev => {
            if (prev.includes(category)) {
                return prev.filter(cat => cat !== category);
            } else {
                return [...prev, category];
            }
        });
    }

    const handlePriceChange = (e) => {
        const { name, value } = e.target;
        const price = Math.max(0, Number(value)); 

        if (name === "minPrice") {
            setMinPrice(price);
        } else {
            setMaxPrice(price);
        }
        
    }
    
    useEffect(() => {
        onFilter({ categories: selectedCategories, minPrice, maxPrice });
    }, [selectedCategories, minPrice, maxPrice])

    const handleReset = () => {
        setSelectedCategories([]);
        setMinPrice(0);
        setMaxPrice(Infinity);
        onFilter({ categories: [], minPrice: 0, maxPrice: Infinity });
    }

    return (
        <>
            <div className="dropDown_container">
                <span className="btn-primary" style={{ textAlign: 'center' }} onClick={toggleDropDown}>{content.Filter.filter}</span>
                <div className="topBar-item">
                    {dropDownOpen && (
                        <ul className="dropdown-menu_show">
                            <li className="dropdown-item">
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={selectedCategories.includes("Mobile Phones")}
                                        onChange={() => handleCheckboxChange("Mobile Phones")}
                                    />
                                    {content.Filter.mobile}
                                </label>
                            </li>
                            <li className="dropdown-item">
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={selectedCategories.includes("Laptops")}
                                        onChange={() => handleCheckboxChange("Laptops")}
                                    />
                                    {content.Filter.laptop}
                                </label>
                            </li>
                            <li className="dropdown-item">
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={selectedCategories.includes("Audio Systems")}
                                        onChange={() => handleCheckboxChange("Audio Systems")}
                                    />
                                    {content.Filter.audio}
                                </label>
                            </li>
                            <li className="dropdown-item">
                                <label>
                                    {content.Filter.minPrice}
                                    <input
                                        type="number"
                                        name="minPrice"
                                        value={minPrice}
                                        onChange={handlePriceChange}
                                        min="0"
                                    />
                                </label>
                            </li>
                            <li className="dropdown-item">
                                <label>
                                    {content.Filter.maxPrice}
                                    <input
                                        type="number"
                                        name="maxPrice"
                                        value={maxPrice === Infinity ? '' : maxPrice}
                                        onChange={handlePriceChange}
                                        min="0"
                                    />
                                </label>
                            </li>
                            <li className="dropdown-item">
                                <button onClick={handleReset}>{content.Filter.off}</button>
                            </li>
                        </ul>
                    )}
                </div>
            </div>
        </>
    );
}

export default FilterDropDown;

import React from "react";
import styles from './Dropdown.module.css';

const Dropdown = ({listOfOptions, setSelectedOption}) => {

    const handleDropdown = (newSelectedOption) => {
        setSelectedOption(newSelectedOption);
    }

    return (
        <select onChange={(e) => handleDropdown(e.target.value)} className={styles.dropdown} >
            {
                listOfOptions.map((item) => {
                    return <option key={item} value={item}>{item}</option>;
                })
            }
        </select>
    );
}

export default Dropdown;
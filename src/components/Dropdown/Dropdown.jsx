import React from "react";
import styles from './Dropdown.module.css';

const Dropdown = ({listOfOptions, setSelectedOption}) => {

    const handleDropdown = (newSelectedOption) => {
        setSelectedOption(newSelectedOption);
    }

    return (
        <select onChange={(e) => handleDropdown(e.target.value)} className={styles.dropdown} >
            {
                listOfOptions.map((item, idx) => {
                    if (idx === 0) {
                        return <option value='' disabled key={idx} selected>Select category</option>
                    }
                    return <option key={item} value={item}>{item}</option>;
                })
            }
        </select>
    );
}

export default Dropdown;
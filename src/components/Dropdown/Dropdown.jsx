import React from "react";

const Dropdown = ({listOfOptions, setSelectedOption}) => {

    const handleDropdown = (newSelectedOption) => {
        console.log(newSelectedOption);
        // setSelectedOption();
    }

    return (
        <select onChange={(e) => handleDropdown(e.target.value)}>
            {
                listOfOptions.map((item) => {
                    return <option key={item} value={item}>{item}</option>;
                })
            }
        </select>
    );
}

export default Dropdown;
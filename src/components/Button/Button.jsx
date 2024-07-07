import React from "react";
import styles from './Button.module.css';
import { getLinearGradient } from "../../helpers/helpers";

const Pill = ({children, type, handleFunction, bgColor, color}) => {
    return (
        <button style={{
            backgroundImage: getLinearGradient(type),
            backgroundColor: bgColor,
            color: color
        }} className={styles.button}
        onClick={handleFunction}
        >{children}</button>
    );
}

export const IconButton = ({children, color, handleExpenses}) => {
    return (
        <button style={{
            backgroundColor: color,
            color: 'var(--color-light)'
        }} className={styles.roundBtn} 
        onClick={handleExpenses}
        >{children}</button>
    );
}

export default Pill;
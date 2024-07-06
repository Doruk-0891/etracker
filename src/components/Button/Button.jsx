import React from "react";
import styles from './Button.module.css';
import { getLinearGradient } from "../../helpers/helpers";

const Pill = ({children, type}) => {
    return (
        <button style={{
            backgroundImage: getLinearGradient(type)
        }} className={styles.button}>{children}</button>
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
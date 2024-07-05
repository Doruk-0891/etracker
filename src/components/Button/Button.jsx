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


export default Pill;
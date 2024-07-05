import React from "react";
import Pill from "../Button/Button";
import styles from './Card.module.css';
import { getColor } from "../../helpers/helpers";

const Card = ({type}) => {
    return (
        <div className={styles.container}>
            <h3 className={styles.header}>{
                type === 'addIncome' ? 'Wallet Balance: ' : 'Expenses: '
                } 
                <span style={{
                color: getColor(type)
            }}>₹4500</span></h3>
            <Pill type={type}>
                {
                    type === 'addIncome' ? '+ Add Income' : '+ Add Expense'
                }
            </Pill>
        </div>
    );
}

export default Card;
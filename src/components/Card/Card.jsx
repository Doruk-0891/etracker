import React, { useContext } from "react";
import Pill from "../Button/Button";
import styles from './Card.module.css';
import { getColor } from "../../helpers/helpers";
import { ExpensesContext, ModalOpenCloseContext, ModalTypeContext } from "../../context/context";

const Card = ({type}) => {
    const {expenses, handleExpenses} = useContext(ExpensesContext);
    const {openModal, setOpenModal} = useContext(ModalOpenCloseContext);
    const {modalType, setModalType} = useContext(ModalTypeContext);

    const {walletBalance, expenseAmount, expensesList} = expenses;

    const cardColorType = getColor(type);

    const cardType = type === 'addIncome' 
    ? {
        btnTitle: '+ Add Income',
        color: cardColorType,
        title: 'Wallet Balance: ',
        amount: walletBalance
    } 
    : {
        btnTitle: '+ Add Expense',
        color: cardColorType,
        title: 'Expenses: ',
        amount: expenseAmount,
    };

    return (
        <div className={styles.container}>
            <h3 className={styles.header}>{cardType['title']} 
                <span 
                style={{color: cardType['color']}}>
                    ₹{cardType['amount']}
                </span>
            </h3>
            <Pill type={type} handleFunction={() => {
                setOpenModal(true);
                setModalType(() => type === 'addIncome' ? 'wallet': 'expense');
                }}>
                {
                    cardType['btnTitle']
                }
            </Pill>
        </div>
    );
}

export default Card;
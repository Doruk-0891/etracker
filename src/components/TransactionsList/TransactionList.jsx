import React, { useContext } from "react";
import { FaRegTimesCircle, FaPen } from "react-icons/fa";
import styles from './TransactionList.module.css';
import { IconButton } from "../Button/Button";
import Pagination from '@mui/material/Pagination';
import { ExpensesContext } from "../../context/context";
import { getCategoryIcon } from "../../helpers/helpers";

const TransactionList = () => {
    const {expenses, handleExpenses} = useContext(ExpensesContext);
    const {expensesList} = expenses;

    return (
            <div className={styles.container}>
                {
                    expensesList.map((expense) => {
                        const {category, title, price, date, id} = expense;
                        return (<div className={styles.listWrapper} key={id}>
                            <div className={styles.listLeft}>
                                <div className={styles.icon}>
                                    {
                                        getCategoryIcon(category)
                                    }
                                </div>
                                <div className={styles.details}>
                                    <h4>{title}</h4>
                                    <h4 className={styles.date}>{date}</h4>
                                </div>
                            </div>
                            <div className={styles.listRight}>
                                <h4>₹{price}</h4>
                                <IconButton color='var(--color-red)' handleExpenses={() => handleExpenses('delete', expense)}>
                                    <FaRegTimesCircle style={{
                                        height: '100%'
                                    }}/>
                                </IconButton>
                                <IconButton color='var(--color-gold)'>
                                    <FaPen style={{
                                        height: '100%'
                                    }} />
                                </IconButton>
                            </div>
                        </div>)
                    })
                }
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Pagination count={1} variant="outlined" shape="rounded"
                    />
                </div>

            </div>
            
    );
}

export default TransactionList;
import React from "react";
import { FaPizzaSlice, FaRegTimesCircle, FaPen, FaLongArrowAltLeft , FaLongArrowAltRight  } from "react-icons/fa";
import styles from './TransactionList.module.css';
import { IconButton } from "../Button/Button";
import Pagination from '@mui/material/Pagination';

const TransactionList = () => {
    const tempArr = [1, 2, 3, 4];
    return (
        <div className={styles.wrapper}>
            <h2 className={styles.header}>Recent  Transactions</h2>
            <div className={styles.container}>
                {
                    tempArr.map((temp) => {
                        return (<div className={styles.listWrapper}>
                            <div className={styles.listLeft}>
                                <div className={styles.icon}>
                                    <FaPizzaSlice style={{
                                        height: '100%'
                                    }} />
                                </div>
                                <div className={styles.details}>
                                    <h4>Samosa</h4>
                                    <h4 className={styles.date}>March 20, 2024</h4>
                                </div>
                            </div>
                            <div className={styles.listRight}>
                                <h4>₹150</h4>
                                <IconButton color='var(--color-red)'>
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
            
        </div>
    );
}

export default TransactionList;
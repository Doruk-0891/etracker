import React from "react";
import ETrackerWrapper from "../components/ExpenseTrackerWrapper/ETrackerWrapper";
import TransactionList from "../components/TransactionsList/TransactionList";
import Graph from "../components/Graph/Graph";
import styles from  './Home.module.css';

const HomePage = () => {
    return (
        <div style={{
            height: '100%',
            width: '100%',
            backgroundColor: 'var(--color-primary-gray)',
            borderRadius: '3px',
            padding: '1rem'
        }}>
            <ETrackerWrapper />
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                gap: '30px',
                marginTop: '40px'
            }}>
                <div style={{
                    flex: '2 1 auto'
                }}>
                    <div className={styles.wrapper}>
                        <h2 className={styles.header}>Top Expenses</h2>
                        <>
                            <TransactionList />
                        </>
                    </div>
                </div>
                <div style={{
                    flex: '1 1 auto'
                }}>
                    <div className={styles.wrapper}>
                        <h2 className={styles.header}>Top Expenses</h2>
                        <div className={styles.container}>
                            <Graph type='bar' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;


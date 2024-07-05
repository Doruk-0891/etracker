import React from "react";
import Card from "../Card/Card";
import styles from './ETracker.module.css';

const ETrackerWrapper = () => {
    return (
        <div className={styles.wrapper}>
            <h2 className={styles.header}>
                Expense Tracker
            </h2>
            <div className={styles.container}>
                <Card type='addIncome' />
                <Card type='expense' />
            </div>
        </div>
    );
}

export default ETrackerWrapper;
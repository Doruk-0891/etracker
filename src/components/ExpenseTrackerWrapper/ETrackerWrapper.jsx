import React from "react";
import Card from "../Card/Card";
import Graph from "../Graph/Graph";
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
                <Graph type='pie' />
            </div>
        </div>
    );
}

export default ETrackerWrapper;
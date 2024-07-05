import React from "react";
import ETrackerWrapper from "../components/ExpenseTrackerWrapper/ETrackerWrapper";
import TransactionList from "../components/TransactionsList/TransactionList";
import Graph from "../components/Graph/Graph";

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
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '30px',
                marginTop: '40px'
            }}>
                <div style={{
                    flex: '2 1 auto'
                }}>
                    <TransactionList />
                </div>
                <div style={{
                    flex: '1 1 auto',
                    outline: '1px solid red'
                }}>
                    <Graph type='pie' />
                </div>
            </div>
        </div>
    );
}


const dataSet = [
    {
        id: 1,
        category: 'Food',
        expenses: '150'
    },
    {
        id: 2,
        category: 'Entertainment',
        expenses: '300'
    },
    {
        id: 3,
        category: 'Others',
        expenses: '1000'
    }
];

export default HomePage;


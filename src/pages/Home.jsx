import React from "react";
import ETrackerWrapper from "../components/ExpenseTrackerWrapper/ETrackerWrapper";

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
        </div>
    );
}

export default HomePage;
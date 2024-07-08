import { FaPizzaSlice, FaGift, FaCar, FaDollarSign  } from "react-icons/fa";

export const getLinearGradient = (type) => {
    switch(type) {
        case 'addIncome':
            return 'linear-gradient(90deg, #B5DC52 0%, #89E148 100%)';
        case 'expense':
            return 'linear-gradient(90deg, #FF9595 0%, #FF4747 80%, #FF3838 100%)';
        default:
            return '';
    }
} 

export const getColor = (type) => {
    switch(type) {
        case 'addIncome':
            return 'var(--color-limegreen)';
        case 'expense':
            return 'var(--color-gold)';
        default:
            return '';
    }
}


export const getCategoryIcon = (category) => {
    switch(category.toLowerCase()) {
        case 'food':
            return <FaPizzaSlice style={{
                height: '100%'
            }} />;
        
        case 'entertainment': 
            return <FaGift style={{
                height: '100%'
            }} />;
        
        case 'travel':
            return <FaCar style={{
                height: '100%'
            }} />;
        default: 
            return <FaDollarSign style={{
                height: '100%'
            }} />; 
    }
}

export const capitalizeText = (text) => {
    return text.charAt(0).toUpperCase()+text.slice(1);
}

export const setLocalStorage = (expense) => {
    const {walletBalance, expenseAmount, expensesList} = expense;
    localStorage.setItem('walletBalance', walletBalance);
    localStorage.setItem('expenseAmount', expenseAmount);
    localStorage.setItem('expensesList', JSON.stringify(expensesList));
}
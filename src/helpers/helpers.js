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

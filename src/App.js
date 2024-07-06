import { useState } from "react";
import { Outlet } from "react-router-dom";
import { ExpensesContext } from "./context/context";

function App() {
  const [expenses, setExpenses] = useState({
      walletBalance: 5000,
      expenseAmount: 500,
      expensesList: [
        {
          id: 1,
          category: 'Food',
          title: 'Samosa',
          price: 150,
          date: 'March 22, 2024'
        },
        {
          id: 2,
          category: 'Entertainment',
          title: 'Driving',
          price: 150,
          date: 'March 22, 2024'
        },
        {
          id: 3,
          category: 'Travel',
          title: 'Manali',
          price: 150,
          date: 'March 22, 2024'
        },
        {
          id: 4,
          category: 'Other',
          title: 'Relax',
          price: 150,
          date: 'March 22, 2024'
        }
      ],
  });

  const handleExpenses = (operation, newExpense) => {
    const expensesList = expenses['expensesList'];
    switch(operation) {
      case 'delete':
        const newExpenseList = expenses['expensesList'].filter((expense) => expense.id !== newExpense.id);
        setExpenses(prevExpense => {
          return {...prevExpense, 'expensesList': newExpenseList};
        });
        break;
      
      case 'add': 
        setExpenses(prevExpense => {
          return {...prevExpense, 'expensesList': [...expensesList, newExpense]};
        });
        break;
      
      case 'edit':
        let updatedExpense = expensesList;
        const updatedIndex = expensesList.findIndex(expense => expense.id === newExpense.id);
        if (updatedIndex === -1) {
          return;
        }
        updatedExpense[updatedIndex] = newExpense;
        setExpenses(prevExpense => {
          return {...prevExpense, 'expensesList': updatedExpense}
        });
        break;

      default: 
        console.log('Something went wrong');
        break;
    }
  }
  
  return (
    <ExpensesContext.Provider value={{expenses, handleExpenses}}>
      <div className="App">
        <Outlet />
      </div>
    </ExpensesContext.Provider>
  );
}

export default App;

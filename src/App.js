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

  const handleExpenses = (newExpense) => {
    const expensesList = expenses['expensesList'];
    setExpenses(prevExpenses => {
      return {...prevExpenses, 'expensesList': [...expensesList, newExpense]}
    });
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

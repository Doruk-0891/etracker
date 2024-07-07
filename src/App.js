import { useState } from "react";
import { Outlet } from "react-router-dom";
import { ExpensesContext, ModalOpenCloseContext, ModalTypeContext } from "./context/context";
import AddWallet from "./components/AddForm/AddWallet";

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
          category: 'Food',
          title: 'Manali',
          price: 100,
          date: 'March 22, 2024'
        },
        {
          id: 4,
          category: 'Other',
          title: 'Relax',
          price: 150,
          date: 'March 22, 2024'
        },
        {
          id: 5,
          category: 'Food',
          title: 'Manali',
          price: 100,
          date: 'March 22, 2024'
        },
      ],
  });

  const [openModal, setOpenModal] = useState(false);

  const [modalType, setModalType] = useState({
    type: '',
    data: null
  });

  const handleExpenses = (operation, newExpense) => {
    const {expensesList, walletBalance, expenseAmount} = expenses;
    switch(operation) {
      case 'delete':
        const newExpenseList = expenses['expensesList'].filter((expense) => expense.id !== newExpense.id);
        setExpenses(prevExpense => {
          return {...prevExpense, 'expensesList': newExpenseList};
        });
        break;
      
      case 'add': 
        setExpenses(prevExpense => {
          return {
            'walletBalance': walletBalance-newExpense['price'], 
            'expenseAmount': expenseAmount+newExpense['price'],
            'expensesList': [...expensesList, newExpense]};
        });
        break;
      
      case 'edit':
        let updatedExpense = expensesList;
        const updatedIndex = expensesList.findIndex(expense => expense.id === newExpense.id);
        console.log(newExpense, updatedIndex);
        if (updatedIndex === -1) {
          return;
        }
        const prevExpenseItem = expensesList[updatedIndex];
        updatedExpense[updatedIndex] = newExpense;
        setExpenses(prevExpense => {
          return {
            'walletBalance': walletBalance-prevExpenseItem['price']+newExpense['price'], 
            'expenseAmount': expenseAmount-prevExpenseItem['price']+newExpense['price'],
            'expensesList': updatedExpense
          }
        });
        break;
      
      case 'addToWallet': 
        setExpenses(prevExpense => {
          return {...prevExpense, 'walletBalance': walletBalance+newExpense};
        });
        break;

      default: 
        console.log('Something went wrong');
        break;
    }
  }

  return (
    <ExpensesContext.Provider value={{expenses, handleExpenses}}>
      <ModalOpenCloseContext.Provider value={{openModal, setOpenModal}}>
        <ModalTypeContext.Provider value={{modalType, setModalType}}>
          <div className="App">
            <AddWallet />
            <Outlet />
          </div>
        </ModalTypeContext.Provider>
      </ModalOpenCloseContext.Provider>
    </ExpensesContext.Provider>
  );
}

export default App;

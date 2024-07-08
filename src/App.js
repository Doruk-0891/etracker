import { useState } from "react";
import { Outlet } from "react-router-dom";
import { ExpensesContext, ModalOpenCloseContext, ModalTypeContext } from "./context/context";
import { SnackbarProvider, useSnackbar } from 'notistack'
import AddWallet from "./components/AddForm/AddWallet";
import { setLocalStorage } from "./helpers/helpers";

function App() {
  const [expenses, setExpenses] = useState({
      walletBalance: +localStorage.getItem('walletBalance') || 5000,
      expenseAmount: +localStorage.getItem('expenseAmount') || 0,
      expensesList: JSON.parse(localStorage.getItem('expensesList')) || []
  });

  const [openModal, setOpenModal] = useState(false);

  const [modalType, setModalType] = useState({
    type: '',
    data: null
  });

  const {enqueueSnackbar} = useSnackbar();

  const handleExpenses = (operation, newExpense) => {
    const {expensesList, walletBalance, expenseAmount} = expenses;
    switch(operation) {
      case 'delete':
        try {
          const newExpenseList = expenses['expensesList'].filter((expense) => expense.id !== newExpense.id);
          setExpenses(prevExpense => {
            return {...prevExpense, 'expensesList': newExpenseList};
          });
          setLocalStorage({...expenses, 'expensesList': newExpenseList});
        } catch (error) {
          console.error(error);
          enqueueSnackbar('Oops! Something went wrong.', {variant: 'error'});
        }
        break;
      
      case 'add': 
        try {
          setExpenses(prevExpense => {
            return {
              'walletBalance': walletBalance-newExpense['price'], 
              'expenseAmount': expenseAmount+newExpense['price'],
              'expensesList': [...expensesList, newExpense]};
          });
          setLocalStorage({
            'walletBalance': walletBalance-newExpense['price'], 
            'expenseAmount': expenseAmount+newExpense['price'],
            'expensesList': [...expensesList, newExpense]
          }
        );
          
        } catch (error) {
          console.error(error);
          enqueueSnackbar('Oops! Something went wrong.', {variant: 'error'});
        }
        break;
      
      case 'edit':
        try {
          let updatedExpense = expensesList;
          const updatedIndex = expensesList.findIndex(expense => expense.id === newExpense.id);
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
          setLocalStorage({
            'walletBalance': walletBalance-prevExpenseItem['price']+newExpense['price'], 
              'expenseAmount': expenseAmount-prevExpenseItem['price']+newExpense['price'],
              'expensesList': updatedExpense
          });
          
        } catch (error) {
          console.error(error);
          enqueueSnackbar('Oops! Something went wrong.', {variant: 'error'});
        }
        break;
      
      case 'addToWallet': 
        try {
          setExpenses(prevExpense => {
            return {...prevExpense, 'walletBalance': walletBalance+newExpense};
          });
          setLocalStorage({...expenses, 'walletBalance': walletBalance+newExpense});
        } catch (error) {
          console.error(error);
          enqueueSnackbar('Oops! Something went wrong.', {variant: 'error'});
        }
        break;

      default: 
        enqueueSnackbar('Oops! Somthing went wrong. Please check have you add correct details.', {variant: 'error'});
        break;
    }
  }

  return (
    <SnackbarProvider>
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
    </SnackbarProvider>
  );
}

export default App;

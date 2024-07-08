import React, { useContext, useEffect, useState } from "react";
import { FaRegTimesCircle, FaPen } from "react-icons/fa";
import styles from './TransactionList.module.css';
import { IconButton } from "../Button/Button";
import Pagination from '@mui/material/Pagination';
import { ExpensesContext, ModalOpenCloseContext, ModalTypeContext } from "../../context/context";
import { getCategoryIcon } from "../../helpers/helpers";
import { PER_PAGE } from "../../constants/constant";
import { useSnackbar } from "notistack";

const TransactionList = () => {
    const [page, setPage] = useState({
        pageCount: 1,
        index: 0
    });
    const {expenses, handleExpenses} = useContext(ExpensesContext);
    const {openModal, setOpenModal} = useContext(ModalOpenCloseContext);
    const {modalType, setModalType} = useContext(ModalTypeContext);
    const [paginatedList, setPaginatedList] = useState(expenses['expensesList'].slice(0, PER_PAGE));
    const {enqueueSnackbar} = useSnackbar();
    const {expensesList} = expenses;

    const handlePagination = (e, value) => {  
        const updatedIndex = value > page['pageCount'] ? page['index']+PER_PAGE : page['index']-PER_PAGE;
        const updatedPaginatedList = expensesList.slice(updatedIndex, updatedIndex+PER_PAGE);
        setPage({pageCount: value, index: updatedIndex});
        setPaginatedList(updatedPaginatedList);
    }

    const handleDeleteExpense = (expense) => {
        try {
            handleExpenses('delete', expense);
            enqueueSnackbar('Expense deleted succesfully!', {variant: 'success'});
        } catch (error) {
            console.error(error);
            enqueueSnackbar('Oops! Something went wrong.', {variant: 'error'});
        }
    }

    const handleEditExpense = (expense) => {
        try {
            setOpenModal(true);
            setModalType({
                type:'expense',
                data: {...expense}
            });
        } catch (error) {
            console.error(error);
            enqueueSnackbar('Oops! Something went wrong.', {variant: 'error'});
        }
    }

    return (
            <div className={styles.container}>
                {
                    paginatedList.map((expense) => {
                        const {category, title, price, date, id} = expense;
                        return (<div className={styles.listWrapper} key={id}>
                            <div className={styles.listLeft}>
                                <div className={styles.icon}>
                                    {
                                        getCategoryIcon(category)
                                    }
                                </div>
                                <div className={styles.details}>
                                    <h4>{title}</h4>
                                    <h4 className={styles.date}>{date}</h4>
                                </div>
                            </div>
                            <div className={styles.listRight}>
                                <h4>₹{price}</h4>
                                <IconButton color='var(--color-red)' handleExpenses={() => handleDeleteExpense(expense)}>
                                    <FaRegTimesCircle style={{
                                        height: '100%'
                                    }}/>
                                </IconButton>
                                <IconButton color='var(--color-gold)' handleExpenses={() => {
                                    handleEditExpense(expense)
                                }}>
                                    <FaPen style={{
                                        height: '100%'
                                    }} />
                                </IconButton>
                            </div>
                        </div>)
                    })
                }
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Pagination count={Math.ceil(expensesList.length / PER_PAGE)}
                    page={page['pageCount']} onChange={handlePagination} variant="outlined" shape="rounded"
                    />
                </div>

            </div>
            
    );
}

export default TransactionList;
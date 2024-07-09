import React, { useContext, useState } from "react";
import Modal from '@mui/material/Modal';
import { ExpensesContext, ModalOpenCloseContext, ModalTypeContext } from "../../context/context";
import styles from './AddForm.module.css';
import Pill from "../Button/Button";
import Dropdown from "../Dropdown/Dropdown";
import {CATEGORY} from '../../constants/constant';
import { capitalizeText } from "../../helpers/helpers";
import { useSnackbar } from "notistack";

const AddWallet = () => {
    const {openModal, setOpenModal} = useContext(ModalOpenCloseContext);
    const {expenses, handleExpenses} = useContext(ExpensesContext);
    const {modalType} = useContext(ModalTypeContext);

    const [addedAmount, setAddedAmount] = useState('');
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [selectedDate, setSelectedDate] = useState('');


    const {enqueueSnackbar} = useSnackbar();

    const handleAddExpense = () => {
        try {
            if (!title || !price || !category || !selectedDate) {
                enqueueSnackbar('Seems like some fields are missing.', {variant: 'warning'});
                return;
            }
            if (expenses['walletBalance']-(+price) < 0) {
                enqueueSnackbar("Not enough amount. Time to add balance into your wallet to add the expenses.", {variant: 'error'});
                return;
            }
            const newExpense = {
                "title": capitalizeText(title), 
                "price": +price, 
                category, 
                "date": selectedDate, 
                "id": !modalType['data'] ? Date.now() : modalType['data']['id']
            };
            
            if (!modalType['data']) {
                handleExpenses('add', newExpense);
                enqueueSnackbar('We got one more expense.', {variant:'success'});
            } else {
                handleExpenses('edit', newExpense);
                enqueueSnackbar('Expense got updated successfully', {variant: 'success'});
            }
            setTitle('');
            setCategory('');
            setPrice('');
            setSelectedDate('');
            setOpenModal(false);
            
        } catch (error) {
            console.error(error);
            enqueueSnackbar('Oops! Something went wrong.', {variant: 'error'});
        }
    }

    const handleAddToWallet = () => {
        try {
            if (!addedAmount) {
                enqueueSnackbar('Please make sure valid amount has to be added.', {variant: 'warning'});
                return;
            }
            handleExpenses('addToWallet', +addedAmount);
            setAddedAmount('');
            setOpenModal(false);
            enqueueSnackbar('Wallet updated successfully!', {variant: 'success'});
        } catch (error) {
            console.error(error);
            enqueueSnackbar('Oops! Something went wrong.', {variant: 'error'});
        }
    }

    const cancelWallet = () => {
        setAddedAmount('');
        setOpenModal(false);
    }

    const cancelAddEditExpense = () => {
        setTitle('');
        setCategory('');
        setPrice('');
        setSelectedDate('');
        setOpenModal(false);
    }

    const getHeading = () => {
        return modalType['type'] === 'wallet' 
                                ? 'Add Balance' 
                                : modalType['type'] === 'expense' && !modalType['data']
                                ? 'Add Expenses'
                                : 'Edit Expenses'
    }

    const getForm = (type) => {
        switch(type['type']) {
            case 'wallet':
                return (
                    <div className={styles.formContainer}>
                                <div>
                                    <input type="number" min='0' placeholder="Income Amount" value={addedAmount} onChange={(e) => setAddedAmount(e.target.value)} />
                                </div>
                                <div className={styles.btnContainer}>
                                    <Pill bgColor='var(--color-gold)' handleFunction={handleAddToWallet}>
                                        Add Amount
                                    </Pill>
                                    <Pill bgColor='var(--color-light)' color='var(--color-dark)'
                                    handleFunction={cancelWallet}
                                    >Cancel</Pill>
                                </div>
                            </div>
                );
            
            case 'expense':
                return (
                    <div className={styles.formContainer}>
                                
                                    <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                                    <input type="text" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />

                                    <Dropdown listOfOptions={CATEGORY}setSelectedOption={setCategory} />

                                    <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
                                
                                <div className={styles.btnContainer}>
                                    <Pill bgColor='var(--color-gold)' handleFunction={handleAddExpense}>
                                        {
                                            !modalType['data'] ? 'Add Expense' : 'Edit Expense'
                                        }</Pill>
                                    <Pill bgColor='var(--color-light)' color='var(--color-dark)'
                                    handleFunction={cancelAddEditExpense}
                                    >Cancel</Pill>
                                </div>
                            </div>
                );
            
            default:
                return '';
        }
    }

    return (
        <div className={styles.wrapper}>
            <Modal open={openModal}>
                <div className={styles.container}>
                        <h2 className={styles.header}>
                            {
                                getHeading()
                            }
                        </h2>
                        {
                            getForm(modalType)
                        }
                </div>
            </Modal>
        </div>
    );
}


export default AddWallet;
import React, { useContext, useState, useEffect } from "react";
import Modal from '@mui/material/Modal';
import { ExpensesContext, ModalOpenCloseContext, ModalTypeContext } from "../../context/context";
import styles from './AddForm.module.css';
import Pill from "../Button/Button";
import Dropdown from "../Dropdown/Dropdown";
import {CATEGORY} from '../../constants/constant';
import { capitalizeText } from "../../helpers/helpers";

const AddWallet = () => {
    const [addedAmount, setAddedAmount] = useState('');
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [selectedDate, setSelectedDate] = useState('');

    const {openModal, setOpenModal} = useContext(ModalOpenCloseContext);
    const {handleExpenses} = useContext(ExpensesContext);
    const {modalType} = useContext(ModalTypeContext);

    const handleAddExpense = () => {
        const newExpense = {
            "title": capitalizeText(title), 
            "price": +price, 
            category, 
            "date": selectedDate, 
            "id": !modalType['data'] ? Date.now() : modalType['data']['id']
        };
        
        if (!modalType['data']) {
            handleExpenses('add', newExpense);
        } else {
            handleExpenses('edit', newExpense);
        }
        setTitle('');
        setCategory('');
        setPrice('');
        setSelectedDate('');
        setOpenModal(false);
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
                                    <Pill bgColor='var(--color-gold)' handleFunction={() => {
                                        handleExpenses('addToWallet', +addedAmount);
                                        setAddedAmount('');
                                        setOpenModal(false);
                                    }} >Add Amount</Pill>
                                    <Pill bgColor='var(--color-light)' color='var(--color-dark)'
                                    handleFunction={() => {
                                        setAddedAmount('');
                                        setOpenModal(false);
                                    }}
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
                                    handleFunction={() => {
                                        setAddedAmount('');
                                        setOpenModal(false);
                                    }}
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
                                modalType['type'] === 'wallet' 
                                ? 'Add Balance' 
                                : modalType['type'] === 'expense' && !modalType['data']
                                ? 'Add Expenses'
                                : 'Edit Expenses'
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
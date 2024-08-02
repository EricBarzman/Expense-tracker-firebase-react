import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { db } from '../config/firebase-config';
import { useGetUserInfo } from '../hooks/useGetUserInfo';

export const useGetTransactions = () => {
    
    const [transactions, setTransactions] = useState([]);
    const transactionCollectionRef = collection(db, "transactions");
    const { userID } = useGetUserInfo();

    const [transactionTotals, setTransactionTotals] = useState({
        balance: 0.0,
        income: 0.0,
        expenses: 0.0,
    });

    const getTransactions = async () => {
        let unsubscribe;
        try {
            const queryTransactions = query(
                transactionCollectionRef,
                where("userID", "==", userID),
                orderBy("createdAt")
            );

            unsubscribe = onSnapshot(queryTransactions, (snapshot) => {

                let docs = [];
                let totalIncome = 0;
                let totalExpense = 0;

                snapshot.forEach((doc) => {
                    const data = doc.data();
                    const id = doc.id;
                    docs.push({ ...data, id })

                    if (data.transactionType === "expense") {
                        totalExpense += Number(data.transactionAmount);
                    } else {
                        totalIncome += Number(data.transactionAmount);
                    }
                });

                setTransactions(docs);
                let balance = totalIncome - totalExpense;
                setTransactionTotals({
                    balance,
                    expenses: totalExpense,
                    income: totalIncome
                });
            });

        } catch(err) {
            console.error(err);
        }

        return () => unsubscribe();
    };

    useEffect(() => {
        getTransactions();
    }, [])
    
    return { transactions, transactionTotals };
}
import { useState } from "react";
import { useAddTransaction } from "../../hooks/useAddTransaction"
import { useGetTransactions } from "../../hooks/useGetTransactions";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";

import "./styles.css";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../config/firebase-config";

export const ExpenseTracker = () => {

  const { addTransaction } = useAddTransaction();
  const { transactions, transactionTotals } = useGetTransactions();
  const { name, profilePhoto } = useGetUserInfo();
  const navigate = useNavigate();

  const [description, setDescription ] = useState("");
  const [transactionAmount, setTransactionAmount ] = useState(0);
  const [transactionType, setTransactionType ] = useState("expense");

  async function onSubmit(e) {
    e.preventDefault();
    addTransaction({
      description,
      transactionAmount,
      transactionType
    });
    setDescription("");
    setTransactionAmount(0);
    setTransactionType("expense");
  }

  async function signUserOut() {
    try {
      await signOut(auth);
      localStorage.removeItem("auth");
      navigate("/");
    } catch(err) {
      console.error(err);
    }
  }

  return (
    <>
      <div className="expense-tracker">
        <div className="container">
          <h1>{name}'s Expense Tracker</h1>
      
          <div className="balance">
            <h3>Your balance</h3>
            <h2>{transactionTotals.balance} €</h2>
          </div>
          <div className="summary">
            <div className="income">
              <h4>Income</h4>
              <p style={{ color: "green" }}>{transactionTotals.income} €</p>
            </div>
            <div className="expenses">
              <h4>Expenses</h4>
              <p style={{ color: "red" }}>{transactionTotals.expenses} €</p>
            </div>
          </div>
          <form className="add-transaction" onSubmit={onSubmit}>

            <input
              type="text"
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              required
            />
            
            <input
              type="number"
              onChange={(e) => setTransactionAmount(e.target.value)}
              placeholder="Amount"
              required
            />
            
            <input
              type="radio"
              onChange={(e) => setTransactionType(e.target.value)}
              id="expense"
              value="expense"
              checked={transactionType === 'expense'}
            />
            <label htmlFor="expense">Expense</label>
            
            <input
              type="radio"
              onChange={(e) => setTransactionType(e.target.value)}
              id="income"
              value="income"
              checked={transactionType === 'income'}
            />
            <label htmlFor="income">Income</label>

            <button type="submit">Add transaction</button>

          </form>
        </div>

        {profilePhoto && (
          <div className="profile">
            <img src={profilePhoto} className="profile-photo" alt="profile-photo" />
            <button className="sign-out-button" onClick={signUserOut}>Sign out</button>
          </div>
        )}

      </div>

      <div className="transactions">
        <h3>Transactions</h3>
        <ul>
          {transactions.map((transaction) => {
            const { description, transactionAmount, transactionType } = transaction
            return (
              <li key={description}>
                <h4>{description}</h4>
                <p>
                  {transactionAmount}€ - <label style={{ color: transactionType === "expense" ? "red" : "green" }}>{transactionType}</label>
                </p>
              </li>
            )
          })}
        </ul>
      </div>
    </>
  )
}
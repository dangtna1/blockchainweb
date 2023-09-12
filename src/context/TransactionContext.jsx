import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

import { transactionsABI, transactionsAddress } from "../utils/constants.jsx";

export const TransactionContext = React.createContext();

const createEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const transactionsContract = new ethers.Contract(transactionsAddress, transactionsABI, signer);

  return transactionsContract;
};

export const TransactionsProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [transactionCount, setTransactionCount] = useState(localStorage.getItem("transactionCount"));

  const checkIfWalletIsConnect = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask.");

      // const accounts = await ethereum.request({ method: "eth_accounts" });

      // if (accounts.length) {
      //   setCurrentAccount(accounts[0]);

      getAllTransactions();
    } catch (error) {
      console.log(error);
    }
  };

  const getAllTransactions = async () => {
    try {
      if (ethereum) {
        const transactionsContract = createEthereumContract();

        const availableTransactions = await transactionsContract.getAllTransactions();

        const structuredTransactions = availableTransactions.map((transaction) => ({
          addressTo: transaction.receiver,
          addressFrom: transaction.sender,
          timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
          amount: parseInt(transaction.amount._hex) / (10 ** 18)
        }));

        console.log(structuredTransactions);

        setTransactions(structuredTransactions);
      } else {
        console.log("Ethereum is not present");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkIfTransactionsExists = async () => {
    try {
      if (ethereum) {
        const transactionsContract = createEthereumContract();
        const currentTransactionCount = await transactionsContract.getTransactionCount();

        window.localStorage.setItem("transactionCount", currentTransactionCount);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const sendTransaction = async (addressFrom, addressTo, price) => {
    console.log(addressFrom, addressTo, price);
    price = price.toString();
    try {
      if (ethereum) {
        const transactionsContract = createEthereumContract();
        const parsedPrice = ethers.utils.parseEther(price);

        await ethereum.request({
          method: "eth_sendTransaction",
          params: [{
            from: addressFrom,
            to: addressTo,
            gas: "0x5208",
            value: parsedPrice._hex,
          }],
        });

        const transactionHash = await transactionsContract.addToBlockchain(addressTo, parsedPrice);

        await transactionHash.wait();

        const transactionsCount = await transactionsContract.getTransactionCount();

        setTransactionCount(transactionsCount.toNumber());
        // window.location.reload();
      } else {
        console.log("No ethereum object");
      }
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    checkIfWalletIsConnect(); //check and get all transactions
    checkIfTransactionsExists(); //check and update transaction count
  }, [transactionCount]);

  return (
    <TransactionContext.Provider
      value={{
        transactions, //help to render all transactions

        sendTransaction //the main one to process all transactions
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

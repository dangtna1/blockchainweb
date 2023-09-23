import { useState, createContext } from "react";

export const WalletAccountsContext = createContext()

export const WalletAccountsProvider = ({ children }) => {
    const [currentAccount, setCurrentAccount] = useState("");

    const connectWallet = async () => {
        try {
            if (!ethereum) return alert("Please install MetaMask.");
            const accounts = await ethereum.request({ method: "eth_requestAccounts", });
            setCurrentAccount(accounts[0]);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <WalletAccountsContext.Provider
            value={{
                currentAccount,

                setCurrentAccount,
                connectWallet,
            }}>
            {children}
        </WalletAccountsContext.Provider>
    )
}

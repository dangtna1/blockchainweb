import { useState, useEffect, createContext, useContext } from 'react'
import { ethers } from 'ethers'

import { WalletAccountsContext } from './WalletAccountsContext'
import { transactionABI, transactionAddress } from '../utils/constants'

export const TransactionContext = createContext()

const { ethereum } = window

const createTransactionContract = () => {
    // const privateKey = import.meta.env.VITE_PRIVATE_KEY; //to use this, create .env at root and include your private key there
    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner()
    // const wallet = new ethers.Wallet(privateKey, provider); //uncomment this
    const transactionContract = new ethers.Contract(transactionAddress, transactionABI, signer) //change signer to wallet
    return transactionContract
}

export const TransactionProvider = ({ children }) => {
    const [formData, setformData] = useState({
        addressTo: '',
        amount: '',
        message: '',
    })
    const { currentAccount, setCurrentAccount } = useContext(WalletAccountsContext)
    const [isLoading, setIsLoading] = useState(false)
    const [transactionCount, setTransactionCount] = useState()
    const [transactions, setTransactions] = useState([])
    const [walletBalance, setWalletBalance] = useState(0)

    const handleChange = (e, name) => {
        setformData((prevState) => ({ ...prevState, [name]: e.target.value }))
    }

    const getWalletBalance = async (
        walletAddress = '0x0D22c5b0dbD93AEb3bA644218363d5282B40fb5e'
    ) => {
        try {
            const provider = new ethers.providers.Web3Provider(ethereum)
            const balanceWei = await provider.getBalance(walletAddress, 'latest')
            const balanceEther = ethers.utils.formatEther(balanceWei)
            const floatBalance = parseFloat(balanceEther, 10)
            setWalletBalance(floatBalance)
        } catch (error) {
            console.error('Error getting wallet balance:', error.message)
        }
    }

    const getAllTransactions = async () => {
        try {
            if (ethereum) {
                const transactionContract = createTransactionContract()

                const availableTransactions = await transactionContract.getAllTransactions()
                console.log(availableTransactions)

                const structuredTransactions = availableTransactions.map((transaction) => ({
                    addressTo: transaction.receiver,
                    addressFrom: transaction.sender,
                    timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
                    message: transaction.message,
                    amount: parseInt(transaction.amount._hex) / 10 ** 18,
                }))

                console.log(structuredTransactions)

                setTransactions(structuredTransactions)
            } else {
                console.log('Ethereum is not present')
            }
        } catch (error) {
            console.log(error)
        }
    }

    const checkIfWalletIsConnectedAndFetchData = async () => {
        try {
            if (!ethereum) return alert('Please install MetaMask.')

            const accounts = await ethereum.request({ method: 'eth_accounts' })

            if (accounts.length) {
                setCurrentAccount(accounts[0]) //In case we don't need to connect wallet again because of cache memory
                getAllTransactions()
            } else {
                console.log('No accounts found')
            }
        } catch (error) {
            console.log(error)
        }
    }

    const getTheNumberOfTransactions = async () => {
        try {
            if (ethereum) {
                const transactionContract = createTransactionContract()

                const transactionCount = await transactionContract.getNumberOfTransactions()
                setTransactionCount(parseInt(transactionCount))
            }
        } catch (error) {
            console.log(error)
        }
    }

    const sendTransaction = async () => {
        try {
            if (ethereum) {
                const { addressTo, amount, message } = formData
                const transactionsContract = createTransactionContract()
                const parsedAmount = ethers.utils.parseEther(amount)

                await ethereum.request({
                    method: 'eth_sendTransaction',
                    params: [
                        {
                            from: currentAccount,
                            to: addressTo,
                            gas: '0x5208',
                            value: parsedAmount._hex,
                        },
                    ],
                })

                const transactionHash = await transactionsContract.addToBlockChain(
                    addressTo,
                    parsedAmount,
                    message
                )

                setIsLoading(true)
                console.log(`Loading - ${transactionHash.hash}`)
                await transactionHash.wait()
                console.log(`Success - ${transactionHash.hash}`)
                setIsLoading(false)

                const transactionCount = await transactionsContract.getNumberOfTransactions()

                setTransactionCount(parseInt(transactionCount))
            } else {
                //todo
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        checkIfWalletIsConnectedAndFetchData()
        getTheNumberOfTransactions()
        getWalletBalance(currentAccount)
    }, [transactionCount])

    useEffect(() => {
        window.ethereum.on('accountsChanged', (accounts) => {
            console.log('Change account')
            setCurrentAccount(accounts[0])
            console.log(accounts[0])
            getAllTransactions()

            getWalletBalance(accounts[0])
        })

        return () => {
            window.ethereum.removeAllListeners('accountsChanged')
        }
    }, [])

    return (
        <TransactionContext.Provider
            value={{
                transactionCount,
                transactions,
                currentAccount,
                isLoading,
                formData,
                walletBalance,

                sendTransaction,
                handleChange,
                getWalletBalance,
            }}
        >
            {children}
        </TransactionContext.Provider>
    )
}

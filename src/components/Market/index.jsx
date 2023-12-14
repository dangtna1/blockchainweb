import React, { useContext } from 'react'
import { SiEthereum } from 'react-icons/si'
import { BsInfoCircle } from 'react-icons/bs'

import { TransactionContext } from '../../context/TransactionContext'
import { shortenAddress } from '../../utils/shortenAddress'
import Loader from '../Loader'

const companyCommonStyles =
    'min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-main-400 text-sm bg-main-300 text-white'

const Input = ({ placeholder, name, type, value, handleChange }) => (
    <input
        placeholder={placeholder}
        type={type}
        step='0.0001'
        value={value}
        onChange={(e) => handleChange(e, name)}
        className='my-2 w-full rounded-lg p-2'
    />
)

const TransactionsCard = ({ addressTo, addressFrom, timestamp, message, amount }) => {
    return (
        <div
            className='bg-[#181918] m-4 flex flex-1
                2xl:min-w-[450px]
                2xl:max-w-[500px]
                sm:min-w-[270px]
                sm:max-w-[300px]
                min-w-full
                flex-col p-3 rounded-md hover:shadow-2xl'
        >
            <div className='flex flex-col items-center w-full mt-3'>
                <div className='display-flex justify-start w-full mb-6 p-2'>
                    <a
                        href={`https://sepolia.etherscan.io/address/${addressFrom}`}
                        target='_blank'
                        rel='noreferrer'
                    >
                        <p className='text-white text-base'>From: {shortenAddress(addressFrom)}</p>
                    </a>
                    <a
                        href={`https://sepolia.etherscan.io/address/${addressTo}`}
                        target='_blank'
                        rel='noreferrer'
                    >
                        <p className='text-white text-base'>To: {shortenAddress(addressTo)}</p>
                    </a>
                    <p className='text-white text-base'>Amount: {amount} ETH</p>
                    {message && (
                        <>
                            <br />
                            <p className='text-white text-base'>Message: {message}</p>
                        </>
                    )}
                </div>

                <div className='bg-black p-3 px-5 w-max rounded-3xl -mt-5 shadow-2xl'>
                    <p className='text-[#37c7da] font-bold'>{timestamp}</p>
                </div>
            </div>
        </div>
    )
}

const Market = () => {
    const {
        currentAccount,
        handleChange,
        sendTransaction,
        formData,
        isLoading,
        transactions,
        walletBalance,
    } = useContext(TransactionContext)

    const reversedTransactions = [...transactions].reverse()

    const handleSubmit = (e) => {
        const { addressTo, amount, message } = formData
        e.preventDefault()
        if (!addressTo || !amount || !message) return
        sendTransaction()
    }

    return (
        <div className='w-full'>
            <h1 className='mb-3 font-bold text-2xl self-start uppercase text-primary-200 w-full text-center laptop:text-left'>
                Exchange cryptocurrencies
            </h1>

            <div className='flex w-full justify-center items-start'>
                <div className='flex sm:flex-row flex-col justify-between md:p-10 px-6'>
                    <div className='flex flex-1 flex-col xl:mr-10'>
                        <h1 className='text-3xl py-1 text-primary-300 font-semibold'>
                            Send SepoliaETH <br /> across the world
                        </h1>
                        <p className='text-left mt-5 md:w-9/12 w-11/12 text-base text-primary-200'>
                            Explore the crypto world. Buy and sell cryptocurrencies easily.
                        </p>

                        <div className='grid xl:grid-cols-3 grid-cols-2 w-full mt-12'>
                            <div className={`rounded-tl-2xl ${companyCommonStyles}`}>
                                Reliability
                            </div>
                            <div className={companyCommonStyles}>Security</div>
                            <div className={`xl:rounded-tr-2xl ${companyCommonStyles}`}>
                                Ethereum
                            </div>
                            <div className={`xl:rounded-bl-2xl ${companyCommonStyles}`}>
                                Web 3.0
                            </div>
                            <div className={companyCommonStyles}>Low Fees</div>
                            <div className={`rounded-br-2xl ${companyCommonStyles}`}>
                                Blockchain
                            </div>
                        </div>
                    </div>

                    <div className='flex flex-col flex-1 items-center w-full xl:ml-10'>
                        <div className='p-3 flex justify-end items-start flex-col rounded-xl h-40 sm:w-72 w-full my-5 bg-gradient-to-bl from-green-500 via-blue-500 to-green-500'>
                            <div className='flex justify-between flex-col w-full h-full'>
                                <div className='flex justify-between items-start'>
                                    <div className='w-10 h-10 rounded-full border-2 border-white flex justify-center items-center'>
                                        <SiEthereum fontSize={21} color='#fff' />
                                    </div>
                                    <BsInfoCircle fontSize={17} color='#fff' />
                                </div>
                                <div>
                                    <p className='text-sm text-white'>
                                        {shortenAddress(currentAccount)}
                                    </p>
                                    <p className='text-white text-sm'>{walletBalance} SepoliaETH</p>
                                    <p className='font-semibold text-lg mt-1 text-white'>
                                        Ethereum
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className='p-5 sm:w-96 w-full flex flex-col justify-start items-center font-lato px-6 py-4 rounded-lg bg-main-100 w-full mx-2 max-w-[600px]'>
                            <Input
                                placeholder='Address To'
                                name='addressTo'
                                type='text'
                                handleChange={handleChange}
                            />
                            <Input
                                placeholder='Amount (ETH)'
                                name='amount'
                                type='number'
                                handleChange={handleChange}
                            />
                            <Input
                                placeholder='Enter Message'
                                name='message'
                                type='text'
                                handleChange={handleChange}
                            />

                            <div className='h-[1px] w-full bg-gray-400 my-2' />

                            {isLoading ? (
                                <Loader />
                            ) : (
                                <button
                                    type='button'
                                    onClick={handleSubmit}
                                    className='w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-main-300 rounded-full cursor-pointer'
                                >
                                    Send now
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className='flex w-full justify-center items-center'>
                <div className='flex flex-col md:p-12 py-12 px-4'>
                    {currentAccount ? (
                        <h3 className='text-3xl text-primary-300 font-semibold text-center my-2'>
                            Latest Transactions
                        </h3>
                    ) : (
                        <h3 className='text-3xl text-primary-300 font-semibold text-center my-2'>
                            Connect your account to see the latest transactions
                        </h3>
                    )}

                    <div className='flex flex-wrap justify-center items-center mt-10'>
                        {reversedTransactions.map((transaction, i) => (
                            <TransactionsCard key={i} {...transaction} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Market

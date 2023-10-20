import { useState, useEffect, createContext, useContext } from 'react'
import { ethers } from 'ethers'

import { WalletAccountsContext } from './WalletAccountsContext'
import { controllerAddress, controllerABI } from '../utils/constants'

export const ControllerContext = createContext()

const { ethereum } = window

const createControllerContract = () => {
    // const privateKey = import.meta.env.VITE_PRIVATE_KEY; //to use this, create .env at root and include your private key there
    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner()
    // const wallet = new ethers.Wallet(privateKey, provider); //uncomment this
    const controllerContract = new ethers.Contract(controllerAddress, controllerABI, signer) //change signer to wallet
    return controllerContract
}

export const ControllerProvider = ({ children }) => {
    const { currentAccount, setCurrentAccount } = useContext(WalletAccountsContext)
    const [controllersInfo, setControllersInfo] = useState([])
    const [controllersCount, setControllersCount] = useState()

    const checkIfWalletIsConnectedAndFetchData = async () => {
        try {
            if (!ethereum) return window.alert('Please install metamask.')

            const accounts = await ethereum.request({ method: 'eth_accounts' })
            if (accounts.length) {
                setCurrentAccount(accounts[0]) //In case we don't need to connect wallet again because of cache memory
                getAllControllersInfo()
            } else {
                console.log('No accounts found')
            }
        } catch (error) {
            console.log(error)
            window.alert('No ethereum object')
        }
    }

    const getTheNumberOfControllersInfo = async () => {
        try {
            if (ethereum) {
                const controllerContract = createControllerContract()

                const controllersCount = await controllerContract.getNumberOfControllersInfo()
                setControllersCount(parseInt(controllersCount))
            }
        } catch (error) {
            console.log(error)
            window.alert('No ethereum object')
        }
    }

    const getAllControllersInfo = async () => {
        try {
            if (ethereum) {
                const controllerContract = createControllerContract()

                const availableControllersInfo = await controllerContract.getAllControllersInfo()

                const structuredControllersInfo = availableControllersInfo.map((controller) => ({
                    deviceName: controller.deviceName,
                    createAt: controller.createAt,
                    value: parseInt(controller.value),
                }))
                setControllersInfo(structuredControllersInfo)
            } else {
                window.alert('No ethereum object')
            }
        } catch (error) {
            console.log(error)
            window.alert('No ethereum object')
        }
    }

    const addControllersInfoToBlockchain = async (controllers) => {
        try {
            if (ethereum) {
                const controllerContract = createControllerContract()

                //format before adding if needed ...
                const controllerHash = await controllerContract.addControllerInfo(controllers)
                await controllerHash.wait() //important

                const controllersCount = await controllerContract.getNumberOfControllersInfo()
                setControllersCount(parseInt(controllersCount))
            } else {
                window.alert('No ethereum object')
            }
        } catch (error) {
            console.log(error)
            window.alert('No ethereum object')
        }
    }

    useEffect(() => {
        checkIfWalletIsConnectedAndFetchData()
        getTheNumberOfControllersInfo()
    }, [controllersCount])

    useEffect(() => {
        if (currentAccount) getAllControllersInfo()
    }, [currentAccount])

    return (
        <ControllerContext.Provider
            value={{
                controllersInfo,

                addControllersInfoToBlockchain,
            }}
        >
            {children}
        </ControllerContext.Provider>
    )
}

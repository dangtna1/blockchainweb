import { useState, useEffect, createContext, useContext } from 'react'
import { ethers } from 'ethers'

import { WalletAccountsContext } from './WalletAccountsContext'
import { sensorDataAddress, sensorDataABI } from '../utils/constants'

export const SensorDataContext = createContext()

const { ethereum } = window

const createSensorDataContract = () => {
    // const privateKey = import.meta.env.VITE_PRIVATE_KEY; //to use this, create .env at root and include your private key there
    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner()
    // const wallet = new ethers.Wallet(privateKey, provider); //uncomment this
    const sensorDataContract = new ethers.Contract(sensorDataAddress, sensorDataABI, signer) //change signer to wallet
    return sensorDataContract
}

export const SensorDataProvider = ({ children }) => {
    const { currentAccount, setCurrentAccount } = useContext(WalletAccountsContext)
    const [sensorsData, setSensorsData] = useState([])
    const [sensorsDataCount, setSensorsDataCount] = useState()

    const checkIfWalletIsConnectedAndFetchData = async () => {
        try {
            if (!ethereum) return window.alert('Please install metamask.')

            const accounts = await ethereum.request({ method: 'eth_accounts' })
            if (accounts.length) {
                setCurrentAccount(accounts[0]) //In case we don't need to connect wallet again because of cache memory
                getAllSensorsData()
            } else {
                console.log('No accounts found')
            }
        } catch (error) {
            console.log(error)
            window.alert('No ethereum object')
        }
    }

    const getTheNumberOfSensorsData = async () => {
        try {
            if (ethereum) {
                const sensorDataContract = createSensorDataContract()

                const sensorsCount = await sensorDataContract.getNumberOfSensorsData()
                setSensorsDataCount(parseInt(sensorsCount))
            }
        } catch (error) {
            console.log(error)
            window.alert('No ethereum object')
        }
    }

    const getAllSensorsData = async () => {
        try {
            if (ethereum) {
                const sensorDataContract = createSensorDataContract()

                const availableSensorsData = await sensorDataContract.getAllSensorsData()

                const structuredSensorsData = availableSensorsData.map((sensor) => ({
                    sensorType: sensor.sensorType,
                    createAt: sensor.createAt,
                    value: parseInt(sensor.value),
                }))
                setSensorsData(structuredSensorsData)
            } else {
                window.alert('No ethereum object')
            }
        } catch (error) {
            console.log(error)
            window.alert('No ethereum object')
        }
    }

    const addSensorsDataToBlockchain = async (sensors) => {
        try {
            if (ethereum) {
                const sensorDataContract = createSensorDataContract()

                //format before adding if needed ...
                const sensorHash = await sensorDataContract.addSensorsData(sensors)
                await sensorHash.wait() //important

                const sensorsCount = await sensorDataContract.getNumberOfSensorsData()
                setSensorsDataCount(parseInt(sensorsCount))
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
        getTheNumberOfSensorsData()
    }, [sensorsDataCount])

    useEffect(() => {
        if (currentAccount) getAllSensorsData()
    }, [currentAccount])

    return (
        <SensorDataContext.Provider
            value={{
                sensorsData,

                addSensorsDataToBlockchain,
            }}
        >
            {children}
        </SensorDataContext.Provider>
    )
}

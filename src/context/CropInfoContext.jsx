import { useEffect, useState, useContext, createContext } from 'react'
import { ethers } from 'ethers'

import { WalletAccountsContext } from './WalletAccountsContext'
import { cropInfoABI, cropInfoAddress } from '../utils/constants'

export const CropInfoContext = createContext()

const { ethereum } = window

const createEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner()
    const cropInfoContract = new ethers.Contract(cropInfoAddress, cropInfoABI, signer)
    return cropInfoContract
}

export const CropInfoProvider = ({ children }) => {
    const { currentAccount, setCurrentAccount } = useContext(WalletAccountsContext)

    const [cropsInfo, setCropsInfo] = useState([])
    const [cropsCount, setCropsCount] = useState(localStorage.getItem('cropsCount'))
    const [formData, setformData] = useState({
        cropType: '',
        plantingDate: '',
        harvestDate: 0,
        noOfCrops: 0,
        fertilizers: '',
        pesticides: '',
        diseases: '',
        additionalInfo: '',
    })
    const [isLoading, setIsLoading] = useState(false)

    const checkIfWalletIsConnectedAndFetchData = async () => {
        try {
            if (!ethereum) return window.alert('Please install MetaMask.')
            const accounts = await ethereum.request({ method: 'eth_accounts' })
            if (accounts.length) {
                setCurrentAccount(accounts[0]) //In case we don't need to connect wallet again because of cache memory
                getAllCropsInfo()
            } else {
                console.log('No accounts found')
            }
        } catch (error) {
            console.log(error)
        }
    }

    const getTheNumberOfCropsAndSaveItInLocalStorage = async () => {
        try {
            if (ethereum) {
                const cropInfoContract = createEthereumContract()
                const currentCropsCount = await cropInfoContract.getNumberOfCrop()

                window.localStorage.setItem('cropsCount', currentCropsCount)
            } else {
                console.log('No ethereum object')
            }
        } catch (error) {
            console.log(error)
        }
    }

    const getAllCropsInfo = async () => {
        try {
            if (ethereum) {
                const cropInfoContract = createEthereumContract()

                const availableCrops = await cropInfoContract.getAllCropsInfo()

                const structuredCrops = availableCrops.map((crop) => ({
                    cropId: crop.cropId,
                    cropType: crop.cropType,
                    plantingDate: new Date(crop.plantingDate.toNumber() * 1000).toLocaleString(),
                    harvestDate: crop.monthsToHavest,
                    fertilizers: crop.fertilizers,
                    pesticides: crop.pesticides,
                    diseases: crop.diseases,
                    additionalInfo: crop.additionalInfo,
                    actualHarvestDate: crop.harvestDate,
                }))

                console.log(structuredCrops)
                setCropsInfo(structuredCrops)
            } else {
                console.log('Ethereum is not present')
            }
        } catch (error) {
            console.log(error)
        }
    }

    const addCropInfoToBlockChain = async () => {
        try {
            if (ethereum) {
                const cropInfoContract = createEthereumContract()

                const {
                    cropType,
                    plantingDate,
                    harvestDate,
                    fertilizers,
                    pesticides,
                    diseases,
                    additionalInfo,
                    noOfCrops,
                } = formData

                //convert date to Unix timestamp
                const [yearPlantingDate, monthPlantingDate, dayPlantingDate] =
                    plantingDate.split('-')
                // const [yearHarvestDate, monthHarvestDate, dayHarvestDate] = harvestDate.split('-');

                const unixPlantingDate =
                    Date.parse(
                        `${yearPlantingDate}-${monthPlantingDate}-${dayPlantingDate}T00:00:00Z`
                    ) / 1000
                // const unixHarvestDate = Date.parse(`${yearHarvestDate}-${monthHarvestDate}-${dayHarvestDate}T00:00:00Z`) / 1000;

                const arrayFertilizers = fertilizers !== '' ? fertilizers.split(', ') : []
                const arrayPesticides = pesticides !== '' ? pesticides.split(', ') : []
                const arrayDiseases = diseases !== '' ? diseases.split(', ') : []

                console.log('start adding...')
                const cropHash = await cropInfoContract.addCropInfo(
                    cropType,
                    unixPlantingDate,
                    harvestDate,
                    arrayFertilizers,
                    arrayPesticides,
                    arrayDiseases,
                    additionalInfo,
                    noOfCrops
                )

                setIsLoading(true)
                await cropHash.wait()
                setIsLoading(false)

                window.alert('Add the crop information successfully')

                const cropsCount = await cropInfoContract.getNumberOfCrop()
                setCropsCount(cropsCount.toNumber())
            } else {
                console.log('No ethereum object')
            }
        } catch (error) {
            console.log(error)
        }
    }

    const getCropInfo = async (cropId) => {
        try {
            if (ethereum) {
                const cropInfoContract = createEthereumContract()
                const cropInfoHash = await cropInfoContract.getCropInfo(cropId)
                return cropInfoHash
            }
        } catch (error) {
            console.log(error)
        }
    }

    const updateCropInfo = async (
        cropId,
        cropType,
        plantingDate,
        harvestDate,
        fertilizers,
        pesticides,
        diseases,
        additionalInfo
    ) => {
        try {
            if (ethereum) {
                const cropInfoContract = createEthereumContract()

                let unixPlantingDate
                if (plantingDate.indexOf('/') != -1) {
                    const originalDate = new Date(plantingDate)

                    // Extract year, month, and day components
                    const year = originalDate.getFullYear()
                    const month = ('0' + (originalDate.getMonth() + 1)).slice(-2)
                    const day = ('0' + originalDate.getDate()).slice(-2)

                    // Create the date in the year-month-day format
                    unixPlantingDate = Date.parse(`${year}-${month}-${day}T00:00:00Z`) / 1000
                } else {
                    //convert date to Unix timestamp
                    const [yearPlantingDate, monthPlantingDate, dayPlantingDate] =
                        plantingDate.split('-')
                    // const [yearHarvestDate, monthHarvestDate, dayHarvestDate] = harvestDate.split('-');

                    unixPlantingDate =
                        Date.parse(
                            `${yearPlantingDate}-${monthPlantingDate}-${dayPlantingDate}T00:00:00Z`
                        ) / 1000
                }

                const arrayFertilizers = fertilizers != '' ? fertilizers.split(', ') : []
                const arrayPesticides = pesticides != '' ? pesticides.split(', ') : []
                const arrayDiseases = diseases != '' ? diseases.split(', ') : []

                const cropUpdateHash = await cropInfoContract.updateCropInfo(
                    cropId,
                    cropType,
                    unixPlantingDate,
                    harvestDate,
                    arrayFertilizers,
                    arrayPesticides,
                    arrayDiseases,
                    additionalInfo
                )

                setIsLoading(true)
                await cropUpdateHash.wait()
                setIsLoading(false)

                window.alert('Update the crop information successfully')
                getAllCropsInfo() //fetch all crops back after updating
            } else {
                console.log('No ethereum object')
            }
        } catch (error) {
            console.log(error)
        }
    }

    const updateCropHarvestDate = async (
        cropId,
        cropType,
        plantingDate,
        harvestDate,
        fertilizers,
        pesticides,
        diseases,
        additionalInfo,
        actualHarvestDate
    ) => {
        try {
            if (ethereum) {
                const cropInfoContract = createEthereumContract()

                let unixPlantingDate
                if (plantingDate.indexOf('/') != -1) {
                    const originalDate = new Date(plantingDate)

                    // Extract year, month, and day components
                    const year = originalDate.getFullYear()
                    const month = ('0' + (originalDate.getMonth() + 1)).slice(-2)
                    const day = ('0' + originalDate.getDate()).slice(-2)

                    // Create the date in the year-month-day format
                    unixPlantingDate = Date.parse(`${year}-${month}-${day}T00:00:00Z`) / 1000
                } else {
                    //convert date to Unix timestamp
                    const [yearPlantingDate, monthPlantingDate, dayPlantingDate] =
                        plantingDate.split('-')
                    // const [yearHarvestDate, monthHarvestDate, dayHarvestDate] = harvestDate.split('-');

                    unixPlantingDate =
                        Date.parse(
                            `${yearPlantingDate}-${monthPlantingDate}-${dayPlantingDate}T00:00:00Z`
                        ) / 1000
                }

                const cropUpdateHarvestDateHash = await cropInfoContract.updateCropHarvestDate(
                    cropId,
                    cropType,
                    unixPlantingDate,
                    harvestDate,
                    fertilizers,
                    pesticides,
                    diseases,
                    additionalInfo,
                    actualHarvestDate
                )

                await cropUpdateHarvestDateHash.wait()

                window.alert('Harvest the crop information successfully')
                getAllCropsInfo() //fetch all crops back after updating
            } else {
                console.log('No ethereum object')
            }
        } catch (error) {
            console.log(error)
        }
    }

    const isFertilizersExistInAllCrops = (fertilizers) => {
        for (let i = 0; i < cropsCount; i++) {
            for (let j = 0; j < fertilizers.length; j++) {
                if (!cropsInfo[i].fertilizers.includes(fertilizers[j])) return false
            }
        }
        return true
    }

    const updateFertilizers = async (fertilizers) => {
        try {
            if (ethereum) {
                const cropInfoContract = createEthereumContract()

                if (!isFertilizersExistInAllCrops(fertilizers)) {
                    const updateCropsHash = await cropInfoContract.addFertilizers(fertilizers)

                    setIsLoading(true)
                    await updateCropsHash.wait()
                    setIsLoading(false)

                    getAllCropsInfo() //fetch all crops back after updating
                }
            } else {
                console.log('No ethereum object')
            }
        } catch (error) {
            console.log(error)
        }
    }

    const initializeACrop = async () => {
        try {
            if (ethereum) {
                const cropInfoContract = createEthereumContract()

                const plantingDate = new Date()
                const year = String(plantingDate.getFullYear())
                const month = String(plantingDate.getMonth() + 1).padStart(2, '0') // Months are zero-based
                const day = String(plantingDate.getDate()).padStart(2, '0')
                const unixPlantingDate = Date.parse(`${year}-${month}-${day}T00:00:00Z`) / 1000

                const cropHash = await cropInfoContract.addCropInfo(
                    'flower',
                    unixPlantingDate,
                    1,
                    [],
                    [],
                    [],
                    '',
                    1
                )

                setIsLoading(true)
                await cropHash.wait() //important
                setIsLoading(false)

                window.alert('Add the crop information successfully')

                const cropsCount = await cropInfoContract.getNumberOfCrop()
                setCropsCount(cropsCount.toNumber())
            } else {
                console.log('No ethereum object')
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleChange = (e, name) => {
        setformData((prevState) => ({ ...prevState, [name]: e.target.value }))
    }

    useEffect(() => {
        checkIfWalletIsConnectedAndFetchData()
        getTheNumberOfCropsAndSaveItInLocalStorage()
    }, [cropsCount])

    useEffect(() => {
        if (currentAccount) getAllCropsInfo()
    }, [currentAccount])

    useEffect(() => {
        window.ethereum.on('accountsChanged', (accounts) => {
            console.log('Change account')
            setCurrentAccount(accounts[0])
            console.log(accounts[0])
        })

        return () => {
            window.ethereum.removeAllListeners('accountsChanged')
        }
    }, [])

    return (
        <CropInfoContext.Provider
            value={{
                formData,
                cropsInfo,
                isLoading,

                handleChange,
                addCropInfoToBlockChain,
                initializeACrop,
                getCropInfo,
                updateCropInfo,
                updateFertilizers,
                updateCropHarvestDate,
            }}
        >
            {children}
        </CropInfoContext.Provider>
    )
}

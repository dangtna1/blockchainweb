import { useEffect, useState, useContext, createContext } from "react";
import { ethers } from "ethers";

import { cropInfoABI, cropInfoAddress } from "../utils/constants.jsx";
import { WalletAccountsContext } from "./WalletAccountsContext.jsx";

export const CropInfoContext = createContext();

const { ethereum } = window;

const createEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const cropInfoContract = new ethers.Contract(cropInfoAddress, cropInfoABI, signer);
    return cropInfoContract;
};

export const CropInfoProvider = ({ children }) => {
    const { currentAccount, setCurrentAccount } = useContext(WalletAccountsContext);

    const [cropsInfo, setCropsInfo] = useState([]);
    const [cropsCount, setCropsCount] = useState(localStorage.getItem("cropsCount"));
    const [formData, setformData] = useState({
        cropType: "",
        plantingDate: "",
        harvestDate: "",
        fertilizers: [],
        pesticides: [],
    });
    const [isLoading, setIsLoading] = useState(false);

    const checkIfWalletIsConnectedAndFetchData = async () => {
        try {
            if (!ethereum) return alert("Please install MetaMask.");
            const accounts = await ethereum.request({ method: "eth_accounts" });
            if (accounts.length) {
                setCurrentAccount(accounts[0]); //In case we don't need to connect wallet again because of cache memory
                getAllCropsInfo();
            } else {
                console.log("No accounts found");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getTheNumberOfCropsAndSaveItInLocalStorage = async () => {
        try {
            if (ethereum) {
                const cropInfoContract = createEthereumContract();
                const currentCropsCount = await cropInfoContract.getNumberOfCrop();

                window.localStorage.setItem("cropsCount", currentCropsCount);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getAllCropsInfo = async () => {
        try {
            if (ethereum) {
                const cropInfoContract = createEthereumContract();

                const availableCrops = await cropInfoContract.getAllCropsInfo();

                const structuredCrops = availableCrops.map((crop) => ({
                    cropType: crop.cropType,
                    plantingDate: new Date(crop.plantingDate.toNumber() * 1000).toLocaleString(),
                    harvestDate: new Date(crop.harvestDate.toNumber() * 1000).toLocaleString(),
                    fertilizers: crop.fertilizers,
                    pesticides: crop.pesticides,
                }));

                console.log(structuredCrops);

                setCropsInfo(structuredCrops);
            } else {
                console.log("Ethereum is not present");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const addCropInfoToBlockChain = async () => {
        try {
            if (ethereum) {
                const cropInfoContract = createEthereumContract();

                const { cropType, plantingDate, harvestDate, fertilizers, pesticides } = formData;

                //convert date to Unix timestamp
                const [yearPlantingDate, monthPlantingDate, dayPlantingDate] = plantingDate.split('-');
                const [yearHarvestDate, monthHarvestDate, dayHarvestDate] = harvestDate.split('-');

                const unixPlantingDate = Date.parse(`${yearPlantingDate}-${monthPlantingDate}-${dayPlantingDate}T00:00:00Z`) / 1000;
                const unixHarvestDate = Date.parse(`${yearHarvestDate}-${monthHarvestDate}-${dayHarvestDate}T00:00:00Z`) / 1000;

                const arrayFertilizers = fertilizers.split(', ');
                const arrayPesticides = pesticides.split(', ');

                console.log("start adding...");
                const cropHash = await cropInfoContract.addCropInfo(
                    cropType,
                    unixPlantingDate,
                    unixHarvestDate,
                    arrayFertilizers,
                    arrayPesticides
                );

                setIsLoading(true);
                await cropHash.wait();
                setIsLoading(false);

                window.alert("Add the crop information successfully");

                const cropsCount = await cropInfoContract.getNumberOfCrop();
                setCropsCount(cropsCount.toNumber());
            } else {
                console.log("No ethereum object");
            }
        } catch (error) {
            console.log(error);
            alert("No ethereum object");
        }
    };

    const handleChange = (e, name) => {
        setformData((prevState) => ({ ...prevState, [name]: e.target.value }));
    };

    useEffect(() => {
        checkIfWalletIsConnectedAndFetchData();
        getTheNumberOfCropsAndSaveItInLocalStorage();
    }, [cropsCount]);

    useEffect(() => {
        if (currentAccount) getAllCropsInfo();
    }, [currentAccount]);

    useEffect(() => {
        window.ethereum.on("accountsChanged", (accounts) => {
            console.log('Change account');
            setCurrentAccount(accounts[0]);
            console.log(accounts[0]);
        });

        return () => {
            window.ethereum.removeAllListeners("accountsChanged");
        }
    }, []);

    return (
        <CropInfoContext.Provider
            value={{
                formData,
                cropsInfo,
                isLoading,

                handleChange,
                addCropInfoToBlockChain,
            }}>
            {children}
        </CropInfoContext.Provider>
    )
}
import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

import { cropInfoABI, cropInfoAddress } from "../utils/constants.jsx";

export const CropInfoContext = React.createContext();

const { ethereum } = window;

const createEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const cropInfoContract = new ethers.Contract(cropInfoAddress, cropInfoABI, signer);

    return cropInfoContract;
};

export const CropInfoProvider = ({ children }) => {
    const [currentAccount, setCurrentAccount] = useState("");
    const [cropsInfo, setCropsInfo] = useState([]);
    const [cropsCount, setCropsCount] = useState(localStorage.getItem("cropsCount"));
    const [formData, setformData] = useState({
        cropType: "",
        plantingDate: "",
        harvestDate: "",
        fertilizers: [],
        pesticides: [],
        price: ""
    });
    const [isLoading, setIsLoading] = useState(false);

    const connectWallet = async () => {
        try {
            if (!ethereum) return alert("Please install MetaMask.");

            const accounts = await ethereum.request({ method: "eth_requestAccounts", });

            setCurrentAccount(accounts[0]); 

            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    };

    const checkIfWalletIsConnect = async () => {
        try {
            if (!ethereum) return alert("Please install MetaMask.");

            const accounts = await ethereum.request({ method: "eth_accounts" });

            if (accounts.length) {
                setCurrentAccount(accounts[0]);
                getAllCropsInfo();
            } else {
                console.log("No accounts found");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const checkIfCropsExist = async () => {
        try {
            if (ethereum) {
                const cropInfoContract = createEthereumContract();
                const currentCropsCount = await cropInfoContract.getCropCount();

                window.localStorage.setItem("cropsCount", currentCropsCount);
            }
        } catch (error) {
            console.log(error);
            
            // throw new Error("No ethereum object");
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
                    price: parseInt(crop.price._hex) / (10 ** 18), //1 Eth = 1e18 wei
                    owner: crop.owner
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
                console.log("hello world");
                const { cropType, plantingDate, harvestDate, fertilizers, pesticides, price } = formData;

                console.log(fertilizers);

                //convert date to Unix timestamp
                const [yearPlantingDate, monthPlantingDate, dayPlantingDate] = plantingDate.split('-');
                const [yearHarvestDate, monthHarvestDate, dayHarvestDate] = harvestDate.split('-');

                console.log(monthHarvestDate)

                const unixPlantingDate = Date.parse(`${yearPlantingDate}-${monthPlantingDate}-${dayPlantingDate}T00:00:00Z`) / 1000;
                const unixHarvestDate = Date.parse(`${yearHarvestDate}-${monthHarvestDate}-${dayHarvestDate}T00:00:00Z`) / 1000;

                const cropInfoContract = createEthereumContract();
                // const parsedAmount = ethers.utils.parseEther(amount);

                // await ethereum.request({
                //     method: "eth_sendTransaction",
                //     params: [{
                //         from: currentAccount,
                //         to: addressTo,
                //         gas: "0x5208",
                //         value: parsedAmount._hex,
                //     }],
                // });

                const parsedPrice = ethers.utils.parseEther(price);

                const arrayFertilizers = fertilizers.split(', ');
                const arrayPesticides = pesticides.split(', ');


                const cropHash = await cropInfoContract.addCropInfo(
                    cropType,
                    unixPlantingDate,
                    unixHarvestDate,
                    arrayFertilizers,
                    arrayPesticides,
                    parsedPrice,
                    currentAccount
                );

                setIsLoading(true);
                // console.log(`Loading - ${transactionHash.hash}`);
                await cropHash.wait();
                // console.log(`Success - ${transactionHash.hash}`);
                setIsLoading(false);

                const cropsCount = await cropInfoContract.getCropCount();

                setCropsCount(cropsCount.toNumber());
                // window.location.reload();
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
        checkIfWalletIsConnect(); //if yes, get all Crops information
        checkIfCropsExist(); //to know the number of crops
    }, [cropsCount]);

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
                currentAccount,
                formData,
                cropsInfo,
                isLoading,

                handleChange,
                connectWallet,
                addCropInfoToBlockChain,
            }}>
            {children}
        </CropInfoContext.Provider>
    )
}
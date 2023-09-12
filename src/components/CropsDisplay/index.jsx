import React from 'react';
import { CropInfoContext } from '../../context/CropInfoContext.jsx';

//logos
import croptype from '../../assets/cropsDisplay/croptype.svg'
import date from '../../assets/cropsDisplay/date.svg'
import cropfer from '../../assets/cropsDisplay/cropfer.svg'
import croppes from '../../assets/cropsDisplay/croppes.svg'
import cropprice from '../../assets/cropsDisplay/cropprice.svg'

const CropsDisplay = () => {
    const {
        cropsInfo
    } = React.useContext(CropInfoContext);

    return (
        <>
            <h1 className="font-bold text-title-4 text-primary-200 flex justify-center mb-4">All crops are in your hand</h1>

            <div className="flex flex-wrap justify-center bg-white shadow-md p-6 rounded-xl">
                {cropsInfo.map((crop, index) => (
                    <div
                        key={index}
                        className="bg-white shadow-md rounded-md p-4 m-4 w-[300px]"
                    >
                        <div className="flex jutify-center items-center">
                            <img src={croptype} alt="crop type" />
                            <p className="text-primary-200 mx-2">Name: </p>
                            <span>{crop.cropType}</span>
                        </div>

                        <div className="flex jutify-center items-center">
                            <img src={date} alt="date" />
                            <p className="text-primary-200 mx-2">Planting date: </p>
                            <span>{crop.plantingDate.split(',')[0]}</span>
                        </div>

                        <div className="flex jutify-center items-center">
                            <img src={date} alt="date" />
                            <p className="text-primary-200 mx-2">Harvest date (expect): </p>
                            <span>{crop.harvestDate.split(',')[0]}</span>
                        </div>

                        <div className="flex jutify-center items-center">
                            <img src={cropfer} alt="crop fertilizers" />
                            <p className="text-primary-200 mx-2">Fertilizers: </p>
                            <span>{crop.fertilizers.join(', ')}</span>
                        </div>

                        <div className="flex jutify-center items-center">
                            <img src={croppes} alt="crop pesticides" />
                            <p className="text-primary-200 mx-2">Pesticides: </p>
                            <span>{crop.pesticides.join(', ')}</span>
                        </div>

                        <div className="flex jutify-center items-center">
                            <img src={cropprice} alt="cropprice" />
                            <p className="text-primary-200 mx-2">Price (ETH): </p>
                            <span>{crop.price}</span>
                        </div>

                        <div className="flex justify-end"><button className="rounded-full bg-emerald-300 px-6 py-1" onClick={() => alert("This feature is being developed")}>Buy</button></div>
                    </div>
                ))}
            </div >
        </>
    )
}

export default CropsDisplay;
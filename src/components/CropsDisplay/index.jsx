import React from 'react';
import { CropInfoContext } from '../../context/CropInfoContext.jsx';
import RenderItems from '../Layout/DefaultLayout/UI/Pagination';
import classes from './styles.module.css'


const CropsDisplay = () => {
    const {
        cropsInfo
    } = React.useContext(CropInfoContext);

    return (
        <>
            <div className={classes['crop-display']}>
                <h1 className={classes.title}>All crops are in your hand</h1>
                <RenderItems items={cropsInfo}/>
            </div>
            
            {/* <h1 className="font-bold text-title-4 text-primary-200 flex justify-center mb-4">All crops are in your hand</h1>
            <div className=" w-full h-full overflow-hidden  flex flex-wrap justify-center bg-white shadow-md p-6 rounded-xl">
                {cropsInfo.map((crop, index) => (
                    <Crop crop={crop} key={index}/>
                ))}
            </div> */}
        </>
    )
}

export default CropsDisplay;
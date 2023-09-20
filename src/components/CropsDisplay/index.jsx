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
        </>
    )
}

export default CropsDisplay;
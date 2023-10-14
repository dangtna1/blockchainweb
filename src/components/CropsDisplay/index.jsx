import { useContext } from 'react'

import { CropInfoContext } from '../../context/CropInfoContext'
import RenderItems from '../Layout/DefaultLayout/UI/Pagination'
import classes from './styles.module.css'

const CropsDisplay = () => {
    const { cropsInfo } = useContext(CropInfoContext)
    console.log(cropsInfo)
    return (
        <>
            <div className={classes['crop-display']}>
                <h1 className={classes.title}>All crops are in your hand</h1>
                {cropsInfo.length > 0 ? (
                    <RenderItems items={cropsInfo} />
                ) : (
                    <p className=' font-lato text-xl font-bold text-main-200 uppercase '>
                        Please connect your wallet{' '}
                    </p>
                )}
            </div>
        </>
    )
}

export default CropsDisplay

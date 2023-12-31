import { useContext } from 'react'

import { CropInfoContext } from '../../context/CropInfoContext'
import { WalletAccountsContext } from '../../context/WalletAccountsContext'
import RenderItems from '../Layout/DefaultLayout/UI/Pagination'
import classes from './styles.module.css'

const CropsDisplay = () => {
    const { cropsInfo } = useContext(CropInfoContext)
    const { currentAccount } = useContext(WalletAccountsContext)
    return (
        <>
            <div className={classes['crop-display']}>
                <h1 className={classes.title}>All crops are in your hand</h1>
                {currentAccount ? (
                    cropsInfo.length > 0 ? (
                        <RenderItems items={cropsInfo} />
                    ) : (
                        <p className=' font-lato text-xl font-bold text-main-200 uppercase '>
                            Please add more crops{' '}
                        </p>
                    )
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

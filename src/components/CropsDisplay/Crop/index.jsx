import { useContext } from 'react'

import { BsInfoCircle } from 'react-icons/bs'

import { NavLink } from 'react-router-dom'
import classes from './Crop.module.css'

import { CropInfoContext } from '../../../context/CropInfoContext'
import { WalletAccountsContext } from '../../../context/WalletAccountsContext'
//logos
import croptype from '../../../assets/cropsDisplay/croptype.svg'
import date from '../../../assets/cropsDisplay/date.svg'
import cropfer from '../../../assets/cropsDisplay/cropfer.svg'
import croppes from '../../../assets/cropsDisplay/croppes.svg'
import cropdisease from '../../../assets/cropsDisplay/cropdisease.svg'
import cropnote from '../../../assets/cropsDisplay/cropnote.svg'

const Crop = (props) => {
    const { updateCropHarvestDate } = useContext(CropInfoContext)
    const { currentAccount } = useContext(WalletAccountsContext)
    const crop = props.crop

    const handleHarvest = (e) => {
        e.preventDefault()
        console.log(`harvest crop ${crop.cropId}`)

        const options = {
            timeZone: 'Asia/Ho_Chi_Minh',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        }
        const actualHarvestDate = new Date().toLocaleString('en-US', options)

        updateCropHarvestDate(
            crop.cropId,
            crop.cropType,
            crop.plantingDate,
            crop.harvestDate,
            crop.fertilizers,
            crop.pesticides,
            crop.diseases,
            crop.additionalInfo,
            actualHarvestDate
        )
    }

    return (
        <>
            <div key={props.index} className={classes.crop}>
                <div className='flex jutify-center items-center'>
                    <img src={croptype} alt='crop type' />
                    <p className='text-primary-200 mx-2'>Name: </p>
                    <span>{crop.cropType}</span>
                    {crop.actualHarvestDate !== '' && (
                        <div className='flex justify-end w-full'>
                            <NavLink to={`detail/${parseInt(crop.cropId)}`}>
                                <BsInfoCircle fontSize={17} color='#000' />
                            </NavLink>
                        </div>
                    )}
                </div>

                <div className='flex jutify-center items-center'>
                    <img src={date} alt='date' />
                    <p className='text-primary-200 mx-2'>Planting date: </p>
                    <span>{crop.plantingDate.split(',')[0]}</span>
                </div>

                <div className='flex jutify-center items-center'>
                    <img src={date} alt='date' />
                    <p className='text-primary-200 mx-2'>No. months to harvest: </p>
                    <span>{parseInt(crop.harvestDate)}</span>
                </div>

                <div className='flex jutify-center items-center'>
                    <img src={cropfer} alt='crop fertilizers' />
                    <p className='text-primary-200 mx-2'>Fertilizers: </p>
                    <span>{crop.fertilizers.join(', ') || 'none'}</span>
                </div>

                <div className='flex jutify-center items-center'>
                    <img src={croppes} alt='crop pesticides' />
                    <p className='text-primary-200 mx-2'>Pesticides: </p>
                    <span>{crop.pesticides.join(', ') || 'none'}</span>
                </div>

                <div className='flex jutify-center items-center'>
                    <img src={cropdisease} alt='crop diseases' />
                    <p className='text-primary-200 mx-2'>Diseases: </p>
                    <span>{crop.diseases.join(', ') || 'none'}</span>
                </div>

                <div className='flex jutify-center items-center'>
                    <img src={cropnote} alt='additional information' />
                    <p className='text-primary-200 mx-2'>Additional information: </p>
                    <span>{crop.additionalInfo || 'none'}</span>
                </div>

                <div className='flex justify-end mt-2'>
                    {crop.actualHarvestDate == '' &&
                        currentAccount === '0x0d22c5b0dbd93aeb3ba644218363d5282b40fb5e' && (
                            <button
                                className='rounded-full bg-main-400 text-white font-bold px-3 py-1 mr-1'
                                onClick={(e) => handleHarvest(e)}
                            >
                                Harvest
                            </button>
                        )}
                    {currentAccount === '0x0d22c5b0dbd93aeb3ba644218363d5282b40fb5e' && (
                        <NavLink
                            to={`edit/${parseInt(crop.cropId)}`}
                            className='rounded-full bg-main-300 text-white font-bold px-6 py-1'
                        >
                            Edit
                        </NavLink>
                    )}
                </div>
            </div>
        </>
    )
}

export default Crop

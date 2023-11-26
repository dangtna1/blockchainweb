import { useState, useEffect, useContext } from 'react'
import { useParams, NavLink } from 'react-router-dom'

import { CropInfoContext } from '../../../../context/CropInfoContext'
import { ControllerContext } from '../../../../context/ControllerContext'
import { SensorDataContext } from '../../../../context/SensorDataContext'

import CustomTable from '../../../Layout/DefaultLayout/UI/Table'

import classes from './CropDetail.module.css'

//logos
import croptype from '../../../../assets/cropsDisplay/croptype.svg'
import date from '../../../../assets/cropsDisplay/date.svg'
import cropfer from '../../../../assets/cropsDisplay/cropfer.svg'
import croppes from '../../../../assets/cropsDisplay/croppes.svg'
import cropdisease from '../../../../assets/cropsDisplay/cropdisease.svg'
import cropnote from '../../../../assets/cropsDisplay/cropnote.svg'

const CropDetail = () => {
    const { id } = useParams()

    const [cropCareHistory, setCropCareHistory] = useState([])
    const [cropSensorHistory, setCropSensorHistory] = useState([])
    const [generalInfo, setGeneralInfo] = useState({})

    const { getCropInfo } = useContext(CropInfoContext)
    const { controllersInfo } = useContext(ControllerContext)
    const { sensorsData } = useContext(SensorDataContext)

    //custom function
    function convertToDateTime(dateString) {
        const [datePart, timePart] = dateString.split(', ')
        const [month, day, year] = datePart.split('/')
        const [time, meridian] = timePart.split(' ')
        let [hours, minutes, seconds] = time.split(':')

        if (meridian === 'PM' && hours !== '12') {
            hours = String(parseInt(hours, 10) + 12)
        } else if (meridian === 'AM' && hours === '12') {
            hours = '00'
        }

        // Adjust month by subtracting 1 for JavaScript's zero-based indexing
        const adjustedMonth = parseInt(month, 10) - 1

        return new Date(year, adjustedMonth, day, hours, minutes, seconds)
    }

    useEffect(() => {
        let structuredCrop
        const fetchCropInfo = async () => {
            try {
                const response = await getCropInfo(id)
                structuredCrop = {
                    cropType: response.cropType,
                    plantingDate: new Date(
                        response.plantingDate.toNumber() * 1000
                    ).toLocaleString(),
                    harvestDate: parseInt(response.monthsToHavest),
                    fertilizers: response.fertilizers.join(', ') || '',
                    pesticides: response.pesticides.join(', ') || '',
                    diseases: response.diseases.join(', ') || '',
                    additionalInfo: response.additionalInfo,
                    actualHarvestDate: response.harvestDate,
                }

                setGeneralInfo(structuredCrop)
            } catch (error) {
                console.log(error)
            }
        }
        fetchCropInfo()

        //add history care of this crop
        const timerId = setTimeout(() => {
            const plantingDateTime = convertToDateTime(structuredCrop.plantingDate)
            const harvestDateTime = convertToDateTime(structuredCrop.actualHarvestDate)
            //controller history
            const cropCareHistory = []
            for (let i = 0; i < controllersInfo.length; i++) {
                const controllerDateTime = convertToDateTime(controllersInfo[i].createAt)
                if (
                    controllerDateTime >= plantingDateTime &&
                    controllerDateTime <= harvestDateTime
                ) {
                    cropCareHistory.push(controllersInfo[i])
                }
            }
            //add Log field to controller history
            for (let i = 0; i < cropCareHistory.length; i++) {
                const signal = cropCareHistory[i].value === 1 ? 'on' : 'off'
                let historyLine = `${cropCareHistory[i].deviceName} was turned ${signal}`

                cropCareHistory[i] = {
                    ...cropCareHistory[i],
                    historyLine,
                }
            }

            //sensors history
            const cropSensorsData = []
            for (let i = 0; i < sensorsData.length; i++) {
                const sensorDateTime = convertToDateTime(sensorsData[i].createAt)
                if (sensorDateTime >= plantingDateTime && sensorDateTime <= harvestDateTime) {
                    cropSensorsData.push(sensorsData[i])
                }
            }

            setCropCareHistory(cropCareHistory)
            setCropSensorHistory(cropSensorsData)
        }, 2000)

        return () => {
            clearTimeout(timerId)
        }
    }, [])

    const convertDateFormat = (dateString) => {
        const parsedDate = new Date(dateString)
        return `${parsedDate.getFullYear()}/${String(parsedDate.getMonth() + 1).padStart(
            2,
            '0'
        )}/${String(parsedDate.getDate()).padStart(2, '0')}`
    }

    return (
        <div className='w-full '>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1 className={classes.MainTitle}>Crop Care history</h1>
                <NavLink className={classes.Cancel} to='/crops-display'>
                    Go Back
                </NavLink>
            </div>
            <div className='flex justify-center items-center flex-col border-2'>
                <h2 className='text-primary-300 font-semibold text-xl'>GENERAL INFORMATION</h2>

                <div>
                    <div className='flex jutify-center items-center'>
                        <img src={croptype} alt='' />
                        <p className='text-primary-200 mx-2'>Name: </p>
                        <span>{generalInfo.cropType}</span>
                    </div>

                    <div className='flex jutify-center items-center'>
                        <img src={date} alt='' />
                        <p className='text-primary-200 mx-2'>Planting date: </p>
                        <span>{convertDateFormat(generalInfo.plantingDate)}</span>
                    </div>

                    <div className='flex jutify-center items-center'>
                        <img src={date} alt='' />
                        <p className='text-primary-200 mx-2'>Harvest:</p>
                        <span>{generalInfo.actualHarvestDate}</span>
                    </div>

                    <div className='flex jutify-center items-center'>
                        <img src={cropfer} alt='' />
                        <p className='text-primary-200 mx-2'>Fertilizers: </p>
                        <span>{generalInfo.fertilizers}</span>
                    </div>

                    <div className='flex jutify-center items-center'>
                        <img src={croppes} alt='' />
                        <p className='text-primary-200 mx-2'>Pesticides: </p>
                        <span>{generalInfo.pesticides || 'none'}</span>
                    </div>

                    <div className='flex jutify-center items-center'>
                        <img src={cropdisease} alt='' />
                        <p className='text-primary-200 mx-2'>Diseases: </p>
                        <span>{generalInfo.diseases || 'none'}</span>
                    </div>

                    <div className='flex jutify-center items-center'>
                        <img src={cropnote} alt='' />
                        <p className='text-primary-200 mx-2'>Additional Information: </p>
                        <span>{generalInfo.additionalInfo || 'none'}</span>
                    </div>
                </div>
            </div>
            <div className={classes['history-container']}>
                <div className='my-5 mx-8'>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div>
                            <h2 className='text-primary-300 font-semibold text-xl'>
                                CONTROLLER HISTORY
                            </h2>
                        </div>
                    </div>
                    <div className={classes['custom-scrollbar']}>
                        <CustomTable data={cropCareHistory} type={'controller'} />
                    </div>
                </div>

                <div className='my-5 mx-8'>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div>
                            <h2 className='text-primary-300 font-semibold text-xl'>
                                SENSOR HISTORY
                            </h2>
                        </div>
                    </div>
                    <div className={classes['custom-scrollbar']}>
                        <div className='flex justify-center w-full'>
                            <CustomTable data={cropSensorHistory} type={'sensor'} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CropDetail

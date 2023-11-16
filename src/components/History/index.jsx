import { useContext, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import XLSX from 'xlsx'

import { ControllerContext } from '../../context/ControllerContext'
import { SensorDataContext } from '../../context/SensorDataContext'
import { controllerAddress } from '../../utils/constants'
import { sensorDataAddress } from '../../utils/constants'
import { NameToUnitMapping } from '../../utils/Mapping'
// import Pic from '../../assets/History/Pic.jpg'
import classes from './History.module.css'

const History = () => {
    const { controllersInfo } = useContext(ControllerContext)
    const { sensorsData } = useContext(SensorDataContext)
    const reversedControllerInfo = [...controllersInfo].reverse()

    //sorted in descending order according to createAt
    const sortedSensorsData = sensorsData.sort(
        (sensorData1, sensorData2) =>
            new Date(sensorData2.createAt) - new Date(sensorData1.createAt)
    )
    const contractAddressUrl = `https://sepolia.etherscan.io/address/${controllerAddress}`
    const sensorAddressUrl = `https://sepolia.etherscan.io/address/${sensorDataAddress}`

    const handleExportControllerInfoToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(reversedControllerInfo)
        const workbook = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(workbook, worksheet, 'ControllerInfo')
        XLSX.writeFile(workbook, 'ControllerInfo.xlsx')
    }

    const handleExportSensorsDataToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(sortedSensorsData)
        const workbook = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(workbook, worksheet, 'SensorData')
        XLSX.writeFile(workbook, 'SensorData.xlsx')
    }

    return (
        <div className='w-full'>
            <h1 className={classes.MainTitle}>Care history</h1>
            <div className={classes['history-container']}>
                <div className='my-5 mx-8'>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div>
                            <h2 className='text-primary-300 font-semibold text-xl'>
                                CONTROLLER HISTORY
                            </h2>
                            <a
                                href={contractAddressUrl}
                                target='_blank'
                                className={classes['detail-link']}
                            >
                                View more details on Etherscan
                            </a>
                        </div>
                        <div>
                            <button
                                className={classes['export-button']}
                                onClick={handleExportControllerInfoToExcel}
                            >
                                Export
                            </button>
                        </div>
                    </div>
                    <div className={classes['custom-scrollbar']}>
                        <ul>
                            {reversedControllerInfo.map((controller, index) => {
                                const signal = controller.value === 1 ? 'on' : 'off'
                                let historyLine = `${controller.deviceName} was turned ${signal}`
                                let durationString = ' starting ...'

                                let duration = 0
                                if (controller.value === 0) {
                                    for (
                                        let i = index + 1;
                                        i < reversedControllerInfo.length;
                                        i++
                                    ) {
                                        if (
                                            reversedControllerInfo[i].deviceName ==
                                                controller.deviceName &&
                                            reversedControllerInfo[i].value === 1
                                        ) {
                                            duration = Math.floor(
                                                Math.abs(
                                                    new Date(controller.createAt) -
                                                        new Date(reversedControllerInfo[i].createAt)
                                                )
                                            )
                                            const hour = Math.floor(duration / (1000 * 60 * 60))
                                            const minute = Math.floor(duration / (1000 * 60))
                                            const second = (duration / 1000) % 60
                                            durationString = ` ${hour} hour(s) ${minute} minute(s) ${second} second(s)`
                                            break
                                        }
                                    }
                                }

                                return (
                                    <li key={index}>
                                        <span className={classes.timestamp}>
                                            {controller.createAt}:{' '}
                                        </span>
                                        {historyLine}
                                        <FontAwesomeIcon
                                            icon='fa-solid fa-clock'
                                            className='text-primary-200 ml-2'
                                        />
                                        <span className='text-primary-200'>{durationString}</span>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>

                <div className='my-5 mx-8'>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div>
                            <h2 className='text-primary-300 font-semibold text-xl'>
                                SENSOR HISTORY
                            </h2>
                            <a
                                href={sensorAddressUrl}
                                target='_blank'
                                className={classes['detail-link']}
                            >
                                View more details on Etherscan
                            </a>
                        </div>
                        <div>
                            <button
                                className={classes['export-button']}
                                onClick={handleExportSensorsDataToExcel}
                            >
                                Export
                            </button>
                        </div>
                    </div>
                    <div className={classes['custom-scrollbar']}>
                        <ul>
                            {sortedSensorsData.map((sensor, index) => {
                                const historyLine = `${sensor.sensorType} = ${sensor.value}${
                                    NameToUnitMapping[sensor.sensorType]
                                }`

                                return (
                                    <li key={index}>
                                        <span
                                            className={
                                                sensor.sensorType.startsWith('Water')
                                                    ? classes.waterTimestamp
                                                    : sensor.sensorType.startsWith('Soil')
                                                    ? classes.soilTimestamp
                                                    : classes.airTimestamp
                                            }
                                        >
                                            {sensor.createAt}:{' '}
                                        </span>
                                        {historyLine}
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>

                {/* <div>
          <div className={classes['outer-image-container']}>
            <div className={classes['image-container']}>
              <img src={Pic} className={classes['image-style']} />
            </div>
            <div></div>
          </div>

          <div className={classes['outer-image-container']}>
            <div></div>
            <div className={classes['image-container']}>
              <img src={Pic} className={classes['image-style']} />
            </div>
          </div>

          <div className={classes['outer-image-container']}>
            <div className={classes['image-container']}>
              <img src={Pic} className={classes['image-style']} />
            </div>
            <div></div>
          </div>

          <div className={classes['outer-image-container']}>
            <div></div>
            <div className={classes['image-container']}>
              <img src={Pic} className={classes['image-style']} />
            </div>
          </div>

          <div className={classes['outer-image-container']}>
            <div className={classes['image-container']}>
              <img src={Pic} className={classes['image-style']} />
            </div>
            <div></div>
          </div>

          <div className={classes['outer-image-container']}>
            <div></div>
            <div className={classes['image-container']}>
              <img src={Pic} className={classes['image-style']} />
            </div>
          </div>
        </div> */}
            </div>
        </div>
    )
}

export default History

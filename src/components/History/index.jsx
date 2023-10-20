import { useContext } from 'react'

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

    return (
        <div>
            <h1 className={classes.MainTitle}>Care history</h1>
            <div className={classes['history-container']}>
                <div className={classes['custom-scrollbar']}>
                    <h2>CONTROLLER HISTORY</h2>
                    <a href={contractAddressUrl} target='_blank' className={classes['detail-link']}>
                        View more details on Etherscan
                    </a>
                    <ul>
                        {reversedControllerInfo.map((controller, index) => {
                            const signal = controller.value === 1 ? 'on' : 'off'
                            const historyLine = `${controller.deviceName} was turned ${signal}`
                            return (
                                <li key={index}>
                                    <span className={classes.timestamp}>
                                        {controller.createAt}:{' '}
                                    </span>
                                    {historyLine}
                                </li>
                            )
                        })}
                    </ul>
                </div>

                <div className={classes['custom-scrollbar']}>
                    <h2>SENSOR HISTORY</h2>
                    <a href={sensorAddressUrl} target='_blank' className={classes['detail-link']}>
                        View more details on Etherscan
                    </a>
                    <ul>
                        {sortedSensorsData.map((sensor, index) => {
                            const historyLine = `${sensor.sensorType} = ${sensor.value}${
                                NameToUnitMapping[sensor.sensorType]
                            }`
                            return (
                                <li key={index}>
                                    <span className={classes.timestamp}>{sensor.createAt}: </span>
                                    {historyLine}
                                </li>
                            )
                        })}
                    </ul>
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

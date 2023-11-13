import { useEffect, useState, useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { AdafruitContext } from '../../../context/AdafruitContext'
import { feedKeyMapping, unitMapping } from '../../../utils/Mapping'
import classes from './Sensor.module.css'

const Sensor = ({ input }) => {
    const waterSensorType = feedKeyMapping[input.id].startsWith('water')
    const airSensorType = feedKeyMapping[input.id].startsWith('air')

    const [sensorValue, setSensorValue] = useState(0)

    const { fetchSensorData, fetchSensorData2 } = useContext(AdafruitContext)

    //UI element active or not
    const sensorActive = input.active.sensorID === input.id
    const onClickHandler = () => {
        input.setStatus((prev) => ({ ...prev, sensorID: input.id }))
    }

    // subscribe and get data from adafruit
    useEffect(() => {
        const fetchData = async () => {
            const sensorIndex = input.id
            if (
                feedKeyMapping[sensorIndex].startsWith('water') ||
                feedKeyMapping[sensorIndex].startsWith('air')
            ) {
                const response = await fetchSensorData2(feedKeyMapping[sensorIndex])
                setTimeout(() => {
                    //just in case user switches between sensors quickly
                    setSensorValue(response.data.value)
                })
            } else {
                const response = await fetchSensorData(feedKeyMapping[sensorIndex])
                setTimeout(() => {
                    //just in case user switches between sensors quickly
                    setSensorValue(response.data.value)
                })
            }
        }
        fetchData() //the first time

        const myInterval = setInterval(fetchData, 5000)

        return () => {
            clearInterval(myInterval)
        }
    }, [])

    return (
        <>
            <button
                className={
                    airSensorType
                        ? sensorActive
                            ? `${classes.airSensor} ${classes.active}`
                            : `${classes.airSensor}`
                        : waterSensorType
                        ? sensorActive
                            ? `${classes.waterSensor} ${classes.active}`
                            : `${classes.waterSensor}`
                        : sensorActive
                        ? `${classes.sensor} ${classes.active}`
                        : `${classes.sensor}`
                }
                onClick={onClickHandler}
            >
                <div className={classes.infor}>
                    <div className={classes.name}>{input.name}</div>
                    <div
                        className={
                            input.status ? classes.status : `${classes.status} ${classes.inactive}`
                        }
                    >
                        {input.status ? 'active' : 'inactive'}
                    </div>
                    <div className={classes.value}>
                        {sensorValue}
                        <span>{unitMapping[input.id]}</span>
                    </div>
                </div>
                <div className={classes.imageWrapper}>
                    {airSensorType ? (
                        <FontAwesomeIcon
                            className={
                                input.status
                                    ? classes.image
                                    : `${classes.image} ${classes.inactive}`
                            }
                            icon='fa-solid fa-mountain-sun'
                        />
                    ) : waterSensorType ? (
                        <FontAwesomeIcon
                            className={
                                input.status
                                    ? classes.image
                                    : `${classes.image} ${classes.inactive}`
                            }
                            icon='fa-solid fa-water'
                        />
                    ) : (
                        <FontAwesomeIcon
                            className={
                                input.status
                                    ? classes.image
                                    : `${classes.image} ${classes.inactive}`
                            }
                            icon='fa-solid fa-truck-monster'
                        />
                    )}
                </div>
            </button>
        </>
    )
}

export default Sensor

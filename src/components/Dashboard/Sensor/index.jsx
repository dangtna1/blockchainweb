import { useEffect, useState, useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { AdafruitContext } from '../../../context/AdafruitContext'
import { feedKeyMapping, unitMapping } from '../../../utils/Mapping'
import classes from './Sensor.module.css'

const Sensor = ({ input }) => {
    const [sensorValue, setSensorValue] = useState(0)

    const { fetchSensorData } = useContext(AdafruitContext)

    //UI element active or not
    const sensorActive = input.active.sensorID === input.id
    const onClickHandler = () => {
        input.setStatus((prev) => ({ ...prev, sensorID: input.id }))
    }

    // subscribe and get data from adafruit
    useEffect(() => {
        const fetchData = async () => {
            const sensorIndex = input.id
            const response = await fetchSensorData(feedKeyMapping[sensorIndex])
            setTimeout(() => {
                //just in case user switches between sensors quickly
                setSensorValue(response.data.value)
            })
        }
        fetchData() //the first time

        const myInterval = setInterval(fetchData, 1000)

        return () => {
            clearInterval(myInterval)
        }
    }, [])

    return (
        <>
            <button
                className={
                    sensorActive ? `${classes.sensor} ${classes.active}` : `${classes.sensor}`
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
                    <FontAwesomeIcon
                        className={
                            input.status ? classes.image : `${classes.image} ${classes.inactive}`
                        }
                        icon='fa-solid fa-fingerprint'
                    />
                </div>
            </button>
        </>
    )
}

export default Sensor

import { useEffect, useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faker } from '@faker-js/faker'

import { pushSensorData } from '../../../store/sensorHistorySlice'
import { feedKeyMapping, unitMapping } from '../../../utils/Mapping'
import classes from './Sensor.module.css'

// Generate fake value (do not need this in the future)
const generateFakeValue = (type) => {
    switch (type) {
        case 'temp':
            return faker.number.int({ min: 26, max: 44 })
        case 'humi':
            return faker.number.int({ min: 20, max: 80 })
        case 'soilph':
            return faker.number.int({ min: 5, max: 10 })
        case 'soilmoisture':
            return faker.number.int({ min: 10, max: 90 })
        default:
            break
    }
}

const publishDataToAdafruit = async (feedKey, value) => {
    try {
        const apiKey = 'aio_eWye58Xb7tE' + 'MMNtfGp0CsjtGecZv'

        await axios.post(
            `https://io.adafruit.com/api/v2/dangvudangtna1/feeds/${feedKey}/data`,
            {
                value: value,
            },
            {
                headers: {
                    'X-AIO-Key': apiKey,
                },
            }
        )
    } catch (error) {
        console.error('Error writing data to Adafruit IO:', error)
    }
}

const Sensor = ({ input }) => {
    const dispatch = useDispatch()

    const sensorActive = input.active.sensorID === input.id
    const onClickHandler = () => {
        input.setStatus((prev) => ({ ...prev, sensorID: input.id }))
    }
    const [sensorValue, setSensorValue] = useState(0)
    useEffect(() => {
        const fetchData = async () => {
            const apiKey = 'aio_eWye58Xb7tE' + 'MMNtfGp0CsjtGecZv'
            const sensorIndex = input.id
            const url = `https://io.adafruit.com/api/v2/dangvudangtna1/feeds/${feedKeyMapping[sensorIndex]}/data/last`

            try {
                const response = await axios.get(url, {
                    headers: {
                        'X-AIO-Key': apiKey,
                    },
                })

                setSensorValue(response.data.value)
            } catch (error) {
                console.error('Error fetching data:', error)
            }
        }
        fetchData()
    }, [])

    //faking sensor values here and publsh them to adafruit server
    useEffect(() => {
        const myInterval = setInterval(() => {
            const newValue = generateFakeValue(feedKeyMapping[input.id])

            //start adding to global state and blockchain
            const options = {
                timeZone: 'Asia/Ho_Chi_Minh',
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
            }
            const vietnamTime = new Date().toLocaleString('en-US', options)
            const sensor = {
                sensorType: input.name,
                createAt: vietnamTime,
                value: newValue,
            }
            console.log('start adding to global state')
            dispatch(pushSensorData(sensor))
            //end adding to global state and blockchain

            publishDataToAdafruit(feedKeyMapping[input.id], newValue)
            setSensorValue(newValue)
        }, 10000)

        return () => {
            clearInterval(myInterval)
        }
    }, [])
    return (
        <>
            <button
                className={
                    sensorActive
                        ? `${classes.sensor} ${classes.active}`
                        : `${classes.sensor}`
                }
                onClick={onClickHandler}
            >
                <div className={classes.infor}>
                    <div className={classes.name}>{input.name}</div>
                    <div
                        className={
                            input.status
                                ? classes.status
                                : `${classes.status} ${classes.inactive}`
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
                            input.status
                                ? classes.image
                                : `${classes.image} ${classes.inactive}`
                        }
                        icon='fa-solid fa-fingerprint'
                    />
                </div>
            </button>
        </>
    )
}

export default Sensor

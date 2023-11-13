import { useState, useEffect, createContext, useContext } from 'react'
import axios from 'axios'
import { Client } from 'paho-mqtt'
import { faker } from '@faker-js/faker'

import { SensorDataContext } from './SensorDataContext'
import { feedKeyToNameMapping } from '../utils/Mapping'

export const AdafruitContext = createContext()

const aioUsername1 = 'tamquattnb123'
const apiKey1 = 'aio_IibV61FsQe' + 'RVTkhPB98EgUnmwu0J'

const aioUsername2 = 'dangvudangtna1'
const apiKey2 = 'aio_eWye58Xb7tE' + 'MMNtfGp0CsjtGecZv'

const aioUsername3 = 'fruitada_159357'
const apiKey3 = 'aio_XFcb24GncMdo' + 'PBgzXkV3SDc4UPPl'

let sensorsDataBlock = []
let counter = 0
const sensorArray = [
    'temp',
    'humi',
    'soilph',
    'ec',
    'n',
    'p',
    'k',
    'air-temp',
    'air-humi',
    'air-light',
    'air-co2',
    'water-temp',
    'water-ph',
    'water-ec',
    'water-orp',
]
let sensorIndex = 0

export const AdafruitProvider = ({ children }) => {
    const [sensorCount, setSensorCount] = useState(0)

    const { addSensorsDataToBlockchain } = useContext(SensorDataContext)

    const fetchControllerInfo = async (feedName) => {
        const url = `https://io.adafruit.com/api/v2/${aioUsername1}/feeds/${feedName}/data/last`

        try {
            const response = await axios.get(url, {
                headers: {
                    'X-AIO-Key': apiKey1,
                },
            })
            return response
        } catch (error) {
            console.error('Error fetching data:', error)
        }
    }

    const publishControllerInfo = async (feedName, value) => {
        const url = `https://io.adafruit.com/api/v2/${aioUsername1}/feeds/${feedName}/data`

        try {
            await axios.post(
                url,
                {
                    value: value,
                },
                {
                    headers: {
                        'X-AIO-Key': apiKey1,
                    },
                }
            )
        } catch (error) {
            console.error('Error writing data to Adafruit IO:', error)
        }
    }

    const fetchSensorData = async (feedName) => {
        const url = `https://io.adafruit.com/api/v2/${aioUsername2}/feeds/${feedName}/data/last`

        try {
            const response = await axios.get(url, {
                headers: {
                    'X-AIO-Key': apiKey2,
                },
            })
            return response
        } catch (error) {
            console.error('Error fetching data:', error)
        }
    }

    const fetchSensorData2 = async (feedName) => {
        const url = `https://io.adafruit.com/api/v2/${aioUsername3}/feeds/${feedName}/data/last`

        try {
            const response = await axios.get(url, {
                headers: {
                    'X-AIO-Key': apiKey3,
                },
            })
            return response
        } catch (error) {
            console.error('Error fetching data:', error)
        }
    }

    const publishSensorData = async (feedKey, value) => {
        const url = `https://io.adafruit.com/api/v2/${aioUsername2}/feeds/${feedKey}/data`

        try {
            await axios.post(
                url,
                {
                    value: value,
                },
                {
                    headers: {
                        'X-AIO-Key': apiKey2,
                    },
                }
            )
        } catch (error) {
            console.error('Error writing data to Adafruit IO:', error)
        }
    }

    const publishSensorData2 = async (feedKey, value) => {
        const url = `https://io.adafruit.com/api/v2/${aioUsername3}/feeds/${feedKey}/data`

        try {
            await axios.post(
                url,
                {
                    value: value,
                },
                {
                    headers: {
                        'X-AIO-Key': apiKey3,
                    },
                }
            )
        } catch (error) {
            console.error('Error writing data to Adafruit IO:', error)
        }
    }

    const fetchFiveLatestSensorsData = async (feedName) => {
        const url = `https://io.adafruit.com/api/v2/${aioUsername2}/feeds/${feedName}/data`
        try {
            const response = await axios.get(url, {
                headers: {
                    'X-AIO-Key': apiKey2,
                },
                params: {
                    limit: 1, // maximum number of data points
                },
            })
            sensorsDataBlock.push(...response.data)
        } catch (error) {
            console.error('Error fetching data:', error)
        }
    }

    const fetchFiveLatestSensorsData2 = async (feedName) => {
        const url = `https://io.adafruit.com/api/v2/${aioUsername3}/feeds/${feedName}/data`
        try {
            const response = await axios.get(url, {
                headers: {
                    'X-AIO-Key': apiKey3,
                },
                params: {
                    limit: 1, // maximum number of data points
                },
            })
            sensorsDataBlock.push(...response.data)
        } catch (error) {
            console.error('Error fetching data:', error)
        }
    }

    const formatDateTime = (inputDateString) => {
        const formattedDate = new Date(inputDateString)

        const formattedDateString = `${formattedDate.toLocaleDateString()}, ${formattedDate.toLocaleTimeString(
            [],
            {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
            }
        )}`

        return formattedDateString
    }

    const generateFakeValue = (type) => {
        switch (type) {
            case 'temp':
                return faker.number.int({ min: 26, max: 44 })
            case 'humi':
                return faker.number.int({ min: 20, max: 80 })
            case 'soilph':
                return faker.number.int({ min: 5, max: 10 })
            case 'ec':
                return faker.number.int({ min: 0, max: 100 })
            case 'n':
                return faker.number.int({ min: 2, max: 8 })
            case 'p':
                return faker.number.int({ min: 2, max: 8 })
            case 'k':
                return faker.number.int({ min: 2, max: 8 })
            case 'air-temp':
                return faker.number.int({ min: 26, max: 44 })
            case 'air-humi':
                return faker.number.int({ min: 20, max: 80 })
            case 'air-light':
                return faker.number.int({ min: 0, max: 100 })
            case 'air-co2':
                return faker.number.int({ min: 0, max: 100 })
            case 'water-temp':
                return faker.number.int({ min: 26, max: 44 })
            case 'water-ph':
                return faker.number.int({ min: 5, max: 10 })
            case 'water-ec':
                return faker.number.int({ min: 0, max: 100 })
            case 'water-orp':
                return faker.number.int({ min: 100, max: 300 })
            default:
                break
        }
    }

    // generate random sensors data and publish them to adafruit
    useEffect(() => {
        const myInterval = setInterval(() => {
            if (sensorIndex === 0 && counter >= 60) {
                counter = 0

                const currentValue = generateFakeValue(sensorArray[sensorIndex])

                if (
                    sensorArray[sensorIndex].startsWith('air') ||
                    sensorArray[sensorIndex].startsWith('water')
                ) {
                    publishSensorData2(sensorArray[sensorIndex], currentValue)
                } else {
                    publishSensorData(sensorArray[sensorIndex], currentValue)
                }
                sensorIndex++
            }

            if (sensorIndex !== 0 && counter !== 0) {
                const currentValue = generateFakeValue(sensorArray[sensorIndex])
                if (
                    sensorArray[sensorIndex].startsWith('air') ||
                    sensorArray[sensorIndex].startsWith('water')
                ) {
                    console.log('hello1')
                    publishSensorData2(sensorArray[sensorIndex], currentValue)
                } else {
                    console.log('hello2')
                    publishSensorData(sensorArray[sensorIndex], currentValue)
                }

                if (sensorIndex === sensorArray.length - 1) {
                    counter = 0
                    sensorIndex = 0
                } else sensorIndex++
            }

            console.log(counter)
            counter++
        }, 5000)

        return () => clearInterval(myInterval)
    }, [])

    // use paho-mqtt to subscribe to a feed to listen to changes in order to update sensorCount
    useEffect(() => {
        const client = new Client('io.adafruit.com', 443, 'clientId')
        client.onConnectionLost = (responseObject) => {
            if (responseObject.errorCode !== 0) {
                console.log('Connection lost:', responseObject.errorMessage)
            }
        }

        client.onMessageArrived = async (message) => {
            setSensorCount((preSensorCount) => preSensorCount + 15)
        }

        const connect = () => {
            client.connect({
                useSSL: true,
                userName: aioUsername3,
                password: apiKey3,
                onSuccess: () => {
                    client.subscribe(`${aioUsername3}/feeds/water-orp`)
                },
                onFailure: (e) => {
                    console.log('Connection failed: ', e)
                },
            })
        }

        connect()

        return () => {
            if (client.isConnected()) {
                client.disconnect()
            }
        }
    }, [])

    // most importantly, fetch sensors data and publish to adafruit
    useEffect(() => {
        if (sensorCount == 15) {
            setSensorCount(0)

            for (let i = 0; i < 7; i++) {
                fetchFiveLatestSensorsData(sensorArray[i])
            }
            for (let i = 7; i < 15; i++) {
                fetchFiveLatestSensorsData2(sensorArray[i])
            }

            setTimeout(() => {
                const structuredSensorsData = []
                sensorsDataBlock.map((sensorData) => {
                    console.log(sensorData)
                    structuredSensorsData.push({
                        sensorType: feedKeyToNameMapping[sensorData.feed_key],
                        createAt: formatDateTime(sensorData.created_at),
                        value: parseInt(sensorData.value),
                    })
                })
                console.log(structuredSensorsData)
                sensorsDataBlock = []
                addSensorsDataToBlockchain(structuredSensorsData)
            }, 2000)
        }
    }, [sensorCount])

    return (
        <AdafruitContext.Provider
            value={{
                fetchControllerInfo,
                publishControllerInfo,
                fetchSensorData,
                fetchSensorData2,
            }}
        >
            {children}
        </AdafruitContext.Provider>
    )
}

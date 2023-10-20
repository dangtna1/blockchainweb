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

let sensorsDataBlock = []

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

    const fetchFiveLatestSensorsData = async (feedName) => {
        const url = `https://io.adafruit.com/api/v2/${aioUsername2}/feeds/${feedName}/data`
        try {
            const response = await axios.get(url, {
                headers: {
                    'X-AIO-Key': apiKey2,
                },
                params: {
                    limit: 5, // maximum number of data points
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
            case 'soilmoisture':
                return faker.number.int({ min: 10, max: 90 })
            default:
                break
        }
    }

    // generate random sensors data and publish them to adafruit
    useEffect(() => {
        const myInterval = setInterval(() => {
            const currentTemp = generateFakeValue('temp')
            publishSensorData('temp', currentTemp)

            const currentHumi = generateFakeValue('humi')
            publishSensorData('humi', currentHumi)

            const currentSoilph = generateFakeValue('soilph')
            publishSensorData('soilph', currentSoilph)

            const currentSoilmoisture = generateFakeValue('soilmoisture')
            publishSensorData('soilmoisture', currentSoilmoisture)
        }, 10000)

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
            setSensorCount((preSensorCount) => preSensorCount + 4)
        }

        const connect = () => {
            client.connect({
                useSSL: true,
                userName: aioUsername2,
                password: apiKey2,
                onSuccess: () => {
                    client.subscribe(`${aioUsername2}/feeds/soilmoisture`)
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

    // most importantly, fetch sensors data and publish to adafruit every 50 seconds
    useEffect(() => {
        if (sensorCount == 20) {
            setSensorCount(0)

            fetchFiveLatestSensorsData('temp')
            fetchFiveLatestSensorsData('humi')
            fetchFiveLatestSensorsData('soilph')
            fetchFiveLatestSensorsData('soilmoisture')

            setTimeout(() => {
                const structuredSensorsData = []
                sensorsDataBlock.map((sensorData) => {
                    structuredSensorsData.push({
                        sensorType: feedKeyToNameMapping[sensorData.feed_key],
                        createAt: formatDateTime(sensorData.created_at),
                        value: parseInt(sensorData.value),
                    })
                })
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
                publishSensorData,
            }}
        >
            {children}
        </AdafruitContext.Provider>
    )
}

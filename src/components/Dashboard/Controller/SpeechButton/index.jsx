import { useState, useEffect, useContext } from 'react'
import annyang from 'annyang'
import { useDispatch, useSelector } from 'react-redux'

import { updateSignal } from '../../../../store/controllerSlice'
import { pushControllerInfo, resetAll } from '../../../../store/careHistorySlice'
import { AdafruitContext } from '../../../../context/AdafruitContext'
import { ControllerContext } from '../../../../context/ControllerContext'
import MicroImage from '../../../../assets/Dashboard/Micro/icons8-microphone-64.png'

import classes from './SpeechButton.module.css'

const SpeechButton = () => {
    const [isListening, setIsListening] = useState(false)

    const { addControllersInfoToBlockchain } = useContext(ControllerContext)
    const { publishControllerInfo } = useContext(AdafruitContext)

    // const controllerSignals = useSelector((state) => state.controller.controllerSignals)
    const controllers = useSelector((state) => state.careHistory.controllersInfo)
    const controllersCount = useSelector((state) => state.careHistory.controllersCount)

    const dispatch = useDispatch()

    const options = {
        timeZone: 'Asia/Ho_Chi_Minh',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    }

    const turnOnDeviceBySpeech = (index) => {
        const vietnamTime = new Date().toLocaleString('en-US', options)
        const controller = {
            deviceName: 'Device ' + index,
            createAt: vietnamTime,
            value: 1,
        }

        // update global variable
        dispatch(updateSignal([index, 1]))
        dispatch(pushControllerInfo(controller))

        // publish to adafruit
        publishControllerInfo(`relays.relay${index}`, 1)
    }

    const turnOffDeviceBySpeech = (index) => {
        const vietnamTime = new Date().toLocaleString('en-US', options)
        const controller = {
            deviceName: 'Device ' + index,
            createAt: vietnamTime,
            value: 0,
        }
        // update global variable
        dispatch(updateSignal([index, 0]))
        dispatch(pushControllerInfo(controller))

        // publish to adafruit
        publishControllerInfo(`relays.relay${index}`, 0)
    }

    // Speech recognition logic
    useEffect(() => {
        if (annyang) {
            const commands = {
                'turn on device 1': () => {
                    turnOnDeviceBySpeech(1)
                },
                'turn off device 1': () => {
                    turnOffDeviceBySpeech(1)
                },
                'turn on device 2': () => {
                    turnOnDeviceBySpeech(2)
                },
                'turn off device 2': () => {
                    turnOffDeviceBySpeech(2)
                },
                'turn on device 3': () => {
                    turnOnDeviceBySpeech(3)
                },
                'turn off device 3': () => {
                    turnOffDeviceBySpeech(3)
                },
                'turn on device 4': () => {
                    turnOnDeviceBySpeech(4)
                },
                'turn off device 4': () => {
                    turnOffDeviceBySpeech(4)
                },
                'turn on device 5': () => {
                    turnOnDeviceBySpeech(5)
                },
                'turn off device 5': () => {
                    turnOffDeviceBySpeech(5)
                },
                'turn on device 6': () => {
                    turnOnDeviceBySpeech(6)
                },
                'turn off device 6': () => {
                    turnOffDeviceBySpeech(6)
                },
                'turn on device 7': () => {
                    turnOnDeviceBySpeech(7)
                },
                'turn off device 7': () => {
                    turnOffDeviceBySpeech(7)
                },
                'turn on device 8': () => {
                    turnOnDeviceBySpeech(8)
                },
                'turn off device 8': () => {
                    turnOffDeviceBySpeech(8)
                },
            }
            annyang.addCommands(commands)
        }
        return () => {
            if (annyang) {
                annyang.removeCommands()
            }
        }
    }, [])

    useEffect(() => {
        if (controllersCount === 10) {
            addControllersInfoToBlockchain(controllers)
            dispatch(resetAll())
        }
    }, [controllersCount])

    const toggleListening = () => {
        if (annyang) {
            if (isListening) {
                annyang.abort()
            } else {
                annyang.start()
            }
            setIsListening(!isListening)
        }
    }

    return (
        <>
            <div onClick={toggleListening} className={classes['micro-button']}>
                <img src={MicroImage} />
                <div className={classes.text}>{isListening ? 'Listening...' : 'Start'}</div>
            </div>
        </>
    )
}

export default SpeechButton

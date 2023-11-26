import { useState, useEffect, useContext } from 'react'
import annyang from 'annyang'
import { useDispatch, useSelector } from 'react-redux'

import { updateSignal } from '../../../../store/controllerSlice'
import { pushControllerInfo, resetAll } from '../../../../store/careHistorySlice'
import { AdafruitContext } from '../../../../context/AdafruitContext'
import { ControllerContext } from '../../../../context/ControllerContext'
import { CropInfoContext } from '../../../../context/CropInfoContext'
import { deviceIndexToNameMapping } from '../../../../utils/Mapping'
import MicroImage from '../../../../assets/Dashboard/Micro/icons8-microphone-64.png'

import classes from './SpeechButton.module.css'

const SpeechButton = () => {
    const [isListening, setIsListening] = useState(false)

    const { addControllersInfoToBlockchain } = useContext(ControllerContext)
    const { publishControllerInfo } = useContext(AdafruitContext)
    const { updateFertilizers } = useContext(CropInfoContext)

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
            deviceName: deviceIndexToNameMapping[index],
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
            deviceName: deviceIndexToNameMapping[index],
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
                'turn on nutritious liquid 1': () => {
                    turnOnDeviceBySpeech(1)
                },
                'turn off nutritious liquid 1': () => {
                    turnOffDeviceBySpeech(1)
                },
                'turn on nutritious liquid 2': () => {
                    turnOnDeviceBySpeech(2)
                },
                'turn off nutritious liquid 2': () => {
                    turnOffDeviceBySpeech(2)
                },
                'turn on nutritious liquid 3': () => {
                    turnOnDeviceBySpeech(3)
                },
                'turn off nutritious liquid 3': () => {
                    turnOffDeviceBySpeech(3)
                },
                'turn on region irrigation 1': () => {
                    turnOnDeviceBySpeech(4)
                },
                'turn off region irrigation 1': () => {
                    turnOffDeviceBySpeech(4)
                },
                'turn on region irrigation 2': () => {
                    turnOnDeviceBySpeech(5)
                },
                'turn off region irrigation 2': () => {
                    turnOffDeviceBySpeech(5)
                },
                'turn on region irrigation 3': () => {
                    turnOnDeviceBySpeech(6)
                },
                'turn off region irrigation 3': () => {
                    turnOffDeviceBySpeech(6)
                },
                'turn on main pump in': () => {
                    turnOnDeviceBySpeech(7)
                },
                'turn off main pump in': () => {
                    turnOffDeviceBySpeech(7)
                },
                'turn on main pump out': () => {
                    turnOnDeviceBySpeech(8)
                },
                'turn off main pump out': () => {
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
            const arrayFertilizers = []
            for (let i = 0; i < controllers.length; i++) {
                if (
                    controllers[i].deviceName === 'Nutritious Liquid 1' &&
                    controllers[i].value === 1
                ) {
                    if (!arrayFertilizers.includes('N')) arrayFertilizers.push('N')
                } else if (
                    controllers[i].deviceName === 'Nutritious Liquid 2' &&
                    controllers[i].value === 1
                ) {
                    if (!arrayFertilizers.includes('P')) arrayFertilizers.push('P')
                } else if (
                    controllers[i].deviceName === 'Nutritious Liquid 3' &&
                    controllers[i].value === 1
                ) {
                    if (!arrayFertilizers.includes('K')) arrayFertilizers.push('K')
                }
            }
            console.log(arrayFertilizers)
            updateFertilizers(arrayFertilizers)
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

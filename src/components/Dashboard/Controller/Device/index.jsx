import { useState, useEffect, useContext } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { WalletAccountsContext } from '../../../../context/WalletAccountsContext'
import { ControllerContext } from '../../../../context/ControllerContext'
import { AdafruitContext } from '../../../../context/AdafruitContext'
import { CropInfoContext } from '../../../../context/CropInfoContext'
import { pushControllerInfo, resetAll } from '../../../../store/careHistorySlice'
import { updateSignal } from '../../../../store/controllerSlice'
import MySwitch from '../../../Layout/DefaultLayout/UI/Switch'
import { deviceIndexToNameMapping } from '../../../../utils/Mapping'
import RegionPump from '../../../../assets/Dashboard/Device/Region.png'
import NutritionMixing from '../../../../assets/Dashboard/Device/Nutritious.png'
import MainPump from '../../../../assets/Dashboard/Device/MainPump.png'

const Device = ({ classes, device }) => {
    const nameOfDevice = deviceIndexToNameMapping[device.index]
    const deviceGroup1 = device.index == 1 || device.index == 2 || device.index == 3
    const deviceGroup2 = device.index == 4 || device.index == 5 || device.index == 6
    // const deviceGroup3 = device.index == 7 || device.index == 8

    const [isEnabled, setIsEnabled] = useState(false)

    const { currentAccount } = useContext(WalletAccountsContext)
    const { addControllersInfoToBlockchain } = useContext(ControllerContext)
    const { fetchControllerInfo, publishControllerInfo } = useContext(AdafruitContext)
    const { updateFertilizers } = useContext(CropInfoContext)

    const controllerSignals = useSelector((state) => state.controller.controllerSignals)
    const controllers = useSelector((state) => state.careHistory.controllersInfo)
    const controllersCount = useSelector((state) => state.careHistory.controllersCount)

    const dispatch = useDispatch()

    // subscribe and get initial data from adafruit
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetchControllerInfo(`relays.relay${device.index}`)
            dispatch(updateSignal([device.index, parseInt(response.data.value)]))
        }
        fetchData()
    }, [])

    // enable or disable device
    useEffect(() => {
        setIsEnabled(currentAccount === '0x0d22c5b0dbd93aeb3ba644218363d5282b40fb5e')
    }, [currentAccount])

    // toggle device
    const handleChange = async (nextChecked) => {
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

        const controller = {
            deviceName: nameOfDevice,
            createAt: vietnamTime,
            value: nextChecked ? 1 : 0,
        }

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

        dispatch(pushControllerInfo(controller))

        dispatch(updateSignal([device.index, nextChecked]))

        // publish to adafruit
        publishControllerInfo(`relays.relay${device.index}`, Number(nextChecked))

        // update fertiliers for all crops
        // if (nameOfDevice === 'Nutritious Liquid 1' && controller.value === 1) {
        //     updateFertilizers(['N'])
        // } else if (nameOfDevice === 'Nutritious Liquid 2' && controller.value === 1) {
        //     updateFertilizers(['P'])
        // } else if (nameOfDevice === 'Nutritious Liquid 3' && controller.value === 1) {
        //     updateFertilizers(['K'])
        // }
    }

    const deviceStatus = controllerSignals[device.index - 1] == 1

    return (
        <>
            <div className={classes.device}>
                <div className={classes.name}>{nameOfDevice}</div>

                <div className={classes.imageWrapper}>
                    {deviceGroup1 ? (
                        <img className={classes.image} src={NutritionMixing} />
                    ) : deviceGroup2 ? (
                        <img className={classes.image} src={RegionPump} />
                    ) : (
                        <img className={classes.image} src={MainPump} />
                    )}
                </div>

                <div className='w-full flex justify-between items-center'>
                    <div
                        className={
                            deviceStatus ? classes.status : `${classes.status} ${classes.inactive}`
                        }
                    >
                        {deviceStatus ? 'active' : 'inactive'}
                    </div>
                    <MySwitch
                        isEnabled={isEnabled}
                        onChange={handleChange}
                        checked={deviceStatus}
                    />
                </div>
            </div>
        </>
    )
}

export default Device

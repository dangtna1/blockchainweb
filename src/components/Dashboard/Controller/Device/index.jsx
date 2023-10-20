import { useState, useEffect, useContext } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { WalletAccountsContext } from '../../../../context/WalletAccountsContext'
import { ControllerContext } from '../../../../context/ControllerContext'
import { AdafruitContext } from '../../../../context/AdafruitContext'
import { pushControllerInfo, resetAll } from '../../../../store/careHistorySlice'
import { updateSignal } from '../../../../store/controllerSlice'
import MySwitch from '../../../Layout/DefaultLayout/UI/Switch'
import DeviceImage from '../../../../assets/Dashboard/Device/device.png'

const Device = ({ classes, device }) => {
    const [isEnabled, setIsEnabled] = useState(false)

    const { currentAccount } = useContext(WalletAccountsContext)
    const { addControllersInfoToBlockchain } = useContext(ControllerContext)
    const { fetchControllerInfo, publishControllerInfo } = useContext(AdafruitContext)

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
        setIsEnabled(currentAccount ? true : false)
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
            deviceName: 'Device ' + device.index,
            createAt: vietnamTime,
            value: nextChecked ? 1 : 0,
        }

        if (controllersCount === 10) {
            addControllersInfoToBlockchain(controllers)
            dispatch(resetAll())
        }

        dispatch(pushControllerInfo(controller))

        dispatch(updateSignal([device.index, nextChecked]))

        // publish to adafruit
        publishControllerInfo(`relays.relay${device.index}`, Number(nextChecked))
    }

    const deviceStatus = controllerSignals[device.index - 1] == 1

    return (
        <>
            <div className={classes.device}>
                <div className={classes.name}>{device.name}</div>

                <div className={classes.imageWrapper}>
                    <img className={classes.image} src={DeviceImage} />
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

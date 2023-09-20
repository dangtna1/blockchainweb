import DeviceImage from '../../../../assets/Dashboard/Device/device.png'
import { useEffect } from "react";
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux'
import { updateSignal } from '../../../../store/controllerSlice';
import MySwitch from '../../../Layout/DefaultLayout/UI/Switch'


const Device = ({classes, device}) => {
    const controllerSignals = useSelector((state) => state.controller.controllerSignals)
    const dispatch = useDispatch()
    
    // Subscribe and get initial data from adafruit 
    useEffect(() => {
        const fetchData = async () => {
            const aioUsername = 'tamquattnb123';
            const apiKey = "aio_IibV61FsQe" + "RVTkhPB98EgUnmwu0J";
            const feedName = `relays.relay${device.index}`;
            const url = `https://io.adafruit.com/api/v2/${aioUsername}/feeds/${feedName}/data/last`;

            try {
                const response = await axios.get(url, {
                    headers: {
                        'X-AIO-Key': apiKey,
                    },
                });
                dispatch(updateSignal([device.index, parseInt(response.data.value)]))
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const handleChange = async nextChecked => {
        dispatch(updateSignal([device.index, nextChecked]))
        // Publish to adafruit 
        try {
            const aioKey = "aio_IibV61FsQe" + "RVTkhPB98EgUnmwu0J";
            const aioUsername = 'tamquattnb123';
            const feedName = `relays.relay${device.index}`;

            await axios.post(
                `https://io.adafruit.com/api/v2/${aioUsername}/feeds/${feedName}/data`,
                {
                    value: Number(nextChecked)
                },
                {
                    headers: {
                        'X-AIO-Key': aioKey
                    }
                }
            );
        } catch (error) {
            console.error('Error writing data to Adafruit IO:', error);
        }
    };

    const deviceStatus = controllerSignals[device.index - 1] == 1

    return (
        <>
            <div className={classes.device}>
                <div className={classes.name}>
                    {device.name}
                </div>

                <div className={classes.imageWrapper}>
                    <img className={classes.image} src={DeviceImage} />
                </div>

                <div className='w-full flex justify-between items-center'>
                    <div className={deviceStatus ? classes.status : `${classes.status} ${classes.inactive}`}>
                        {deviceStatus ? 'active' : 'inactive'}
                    </div>
                    <MySwitch 
                        onChange={handleChange}
                        checked={deviceStatus}
                    />
                </div>
            </div>
        </>
    )

}


export default Device 

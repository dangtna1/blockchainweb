import { useState, useContext } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { SensorDataContext } from '../../../context/SensorDataContext'
import { resetAllStates } from '../../../store/sensorHistorySlice'
import Sensor from '../Sensor/'
import MySlider from '../../Layout/DefaultLayout/UI/Slider'
import ChartPortal from '../ChartPortal'
import classes from './Stats.module.css'

const Stats = () => {
    const dispatch = useDispatch()
    const sensorsCount = useSelector(
        (state) => state.sensorHistory.sensorsCount
    )
    const sensors = useSelector((state) => state.sensorHistory.sensorsData)
    const { addSensorsDataToBlockchain } = useContext(SensorDataContext)

    console.log(sensorsCount)
    if (sensorsCount === 12) {
        addSensorsDataToBlockchain(sensors)
        dispatch(resetAllStates())
    }

    const [active, setIsActive] = useState({
        sensorID: -1,
    })

    const dummySensorList = [
        {
            name: 'Temperature',
            status: true,
        },
        {
            name: 'Humidity',
            status: true,
        },
        {
            name: 'Soil pH',
            status: true,
        },
        {
            name: 'Soil moisture',
            status: true,
        },
    ]

    const TopBtn = ({ onClick }) => {
        return (
            <button onClick={onClick} className='top-btn'>
                <FontAwesomeIcon className='icon' icon='fa-solid fa-angle-up' />
            </button>
        )
    }

    const BotBtn = ({ onClick }) => {
        return (
            <button onClick={onClick} className='bot-btn'>
                <FontAwesomeIcon
                    className='icon'
                    icon='fa-solid fa-angle-down'
                />
            </button>
        )
    }

    const configuration = {
        dots: false,
        infinite: false,
        slidesToShow: 3,
        slidesToScroll: 1,
        swipeToSlide: true,
        vertical: true,
        adaptiveHeight: false,
        className: 'controller-Sensor',
        arrows: true,
        nextArrow: <BotBtn />,
        prevArrow: <TopBtn />,
    }

    return (
        <>
            <div className={classes.stats}>
                <div className={classes.chart}>
                    {active.sensorID === -1 ? (
                        <p className={classes.none}>
                            No sensor history here, please pick one
                        </p>
                    ) : (
                        <ChartPortal chartIndex={active.sensorID} />
                    )}
                </div>

                <div className={classes.sensorList}>
                    <MySlider config={configuration}>
                        {dummySensorList.map((item, index) => (
                            <Sensor
                                key={index}
                                input={{
                                    name: item.name,
                                    status: item.status,
                                    id: index,
                                    active: active,
                                    setStatus: setIsActive,
                                }}
                            />
                        ))}
                    </MySlider>
                </div>
            </div>
        </>
    )
}
export default Stats

import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Sensor from '../Sensor/'
import MySlider from '../../Layout/DefaultLayout/UI/Slider'
import ChartPortal from '../ChartPortal'
import classes from './Stats.module.css'

const Stats = () => {
    const [active, setIsActive] = useState({
        sensorID: -1,
    })

    const dummySensorList = [
        //for rendering UI
        {
            name: 'Temperature',
            label: 'soil',
            status: true,
        },
        {
            name: 'Humidity',
            label: 'soil',
            status: true,
        },
        {
            name: 'pH',
            label: 'soil',
            status: true,
        },
        {
            name: 'EC',
            label: 'soil',
            status: true,
        },
        {
            name: 'N',
            label: 'soil',
            status: true,
        },
        {
            name: 'P',
            label: 'soil',
            status: true,
        },
        {
            name: 'K',
            label: 'soil',
            status: true,
        },

        {
            name: 'Temperature',
            label: 'air',
            status: true,
        },
        {
            name: 'Humidity',
            label: 'air',
            status: true,
        },
        {
            name: 'Light',
            label: 'air',
            status: true,
        },
        {
            name: 'CO2',
            label: 'air',
            status: true,
        },
        {
            name: 'Temperature',
            label: 'water',
            status: true,
        },
        {
            name: 'PH',
            label: 'water',
            status: true,
        },
        {
            name: 'EC',
            label: 'water',
            status: true,
        },
        {
            name: 'ORP',
            label: 'water',
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
                <FontAwesomeIcon className='icon' icon='fa-solid fa-angle-down' />
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
        responsive: [
            {
                breakpoint: 1280,
                settings: {
                    vertical: false,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 834,
                settings: {
                    vertical: false,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
        nextArrow: <BotBtn />,
        prevArrow: <TopBtn />,
    }

    return (
        <>
            <div className={classes.stats}>
                <div className={classes.chart}>
                    {active.sensorID === -1 ? (
                        <p className={classes.none}>No sensor history here, please pick one</p>
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
                                    label: item.label,
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

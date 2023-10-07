import classes from './Stats.module.css'
import Sensor from '../Sensor/'
import {useState} from 'react'
import { faker } from '@faker-js/faker'
import MySlider from '../../Layout/DefaultLayout/UI/Slider'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Stats = () => {
    const [active, setIsActive] = useState({
        sensorID: -1,       
    })

    const generateRandomArray = (num) => {
        const array = []
        for(let i = 0; i < num; i++) array.push(faker.number.int({min:26, max:44}))
        return array
    }

    const dummySensorList = [
        {
            name: 'Sensor 1',
            status: true,
            initVal: faker.number.int({min:26, max:44}),
            updateCycle:1000,
        },
        {
            name: 'Sensor 2',
            status: true,
            initVal: faker.number.int({min:26, max:44}),
            updateCycle:3000,
        },
        {
            name: 'Sensor 3',
            status: true,
            initVal: faker.number.int({min:26, max:44}),
            updateCycle:4000,
        },
        {
            name: 'Sensor 4',
            status: true,
            initVal: faker.number.int({min:26, max:44}),
            updateCycle:5000,
        },
    ]

    const TopBtn = ({onClick}) => {
        return (
            <button onClick={onClick} className='top-btn'>
                <FontAwesomeIcon className='icon' icon="fa-solid fa-angle-up" />
            </button>
        )
    }
    
    const BotBtn = ({onClick}) => {
        return (
            <button onClick={onClick} className='bot-btn'>
                <FontAwesomeIcon className='icon' icon="fa-solid fa-angle-down" />
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
        arrows:true,
        nextArrow: <BotBtn/>,
        prevArrow: <TopBtn/>
    }

    return (
        <>
            <div className={classes.stats}>
                <div className={classes.chart} id='chartWindow'>
                    {active.sensorID === -1 && 
                    <p className={classes.none}>No sensor history here, please pick one</p>}
                    {/* Chart will appear through this portal, hehe :) */}
                </div>

                <div className={classes.sensorList}>
                    <MySlider config={configuration}>
                        {
                            dummySensorList.map((item,index) => 
                                <Sensor 
                                    key={index}
                                    input = {{
                                        name:item.name,
                                        status:item.status, 
                                        id:index,
                                        active:active,
                                        setStatus:setIsActive,
                                        initdataset: generateRandomArray(7),
                                        initvalue: item.initVal,
                                        updateCycle: item.updateCycle
                                    }}
                                />
                            )
                        }
                    </MySlider>
                </div>
            </div>
        </>
    )
}
export default Stats

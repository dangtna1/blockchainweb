import { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { WalletAccountsContext } from '../../../context/WalletAccountsContext'
import Device from './Device'
import MySlider from '../../Layout/DefaultLayout/UI/Slider'
import SpeechButton from './SpeechButton'
import classes from './Controller.module.css'

const renderDevice = (number) => {
    const devices = []

    for (let i = 1; i <= number; i++) devices.push(i)

    return devices.map((item, index) => {
        return (
            <Device
                key={index}
                classes={classes}
                device={{
                    name: `Device ${item}`,
                    index: item,
                }}
            />
        )
    })
}

const PrevBtn = ({ onClick }) => {
    return (
        <button onClick={onClick} className='prev-btn'>
            <FontAwesomeIcon className='icon' icon='fa-solid fa-angle-left' />
        </button>
    )
}

const NextBtn = ({ onClick }) => {
    return (
        <button onClick={onClick} className='next-btn'>
            <FontAwesomeIcon className='icon' icon='fa-solid fa-angle-right' />
        </button>
    )
}

const Controller = () => {
    const configuration = {
        dots: false,
        infinite: true,
        swipeToSlide: true,
        adaptiveHeight: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1280,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
        className: 'controller-Slider',
        nextArrow: <NextBtn />,
        prevArrow: <PrevBtn />,
    }

    const { currentAccount } = useContext(WalletAccountsContext)

    return (
        <>
            <MySlider config={configuration}>{renderDevice(8)}</MySlider>
            {currentAccount === '0x0d22c5b0dbd93aeb3ba644218363d5282b40fb5e' && <SpeechButton/>}
        </>
    )
}

export default Controller

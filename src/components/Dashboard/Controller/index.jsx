import Device from './Device'
import classes from './Controller.module.css'
import MySlider from '../../Layout/DefaultLayout/UI/Slider'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const renderDevice = number => {
    const devices = []

    for (let i = 1; i <= number; i++) devices.push(i)

    return(
        devices.map((item, index) => {
            return(
                <Device
                key = {index}
                classes={classes}
                device={{
                    name:`Device ${item}`,
                    index: item,
                }}/>
            )
        })
    )
}

const PrevBtn = ({onClick}) => {
    return (
        <button onClick={onClick} className='prev-btn'>
            <FontAwesomeIcon className='icon' icon="fa-solid fa-angle-left" />
        </button>
    )
}

const NextBtn = ({onClick}) => {
    return (
        <button onClick={onClick} className='next-btn'>
            <FontAwesomeIcon className='icon' icon="fa-solid fa-angle-right" />
        </button>
    )
}

const Controller = () => {
    const configuration = {
        dots: false,
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        swipeToSlide: true,
        adaptiveHeight: true,
        className: 'controller-Slider',
        nextArrow: <NextBtn/>,
        prevArrow: <PrevBtn/>
    }

    return(
        <>
            <MySlider config={configuration}>
                {renderDevice(8)}
            </MySlider>
        </>
    )
}

export default Controller
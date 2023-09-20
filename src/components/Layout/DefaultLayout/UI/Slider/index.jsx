import './MySlider.css'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


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

const MySlider = props => {
    const configuration = {
        dots: false,
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        swipeToSlide: true,
        adaptiveHeight: true,
        nextArrow: <NextBtn/>,
        prevArrow: <PrevBtn/>
    }

    return (
        <Slider {...configuration}>
            {props.children}
        </Slider>
    )

}
export  default  MySlider
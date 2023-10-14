import './MySlider.css'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const MySlider = (props) => {
    return <Slider {...props.config}>{props.children}</Slider>
}
export default MySlider

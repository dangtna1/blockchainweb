import Device from './Device'
import classes from './Controller.module.css'
import MySlider from '../../Layout/DefaultLayout/UI/Slider'



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


const Controller = () => {
    return(
        <>
            <MySlider>
                {renderDevice(8)}
            </MySlider>
        </>
    )
}

export default Controller
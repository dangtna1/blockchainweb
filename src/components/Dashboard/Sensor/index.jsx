import classes from './Sensor.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
const Sensor = ({input}) => {

    return (
        <>
            <div className={classes.sensor}>
                <div className={classes.infor}>
                    <div className={classes.name}>
                        {input.name}
                    </div>
                    <div className={input.status ? classes.status: `${classes.status} ${classes.inactive}`}>
                        {input.status ? 'active' : 'inactive'}
                    </div>
                    <div className={classes.value}>
                        {input.value}&deg;C
                    </div>  
                </div>
                <div className={classes.imageWrapper}>
                    <FontAwesomeIcon className={input.status ? classes.image: `${classes.image} ${classes.inactive}`} icon="fa-solid fa-fingerprint" />
                </div>
            </div>
        </>
    )
}


const SensorList = () => {

    return (
        <>  
            <div className={classes.sensorList}>
                <Sensor 
                        input = {{
                            name:'Sensor 1',
                            status:true, 
                            value: 40,
                        }}
                    />
                <Sensor 
                        input = {{
                            name:'Sensor 2',
                            status:false, 
                            value: '??',
                        }}
                    />
                <Sensor 
                        input = {{
                            name:'Sensor 3',
                            status:true, 
                            value: 40,
                        }}
                    />
            </div>
        </>
    )

}

export default SensorList
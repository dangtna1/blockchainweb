import classes from  './Controller.module.css'
import Device from './Device';

export default function Controller(){

    return (
        <>
            <div className={classes.controller}>
                <div className={classes.title}>
                    System Controller
                </div>  
                <div className={classes['item-count']}>
                        <div className={classes.text}>
                            Đang hiển thị :
                        </div>
                        {/* Đếm số lượng thiết bị */}
                        <div className={classes.count}>
                            8 thiết bị khả dụng
                        </div>
                </div>
                <div className={classes.devices}>
                    <ul className={classes.list}>
                        <div className={classes.nav}>
                            <div className={classes.text}>
                                ID
                            </div>
                            <div className={classes.text}>
                                Product name
                            </div>
                            <div className={classes.text}>
                                Status
                            </div>
                        </div>
                        <Device key="0" name="Relay 1" index="1"></Device>
                        <Device key="1" name="Relay 2" index="2"></Device>
                        <Device key="2" name="Relay 3" index="3"></Device>
                        <Device key="3" name="Relay 4" index="4"></Device>
                        <Device key="4" name="Relay 5" index="5"></Device>
                        <Device key="5" name="Relay 6" index="6"></Device>
                        <Device key="6" name="Relay 7" index="7"></Device>
                        <Device key="7" name="Relay 8" index="8"></Device>
                    </ul>
                </div>
            </div>
        </>
    )
}
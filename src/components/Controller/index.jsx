import * as React from 'react';
import './Controller.css'
import Device from './Device';

export default function Controller(){

    return (
        <>
            <div className="controller-container">
                <div className="title">
                    System Controller
                </div>  
                <div className="item-count">
                        <div className="text">
                            Đang hiển thị:
                        </div>
                        {/* Đếm số lượng thiết bị */}
                        <div className="count">
                            8 thiết bị khả dụng
                        </div>
                </div>
                <div className="devices-controller">
                    <ul className="devices-list">
                        <div className="devices-nav">
                            <div className="text max-w-[60px] ">
                                ID
                            </div>
                            <div className="text  border-x-2 border-greyscale-400">
                                Product name
                            </div>
                            <div className="text">
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
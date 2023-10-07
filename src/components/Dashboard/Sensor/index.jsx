import React, {useRef, useEffect, useState, useCallback} from 'react';
import MyChart from '../../Layout/DefaultLayout/UI/Chart'
import classes from './Sensor.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faker } from '@faker-js/faker'
import  {createPortal} from 'react-dom';


//Generate fake value
const generateFakeValue = type => {
    switch (type) {
        case 'TEMP':
            return faker.number.int({min:26, max:44})
        default:
            break;
    }

}


const Chart  = React.forwardRef(({dataset},ref) => {
    const labels =  ['24', '12', '6','3','2','1', 'now']     
    const data ={
        labels,
        datasets: [
            {
                label: 'Sensor',
                data: dataset,
                borderColor: '#59CE8F',
                fill: true,
                backgroundColor: 'rgba(188, 226, 158, 0.5)'
            },
        ]
    }
    const options = {
        responsive: true,
        plugins: {
          legend: {
            display:false,
          },
        },
        scales: {
            y:  {
                max:45,
                min:25,
                ticks:{
                    stepSize: 4,
                    padding:16
                },
                title: {
                    display: true,
                    text: 'SENSOR VALUE (C)',
                    font:{
                        size:20,
                        weight: 700,
                    },
                    color: '#285430',
                    padding:{
                        bottom:12,
                    }
                }
            },
            x:{
                title: {
                    display: true,
                    text: 'TIME (HOUR)',
                    font:{
                        size:20,
                        weight: 700,
                    },
                    color: '#285430',
                    padding:{
                        top:12,
                    }
                },
                ticks:{
                    stepSize: 4,
                    padding:16
                },

            }
        }
    };

    return (
        <>
            <div className={classes.inner}>
                <div className={classes.title}>Sensor History</div>
                <MyChart
                    ref={ref}
                    data={data}
                    options={options}
                />
            </div>
        </>
    )
})

const Sensor = ({input}) => {
    const [sensorValue, setSensorValue] = useState(input.initvalue)
    const [dataset, ] = useState(input.initdataset)
    const chartRef = useRef()
    const sensorActive = input.active.sensorID === input.id

    useEffect(()=>{
        const interval = setInterval(() => {
            const temp = generateFakeValue('TEMP')
            setSensorValue(temp)
            if(sensorActive) {
                if(chartRef.current.data.datasets[0].data.length > 6)
                    chartRef.current.data.datasets[0].data?.shift()
                chartRef.current.data.datasets[0].data.push(temp)
                chartRef.current.update()
            }

        },input.updateCycle)
        return () => clearInterval(interval)
    },[input.updateCycle,sensorActive])


    const ChartProtal = useCallback(() =>
        createPortal(
            <Chart
                ref={chartRef}
                dataset={dataset}
            />,document.getElementById('chartWindow')),[dataset])

    const onClickHandler = () => {
        input.setStatus(prev => ({...prev, sensorID: input.id}))
    }
    return (
        <>  
            {sensorActive && <ChartProtal/>}          
            <button className={sensorActive ? `${classes.sensor} ${classes.active}` :`${classes.sensor}`} onClick={onClickHandler}>
                <div className={classes.infor}>
                    <div className={classes.name}>
                        {input.name} 
                    </div>
                    <div className={input.status ? classes.status: `${classes.status} ${classes.inactive}`}>
                        {input.status ? 'active' : 'inactive'}
                    </div>
                    <div className={classes.value}>
                        {sensorValue}&deg;C
                    </div>  
                </div>
                <div className={classes.imageWrapper}>
                    <FontAwesomeIcon className={input.status ? classes.image: `${classes.image} ${classes.inactive}`} icon="fa-solid fa-fingerprint" />
                </div>
            </button>
        </>
    )
}

export default Sensor
import MyChart from '../../Layout/DefaultLayout/UI/Chart'
import SensorList from '../Sensor';
import classes from './Stats.module.css'
import {faker} from '@faker-js/faker';

const Chart  = ({data, options}) => {
    return (
        <>
            <div className={classes.chart}>
                <div className={classes.title}>A sample chart</div>
                <MyChart
                    data={data}
                    options={options}
                />
            </div>
        </>
    )
}


const Stats = () => {
    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    const data ={
        labels,
        datasets: [
            {
                label: 'Sample 1',
                data: labels.map(() => faker.number.int({min:10, max:50})),
                borderColor: '#59CE8F',
            },
            {
                label: 'Sample 2',
                data: labels.map(() => faker.number.int({min:10, max:50})),
                borderColor: '#1B6B93',
            },
        ]
    }
    const options = {
        responsive: true,
        plugins: {
          legend: {
            align:"end",
            labels:{
                font:{
                    size: 16,
                },
            },
          },
        },
      };
    return (
        <>
            <div className={classes.stats}>
                <Chart 
                    data={data}
                    options={options}
                />
                <SensorList/>
            </div>

        </>
    )
}

export default Stats
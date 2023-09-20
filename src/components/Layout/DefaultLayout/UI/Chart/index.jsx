import { Line } from 'react-chartjs-2';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

ChartJS.defaults.color = '#609966';
ChartJS.defaults.font.size ='18'
ChartJS.defaults.font.family='lato'
ChartJS.defaults.layout.padding= '24'

const MyChart = ({options, data}) => {
    return (
        <Line
            options={options}
            data={data}
        />
    )
}


export default MyChart
import { Line } from 'react-chartjs-2'
import { forwardRef } from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
)
ChartJS.defaults.borderColor = 'rgba(237, 241, 214, 0.9)'
ChartJS.defaults.color = '#000000'
ChartJS.defaults.font.size = '18'
ChartJS.defaults.font.family = 'lato'
ChartJS.defaults.font.weight = '400'
ChartJS.defaults.layout.padding.top = '16'
ChartJS.defaults.layout.padding.right = '16'

// eslint-disable-next-line react/display-name
const MyChart = forwardRef(({ options, data }, ref) => {
    return <Line ref={ref} options={options} data={data} />
})

export default MyChart

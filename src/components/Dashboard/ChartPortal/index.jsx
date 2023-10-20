import React, { useEffect, useState } from 'react'
import axios from 'axios'

import { chartNameMapping, feedKeyMapping, unitMapping } from '../../../utils/Mapping'
import MyChart from '../../Layout/DefaultLayout/UI/Chart'
import classes from './ChartPortal.module.css'

const ChartPortal = ({ chartIndex }) => {
    const [data, setData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const apiKey = 'aio_eWye58Xb7tE' + 'MMNtfGp0CsjtGecZv'
            const url = `https://io.adafruit.com/api/v2/dangvudangtna1/feeds/${feedKeyMapping[chartIndex]}/data`

            try {
                const response = await axios.get(url, {
                    headers: {
                        'X-AIO-Key': apiKey,
                    },
                    params: {
                        limit: 15, // maximum number of data points
                    },
                })

                setData(response.data)
            } catch (error) {
                console.error('Error fetching data:', error)
            }
        }
        fetchData()
        const myTimer = setInterval(() => {
            fetchData()
        }, 2000)

        return () => {
            clearInterval(myTimer)
        }
    }, [chartIndex])

    const formatDateTime = (unformattedDateTime) => {
        const date = new Date(unformattedDateTime)
        const options = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        }
        return date.toLocaleString('vi-VN', options)
    }

    const chartData = {
        labels: data.map((item) => formatDateTime(item.created_at)).reverse(),
        datasets: [
            {
                label: 'Sensor Data',
                data: data.map((item) => item.value).reverse(),
                fill: true,
                borderColor: '#59CE8F',
                backgroundColor: 'rgba(188, 226, 158, 0.5)',
            },
        ],
    }

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
        },
        scales: {
            y: {
                title: {
                    display: true,
                    text: `VALUE (${unitMapping[chartIndex]})`,
                    font: {
                        size: 20,
                        weight: 700,
                    },
                    color: '#285430',
                },
            },
            x: {
                title: {
                    display: true,
                    text: 'TIME DATE',
                    font: {
                        size: 20,
                        weight: 700,
                    },
                    color: '#285430',
                },
            },
        },
    }

    return (
        <div>
            <div className={classes['chart-title']}>{chartNameMapping[chartIndex]} History</div>
            <MyChart data={chartData} options={chartOptions} />
        </div>
    )
}

export default ChartPortal

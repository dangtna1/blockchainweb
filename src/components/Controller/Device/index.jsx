import * as React from 'react';
import { useEffect } from "react";
import axios from 'axios';
import Switch from "react-switch";
import { useSelector, useDispatch } from 'react-redux'

import { updateSignal } from '../../../store/controllerSlice.jsx';
import './Device.css'

export default function Device({ name, index }) {
    const controllerSignals = useSelector((state) => state.controller.controllerSignals)
    const dispatch = useDispatch()

    // Subscribe and get initial data from adafruit 
    useEffect(() => {
        const fetchData = async () => {
            const aioUsername = 'tamquattnb123';
            const apiKey = "aio_IibV61FsQe" + "RVTkhPB98EgUnmwu0J";
            const feedName = `relays.relay${index}`;
            const url = `https://io.adafruit.com/api/v2/${aioUsername}/feeds/${feedName}/data/last`;

            try {
                const response = await axios.get(url, {
                    headers: {
                        'X-AIO-Key': apiKey,
                    },
                });
                dispatch(updateSignal([index, parseInt(response.data.value)]))
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const handleChange = async nextChecked => {
        dispatch(updateSignal([index, nextChecked]))
        // Publish to adafruit 
        try {
            const aioKey = "aio_IibV61FsQe" + "RVTkhPB98EgUnmwu0J";
            const aioUsername = 'tamquattnb123';
            const feedName = `relays.relay${index}`;

            await axios.post(
                `https://io.adafruit.com/api/v2/${aioUsername}/feeds/${feedName}/data`,
                {
                    value: Number(nextChecked)
                },
                {
                    headers: {
                        'X-AIO-Key': aioKey
                    }
                }
            );
        } catch (error) {
            console.error('Error writing data to Adafruit IO:', error);
        }
    };

    return (
        <li className="device">
            <div className="text max-w-[60px]">
                {index}
            </div>
            <div className="text border-x-2 border-greyscale-400">
                {name}
            </div>
            <div className="text">
                <Switch
                    onChange={handleChange}
                    checked={controllerSignals[index - 1] == 1}
                    checkedIcon={false}
                    uncheckedIcon={false}
                    onColor="#3C6255"
                />
            </div>
        </li>
    )
}
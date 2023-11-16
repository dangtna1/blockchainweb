import React from 'react'

import './Loader.css'

const Loader = () => (
    <button className='buttonload' disabled>
        <div className='loading-dots'>
            <div className='loading-dot'></div>
            <div className='loading-dot'></div>
            <div className='loading-dot'></div>
        </div>
    </button>
)

export default Loader

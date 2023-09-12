import * as React from 'react';
import './Dashboard.css'

function Widget({ title, value }) {
    return (
        <div className="widget">
            <h2>{title}</h2>
            <p>{value}</p>
        </div>
    );
}

export default function Dashboard() {
    const widgets = [
        { title: 'Temperature', value: '35℃' },
        { title: 'Humidity', value: '1234' },
        { title: 'Soild humidity', value: '567' },
        { title: 'Soild humidity', value: '567' },
        { title: 'Soild humidity', value: '567' },
        { title: 'Temperature', value: '35℃' },
    ];

    return (
        <div className="widget-container">
            {widgets.map((widget, index) => (
                <Widget key={index} title={widget.title} value={widget.value} />
            ))}
        </div>
    )
}
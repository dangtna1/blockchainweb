import classes from './Dashboard.module.css'
import Controller from './Controller'
import Stats from './Stats'

export default function Dashboard() {
    return (
        <>
            <div className={classes.dashboard}>
                <div className={classes.title}>
                    DASHBOARD
                </div>
                <Controller />
                <Stats/>
            </div>
        </>
    )
}
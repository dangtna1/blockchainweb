import classes from './SideBar.module.css'

//font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
// Styled Components
import { NavLink } from 'react-router-dom'

export default function SideBar() {
    const [sideBarStatus, setSideBarStatus] = useState(false)

    const items = [
        {
            path: '/',
            Name: 'Dashboard',
            icon: 'fa-chart-line',
        },

        {
            path: '/form',
            Name: 'Form',
            icon: 'fa-file-lines',
        },
        {
            path: '/crops-display',
            Name: 'Display',
            icon: 'fa-display',
        },
        {
            path: '/market',
            Name: 'Market',
            icon: 'fa-wifi',
        },
        {
            path: '/history',
            Name: 'History',
            icon: 'fa-solid fa-clock',
        },
    ]

    return (
        <>
            <div className={classes.sideBar}>
                <div className={classes.inner}>
                    <div className={classes.menu}>
                        {/* title */}
                        <div className={classes.text}>MENU</div>
                        <FontAwesomeIcon
                            onClick={() => setSideBarStatus((prev) => !prev)}
                            icon='fa-solid fa-caret-left'
                            className={
                                sideBarStatus
                                    ? `${classes.toggle} ${classes.active}`
                                    : `${classes.toggle}`
                            }
                        />
                        {/* List */}
                        <div
                            className={
                                sideBarStatus
                                    ? `${classes['menu-list']} ${classes.active}`
                                    : `${classes['menu-list']}`
                            }
                        >
                            {items.map((item, index) => (
                                <NavLink
                                    to={item.path}
                                    key={index}
                                    className={(navData) =>
                                        navData.isActive
                                            ? `${classes['item']} ${classes['active']}`
                                            : `${classes['item']}`
                                    }
                                >
                                    <div className='min-w-[26px] min-h-[26px] flex items-center justify-center'>
                                        <FontAwesomeIcon
                                            icon={`fa-solid ${item.icon}`}
                                            className={classes.icon}
                                        />
                                    </div>
                                    <div className={classes.text}>{item.Name}</div>
                                </NavLink>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

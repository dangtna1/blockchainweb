import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import classes from './SideBar.module.css'

export default function SideBar() {
    const items = [
        {
            path: '/',
            Name: 'Dashboard',
            icon: (
                <FontAwesomeIcon
                    icon='fa-solid fa-chart-line'
                    className='min-w-[24px]'
                />
            ),
        },

        {
            path: '/form',
            Name: 'Form',
            icon: (
                <FontAwesomeIcon
                    icon='fa-solid fa-file-lines'
                    className='min-w-[24px]'
                />
            ),
        },
        {
            path: '/crops-display',
            Name: 'Display',
            icon: (
                <FontAwesomeIcon
                    icon='fa-solid fa-display'
                    className='min-w-[24px]'
                />
            ),
        },
        {
            path: '/market',
            Name: 'Market',
            icon: (
                <FontAwesomeIcon
                    icon='fa-solid fa-wifi'
                    className='min-w-[24px]'
                />
            ),
        },
        {
            path: '/history',
            Name: 'History',
            icon: (
                <FontAwesomeIcon
                    icon='fa-solid fa-clock'
                    className='min-w-[24px]'
                />
            ),
        },
    ]

    return (
        <>
            <div className={classes.sideBar}>
                <div className={classes.inner}>
                    <div className={classes.menu}>
                        {/* title */}
                        <div className={classes.text}>MENU</div>
                        {/* List */}
                        <div className={classes['menu-list']}>
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
                                    <div className={classes.icon}>
                                        {item.icon}
                                    </div>
                                    <div className={classes.text}>
                                        {item.Name}
                                    </div>
                                </NavLink>
                            ))}
                        </div>
                    </div>

                    {/* <div className="line"></div>

                    <div className={classes.setting}>
                        <div className="icon">
                            <FontAwesomeIcon icon="fa-solid fa-gear" className='min-w-[24px]' />
                        </div>
                        <div className={classes.text}>
                            Setting
                        </div>
                    </div>

                    <div className={classes.profile}>
                        <div className="icon">
                            <FontAwesomeIcon icon="fa-solid fa-user"  className='min-w-[24px]'/>
                        </div>
                        <div className={classes.text}>
                            Account
                        </div>
                    </div> */}
                </div>
            </div>
        </>
    )
}

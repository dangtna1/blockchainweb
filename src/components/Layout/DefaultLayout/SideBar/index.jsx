import * as React from 'react';
import './SideBar.css'
// Styled Components
import { Link } from "react-router-dom";

import logo from '../../../../assets/sideBar/main-logo.svg';
import dashboard from '../../../../assets/sideBar/dashboard.svg';
import display from '../../../../assets/sideBar/display.svg';
import form from '../../../../assets/sideBar/form.svg';
import history from '../../../../assets/sideBar/history.svg';
import profile from '../../../../assets/sideBar/profile.svg';
import setting from '../../../../assets/sideBar/setting.svg';
import controller from '../../../../assets/sideBar/controller.svg'

export default function SideBar() {

    return (
        <div>
            <div className="sideBar-main">
                <div className="sideBar-inner">

                    <div className="sideBar-logo">
                        <div className="logo">
                            <img src={logo} alt="logo" />
                        </div>

                        <div className="text">
                            BlockChain
                        </div>
                    </div>

                    <div className="line"></div>

                    <div className="sideBar-menu">
                        {/* title */}
                        <div className="text">
                            MENU
                        </div>

                        {/* List */}
                        <div className="menu-list">
                            <Link to="/">
                                <div className="item">
                                    <div className="icon">
                                        <img src={dashboard} alt="dashboard" />
                                    </div>
                                    <div className="text">
                                        Dashboard
                                    </div>
                                </div>
                            </Link>
                            <Link to="/controller">
                                <div className="item">
                                    <div className="icon">
                                        <img src={controller} alt="controller" />
                                    </div>
                                    <div className="text">
                                        Controller
                                    </div>
                                </div>
                            </Link>
                            <Link to="/form">
                                <div className="item" >
                                    <div className="icon">
                                        <img src={form} alt="form" />
                                    </div>
                                    <div className="text">
                                        Form
                                    </div>
                                </div>
                            </Link>
                            <Link to="/crops-display">
                                <div className="item" >
                                    <div className="icon">
                                        <img src={display} alt="display" />
                                    </div>
                                    <div className="text">
                                        Display
                                    </div>
                                </div>
                            </Link>
                            <Link>
                                <div className="item">
                                    <div className="icon">
                                        <img src={history} alt="history" />
                                    </div>
                                    <div className="text">
                                        History
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>

                    <div className="sideBar-user">

                    </div>

                    <div className="line"></div>

                    <div className="sideBar-setting">
                        <div className="icon">
                            <img src={setting} alt="setting" />
                        </div>
                        <div className="text">
                            Setting
                        </div>
                    </div>

                    <div className="sideBar-profile">
                        <div className="icon">
                            <img src={profile} alt="profile" />
                        </div>
                        <div className="text">
                            Account
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

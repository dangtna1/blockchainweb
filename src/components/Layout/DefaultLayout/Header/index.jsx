import * as React from 'react';
import classes from './Header.module.css';
import { CropInfoContext } from '../../../../context/CropInfoContext.jsx';
//Main logo Import
import logo from '../../../../assets/sideBar/main-logo.svg';

export default function Header() {
    const {
        currentAccount,
        connectWallet,
    } = React.useContext(CropInfoContext);

    return (
        <div className={classes.header}>
            <div className={classes.inner}>
                <div className={classes.logo}>
                    
                </div>
                <div className={classes.title}>
                    "SmartWallet: Revolutionizing Payments with Blockchain"
                </div>

                <div className={classes.profile}>
                    {!currentAccount && (
                        <button
                            type="button"
                            onClick={connectWallet}
                            className="flex justify-center items-center p-3 rounded-full bg-green-500 hover:bg-green-700"
                        >
                            <p className="text-white text-base font-semibold">
                                Connect Wallet
                            </p>
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}
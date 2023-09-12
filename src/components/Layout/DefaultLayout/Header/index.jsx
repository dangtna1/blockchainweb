import * as React from 'react';
import './header.css';
import { CropInfoContext } from '../../../../context/CropInfoContext.jsx';

export default function Header() {
    const {
        currentAccount,
        connectWallet,
    } = React.useContext(CropInfoContext);

    return (
        <div className="header-container">
            <div className="header-inner">
                <div className="title">
                    "SmartWallet: Revolutionizing Payments with Blockchain"
                </div>

                <div className="profile">
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
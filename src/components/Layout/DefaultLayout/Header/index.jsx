import { useContext } from 'react';
import classes from './Header.module.css';
import { WalletAccountsContext } from '../../../../context/WalletAccountsContext';

export default function Header() {
    const {
        currentAccount,
        connectWallet,
    } = useContext(WalletAccountsContext);

    return (
        <div className={classes.header}>
            <div className={classes.inner}>
                <div className={classes.title}>
                    "SmartWallet: Revolutionizing Payments with Blockchain"
                </div>
                <div className={classes.profile}>
                    {!currentAccount && (
                        <button
                            type="button"
                            onClick={connectWallet}
                            className="self-end px-4 py-3 rounded-xl bg-main-300 hover:opacity-70"
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
import { useContext } from 'react'

import { WalletAccountsContext } from '../../../../context/WalletAccountsContext'
import classes from './Header.module.css'

export default function Header() {
    const { currentAccount, connectWallet } = useContext(WalletAccountsContext)

    return (
        <div className={classes.header}>
            <div className={classes.inner}>
                <div className={classes.title}>
                    SmartWallet: Revolutionizing Payments with Blockchain
                </div>
                <div className={classes.profile}>
                    {!currentAccount && (
                        <button
                            type='button'
                            onClick={connectWallet}
                            className='self-end p-2 laptop:px-4 laptop:py-3 rounded-xl bg-main-300 hover:opacity-70'
                        >
                            <p className={classes.text}>Connect Wallet</p>
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}
